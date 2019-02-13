import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationAppComponent} from "@app/notification/notification-app/notification-app.component";
import {NotificationMenuBarForListComponent} from "@app/notification/notification-menu-bar-for-list/notification-menu-bar-for-list.component";
import {NotificationMenuBarForSubscriptionsComponent} from "@app/notification/notification-menu-bar-for-subscriptions/notification-menu-bar-for-subscriptions.component";
import {SubscriptionEditorComponent} from "@app/notification/subscription-editor/subscription-editor.component";

const routes: Routes = [
    {
        path: "",
        component: NotificationAppComponent,
    }, {
        path: "",
        component: NotificationMenuBarForListComponent,
        outlet: "menuBar"
    }, {
        path: "subscription",
        component: SubscriptionEditorComponent,
    }, {
        path: "subscription",
        component: NotificationMenuBarForSubscriptionsComponent,
        outlet: "menuBar"
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
