import {Component, OnInit} from '@angular/core';
import {TodoSubscriptionService} from "@app/todo/todo-subscription.service";
import {TodoSubscription} from "@app/todo/todo-subscription.model";

@Component({
    selector: 'app-todo-subscription-editor',
    templateUrl: './todo-subscription-editor.component.html',
    styleUrls: ['./todo-subscription-editor.component.scss']
})
export class TodoSubscriptionEditorComponent implements OnInit {

    subscriptions: TodoSubscription[];
    currentlyEditing: TodoSubscription;

    constructor(private _subscriptionService: TodoSubscriptionService) {
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

    selectSubscription(subscription: TodoSubscription) {
        this.currentlyEditing = subscription;
    }

    save(subscription: TodoSubscription) {
        if (subscription.id) {
            this._subscriptionService.update(subscription).subscribe();
        } else {
            this._subscriptionService.create(subscription).subscribe(persistedSubscription => {
                subscription.id = persistedSubscription.id;
            });
        }
    }
}
