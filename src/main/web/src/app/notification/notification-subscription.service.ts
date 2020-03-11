import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NotificationSubscription} from "./notification-subscription.model";
import {environment} from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class NotificationSubscriptionService {

    constructor(private _http: HttpClient) {
    }

    findAll() {
        return this._http.get<NotificationSubscription[]>(environment.apiBaseUrl + "notifications/api/subscription/");
    }

    create(subscription: NotificationSubscription) {
        return this._http.post<NotificationSubscription>(environment.apiBaseUrl + "notifications/api/subscription/", subscription);
    }

    update(subscription: NotificationSubscription) {
        return this._http.put<NotificationSubscription>(environment.apiBaseUrl + "notifications/api/subscription/" + subscription.id + "/", subscription);
    }

}
