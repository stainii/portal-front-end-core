import {Injectable} from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {BehaviorSubject, Observable} from "rxjs";
import {Task} from "@app/todo/task.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {map} from "rxjs/operators";
import {TaskPatchService} from '@app/todo/task-patch.service';
import {TaskPatch} from "@app/todo/task-patch.model";
import {UserService} from "@app/user/user.service";
import {TaskStatus} from "@app/todo/task-status.model";
import {TaskTemplateEntry} from "@app/todo/task-template-entry.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private _taskWatcher: BehaviorSubject<Task[]>;
    private _taskTail: EventSource;

    constructor(private _storage: LocalStorageService,
                private _http: HttpClient,
                private _taskPatchService: TaskPatchService,
                private _userService: UserService) {
        this._taskWatcher = new BehaviorSubject([]);
        this._setup();
    }

    watchTasks() {
        return this._taskWatcher.asObservable();
    }

    refreshTasks() {
        this._clearLocalStorage();
        if (this._taskTail) {
            this._taskTail.close();
        }
        return this._setup();
    }

    create(task: Task) {
        if (!task.context) {
            task.context = environment.defaultTaskContext;
        }
        return this._http.post<Task>(environment.apiBaseUrl + "todo/task/", task);
    }

    createTasksBasedOn(taskTemplateEntry: TaskTemplateEntry) {
        return this._http.post<Task[]>(environment.apiBaseUrl + "todo/task/from-template/", taskTemplateEntry);
    }

    complete(task: Task) {
        return this._taskPatchService.complete(task);
    }

    update(updatedTask: Task, originalTask: Task) {
        if (!updatedTask.context) {
            updatedTask.context = environment.defaultTaskContext;
        }
        return this._taskPatchService.update(updatedTask, originalTask);
    }

    private _setup() {
        this._retrieveUpToDateTasks()
            .subscribe(tasks => {
                    this._storeTasksInLocalStorage(tasks);
                    this._publishTasksOfLocalStorage();
                    this._watchChangesToTasks();
                },
                error => {
                    console.error(error);
                    this._publishTasksOfLocalStorage()
                });
    }

    private _retrieveUpToDateTasks(): Observable<Task[]> {
        let tasksInLocalStorage = this._findTasksFromLocalStorage();
        if (tasksInLocalStorage) {
            console.log("There are tasks saved from a previous session in local storage. I'll bring these up to date.");

            // update the existing tasks with new information from the server
            return this._findAndApplyNewPatchesToTasksInLocalStorage()
                .pipe(map(changedTasks => this._findTasksFromLocalStorage())); // don't return the changed tasks, return all tasks!
        } else {
            console.log("No tasks found from a previous session in local storage. Fetching fresh list of tasks from server.");
            return this._findTasksFromServer();
        }
    }

    private _watchChangesToTasks() {
        this._taskTail = new EventSource(
            environment.apiBaseUrl + "todo/task/patch/?tail&jwt=" + this._userService.getLoggedInUser().token.value);

        this._taskTail.addEventListener('message', (event: MessageEvent) => {
            let patches = JSON.parse(event.data);
            if (!Array.isArray(patches)) {
                patches = [patches]; // there is only one patch, so let's put in an array
            }
            console.info("New task patches were sent by the server.");
            console.debug(patches);

            this._applyPatches(patches);
            this._publishTasksOfLocalStorage();
        });

        console.info("Watching changes to tasks (sent by server).");

        //when the connection is lost, retry after 10 seconds
        this._taskTail.onerror = error => {
            console.error("Connection lost while watching changes to tasks. Retrying in 10 seconds", error);
            this._taskTail.close();
            setTimeout(() => {
                this._setup();
            }, 1000);
        };
    }

    /**
     * Finds and applies the latest patches to the tasks in local storage.
     * Returns the changed tasks.
     */
    private _findAndApplyNewPatchesToTasksInLocalStorage() {
        let dateOfLastUpdate = this._getDateOfLastUpdate();
        if (dateOfLastUpdate == null) {
            throw new Error("Local storage does contain tasks, but no date of last update.");
        }

        return this._taskPatchService.findPatchesSince(dateOfLastUpdate)
            .pipe(map(patches => { this._applyPatches(patches); }));
    }

    private _findTasksFromServer() {
        return this._http.get<Task[]>(environment.apiBaseUrl + "todo/task/")
            .pipe(
                map(tasks => tasks.map(
                    task => Object.assign(new Task(), task)))
            );
    }

    private _findTasksFromLocalStorage() {
        let tasks = this._storage.retrieve("tasks");
        if (tasks == null) {
            return null;
        } else {
            return tasks
                .map(task => Object.assign(new Task(), task));
        }
    }

    private _storeTasksInLocalStorage(tasks: Task[]) {
        this._storage.store("tasks", tasks);
        this._setDateOfLastUpdate(new Date());
    }

    private _applyPatch(patch: TaskPatch, tasks: Task[]): Task {
        let task = tasks.filter(task => task.id == patch.taskId)[0];
        if (task == null) {
            task = new Task();
        }
        this._taskPatchService.patch(task, patch);
        return task;
    }

    /**
     * Applies each patch to its corresponding task.
     * Returns the changed tasks.
     * @param patches patches to apply to the currently known tasks.
     */
    private _applyPatches(patches: TaskPatch[]): Task[] {
        let tasks = this._findTasksFromLocalStorage();
        let updatedTasks = patches.map(patch => this._applyPatch(patch, tasks));
        this._upsertTasksInLocalStorage(updatedTasks);
        return updatedTasks;
    }

    private _publishTasksOfLocalStorage() {
        this._taskWatcher.next(this._findTasksFromLocalStorage());
    }

    private _upsertTasksInLocalStorage(updatedOrNewTasks: Task[]) {
        let tasks = this._findTasksFromLocalStorage();

        updatedOrNewTasks.forEach(updatedOrNewTask => {
            let index = tasks.findIndex(task => task.id == updatedOrNewTask.id);
            if (index == -1) {
                tasks.push(updatedOrNewTask);
            } else {
                tasks[index] = updatedOrNewTask;
            }
        });

        tasks = tasks.filter(task => task.status != TaskStatus.COMPLETED);

        this._storeTasksInLocalStorage(tasks);
    }

    private _getDateOfLastUpdate(): Date {
        let dateAsString = this._storage.retrieve("dateOfLastUpdate");
        if (dateAsString) {
            return new Date(dateAsString);
        } else {
            return null;
        }
    }

    private _setDateOfLastUpdate(date: Date) {
        this._storage.store("dateOfLastUpdate", date);
    }

    private _clearLocalStorage() {
        this._storage.clear("tasks");
        this._storage.clear("dateOfLastUpdate");
    }
}
