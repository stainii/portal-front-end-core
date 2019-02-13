import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription} from "./subscription.model";
import {environment} from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    constructor(private _http: HttpClient) {
    }

    findAll() {
        return this._http.get<Subscription[]>(environment.apiBaseUrl + "notifications/api/subscription/");
    }

    create(subscription: Subscription) {
        return this._http.post<Subscription>(environment.apiBaseUrl + "notifications/api/subscription/", subscription);
    }

    update(subscription: Subscription) {
        return this._http.put<Subscription>(environment.apiBaseUrl + "notifications/api/subscription/" + subscription.id + "/", subscription);
    }

}
