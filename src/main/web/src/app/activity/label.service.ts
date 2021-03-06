import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LabelService {

    constructor(private _http: HttpClient) {
    }

    findAllLabels(): Observable<string[]> {
        return this._http.get<string[]>(`${environment.apiBaseUrl}activity/labels/`);
    }
}
