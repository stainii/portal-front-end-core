import {Component} from '@angular/core';
import {Notification} from "../notification.model";
import {NotificationService} from "../notification.service";
import {ErrorService} from "@app/error/error.service";

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent {

    notifications: Notification[];

    constructor(private _notificationService: NotificationService, private _errorService: ErrorService) {
        this._notificationService.findActiveNotifications().subscribe(
            notifications => this.notifications = notifications,
            error => this._errorService.notify(error))
    }

    markAsRead(notification: Notification) {
        this.notifications = this.notifications.filter(obj => obj !== notification);
        console.log("Marked notification as read", notification);
    }

}
