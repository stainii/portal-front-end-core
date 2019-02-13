import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {Execution} from "@app/housagotchi/execution.model";

@Injectable({
    providedIn: 'root'
})
export class ExecutionService {

    constructor(private _http: HttpClient) {

    }

    addExecution(execution: Execution) {
        return this._http.post(`${environment.apiBaseUrl}housagotchi/api/recurring-task/${execution.recurringTaskId}/execution/`, {
            date: execution.date.format("YYYY-MM-DDT00:00:00")
        });
    }


}
