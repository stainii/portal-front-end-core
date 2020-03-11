import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TodoSubscription} from "./todo-subscription.model";
import {environment} from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class TodoSubscriptionService {

    constructor(private _http: HttpClient) {
    }

    findAll() {
        return this._http.get<TodoSubscription[]>(environment.apiBaseUrl + "todo/api/subscription/");
    }

    create(subscription: TodoSubscription) {
        return this._http.post<TodoSubscription>(environment.apiBaseUrl + "todo/api/subscription/", subscription);
    }

    update(subscription: TodoSubscription) {
        return this._http.put<TodoSubscription>(environment.apiBaseUrl + "todo/api/subscription/" + subscription.id + "/", subscription);
    }

}
