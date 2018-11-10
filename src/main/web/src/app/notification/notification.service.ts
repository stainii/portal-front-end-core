import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notification} from "./notification.model";
import {environment} from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private _http: HttpClient) {
    }

    findActiveNotifications() {
        return this._http.get<Notification[]>(environment.apiBaseUrl + "notifications/api/notification/?onlyUnread=true");
    }

    markAsRead(id: number) {
        return this._http.put(environment.apiBaseUrl + "notifications/api/notification/" + id + "/read/", {
            id: id,
            read: true
        });
    }

}
