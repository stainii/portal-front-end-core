import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "@app/todo/task.model";
import {environment} from "@env/environment";
import {TaskPatch} from "@app/todo/task-patch.model";

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
}
