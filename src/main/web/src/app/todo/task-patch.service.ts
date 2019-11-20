import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "@app/todo/task.model";
import {environment} from "@env/environment";
import {TaskPatch} from "@app/todo/task-patch.model";
import {TaskStatus} from "@app/todo/task-status.model";

@Injectable({
    providedIn: 'root'
})
export class TaskPatchService {

    constructor(private _http: HttpClient) {
    }

    findPatchesSince(date: Date) {
        console.info("Looking for patches to tasks since " + date);
        return this._http.get<TaskPatch[]>(environment.apiBaseUrl + "todo/task/patch/?since=" + date.toISOString());
    }

    patch(task: Task, patch: TaskPatch) {
        Object.keys(patch.changes)
            .forEach(key => task[key] = patch.changes[key]);
    }

    update(task: Task) {
        // TODO create a patch, comparing the original with the new task, send update to server
    }

    complete(task: Task) {
        return this._http.patch<Task>(environment.apiBaseUrl + "todo/task/", {
            taskId: task.id,
            status: TaskStatus.COMPLETED
        });
    }
}
