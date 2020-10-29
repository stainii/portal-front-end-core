import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";
import {Activity} from "@app/activity/activity.model";
import {Page} from "@app/activity/page.model";

@Injectable({
    providedIn: 'root'
})
export class ManageActivitiesService {

    constructor(private _http: HttpClient) {
    }

    public find(sortField: string, order: string, page: number, pageSize: number, filter: string): Observable<Page<Activity>> {
        let searchParams = this.calculateSearchParams(sortField, order, page, pageSize, filter);
        let searchParamsAsString = this.searchParamsToString(searchParams);
        return this._http.get<Page<Activity>>(`${environment.apiBaseUrl}activity/activities/${searchParamsAsString}`);
    }

    public findById(id: string) {
        return this._http.get<Activity>(`${environment.apiBaseUrl}activity/activities/${id}`);
    }

    public create(activity: Activity) {
        return this._http.post<Activity>(`${environment.apiBaseUrl}activity/activities/`, activity);
    }

    public update(activity: Activity) {
        return this._http.put<Activity>(`${environment.apiBaseUrl}activity/activities/${activity.id}`, activity);
    }

    public delete(activity: Activity) {
        return this._http.delete(`${environment.apiBaseUrl}activity/activities/${activity.id}`);
    }

    private calculateSearchParams(sortField: string, order: string, page: number, pageSize: number, filter: string): string[] {
        let searchParams = [];

        if (sortField) {
            searchParams.push(`sortField=${sortField}`);
        }

        if (order) {
            searchParams.push(`order=${order}`);
        }

        if (page || page == 0) {
            searchParams.push(`page=${page}`);
        }

        if (pageSize) {
            searchParams.push(`pageSize=${pageSize}`);
        }

        if (filter) {
            searchParams.push(`filter=${filter}`);
        }

        return searchParams;
    }

    private searchParamsToString(searchParams: string[]): string {
        let searchParamsAsString = "?";
        if (searchParams.length > 0) {
            searchParamsAsString += searchParams[0];
        }
        if (searchParams.length > 1) {
            for (let i = 1; i < searchParams.length; i++) {
                searchParamsAsString += `&${searchParams[i]}`
            }
        }
        return searchParamsAsString;
    }

}
