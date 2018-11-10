import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {RecurringTask} from "@app/housagotchi/recurring-task.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecurringTaskService {

    constructor(private _http: HttpClient) {
    }

    findAll(): Observable<RecurringTask[]> {
        return this._http.get<RecurringTask[]>(`${environment.apiBaseUrl}housagotchi/api/recurring-task/`);
    }

    create(recurringTask: RecurringTask) {
        return this._http.post<RecurringTask[]>(`${environment.apiBaseUrl}housagotchi/api/recurring-task/`, recurringTask);
    }

    update(recurringTask: RecurringTask) {
        return this._http.put<RecurringTask[]>(`${environment.apiBaseUrl}housagotchi/api/recurring-task/${recurringTask.id}/`, recurringTask);
    }

    delete(recurringTask: RecurringTask) {
        return this._http.delete<RecurringTask[]>(`${environment.apiBaseUrl}housagotchi/api/recurring-task/${recurringTask.id}/`);
    }
}
