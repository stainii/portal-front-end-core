import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "@app/todo/task.model";
import {environment} from "@env/environment";
import {TaskPatch} from "@app/todo/task-patch.model";
import {TaskStatus} from "@app/todo/task-status.model";
import * as moment from "moment";

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
        // first, add the patch to the history of the task
        task.history.push(patch);

        // then, replay all history on the task, in the correct order
        task.history
            .sort((a, b) => a.dateTime.valueOf() - b.dateTime.valueOf())
            .forEach(p => {
                Object.keys(p.changes)
                    .forEach(key => {
                        task[key] = p.changes[key];
                    });
            })
    }

    update(updatedTask: Task, originalTask: Task) {
        let patch = {
            taskId: originalTask.id,
            dateTime: moment(),
            changes: {}
        };

        Object.keys(updatedTask)
            .forEach(key => {
                if (updatedTask[key] != originalTask[key]) {
                    patch.changes[key] = updatedTask[key]
                    console.log(patch.changes)
                }
            });

        return this._http.patch<Task>(environment.apiBaseUrl + "todo/task/" + originalTask.id, patch);
    }

    complete(task: Task) {
        return this._http.patch<Task>(environment.apiBaseUrl + "todo/task/" + task.id, {
            taskId: task.id,
            dateTime: moment(),
            status: TaskStatus.COMPLETED
        });
    }
}
