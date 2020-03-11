import {Component, OnInit} from '@angular/core';
import {NotificationSubscriptionService} from "../notification-subscription.service";
import {NotificationSubscription} from "../notification-subscription.model";

@Component({
    selector: 'app-notification-subscription-editor',
    templateUrl: './notification-subscription-editor.component.html',
    styleUrls: ['./notification-subscription-editor.component.scss']
})
export class NotificationSubscriptionEditorComponent implements OnInit {

    subscriptions: NotificationSubscription[];
    currentlyEditing: NotificationSubscription;

    constructor(private _subscriptionService: NotificationSubscriptionService) {
    }

    ngOnInit() {
        this._subscriptionService.findAll().subscribe(subscriptions => {
            if (subscriptions && subscriptions.length > 0) {
                this.subscriptions = subscriptions;
            } else {
                this.subscriptions = [];
            }
        })
    }

    selectSubscription(subscription: NotificationSubscription) {
        this.currentlyEditing = subscription;
    }

    save(subscription: NotificationSubscription) {
        if (subscription.id) {
            this._subscriptionService.update(subscription).subscribe();
        } else {
            this._subscriptionService.create(subscription).subscribe(persistedSubscription => {
                subscription.id = persistedSubscription.id;
            });
        }
    }

}
