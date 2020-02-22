import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificationRoutingModule} from './notification-routing.module';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NotificationAppComponent} from './notification-app/notification-app.component';
import {NotificationComponent} from "@app/notification/notification/notification.component";
import {SubscriptionEditorComponent} from "@app/notification/subscription-editor/subscription-editor.component";
import {SubscriptionDetailsComponent} from "@app/notification/subscription-details/subscription-details.component";
import {SubscriptionListComponent} from "@app/notification/subscription-list/subscription-list.component";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AuthenticationHttpInterceptor} from "@app/user/authentication.interceptor";
/* manage font-awesome icons */
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {NotificationMenuBarForListComponent} from './notification-menu-bar-for-list/notification-menu-bar-for-list.component';
import {NotificationMenuBarForSubscriptionsComponent} from './notification-menu-bar-for-subscriptions/notification-menu-bar-for-subscriptions.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";

library.add(faBell);

@NgModule({
    imports: [
        CommonModule,
        NotificationRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        FormsModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    declarations: [
        NotificationListComponent,
        NotificationAppComponent,
        NotificationComponent,
        SubscriptionEditorComponent,
        SubscriptionListComponent,
        SubscriptionDetailsComponent,
        NotificationMenuBarForListComponent,
        NotificationMenuBarForSubscriptionsComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationHttpInterceptor,
            multi: true
        }
    ]
})
export class NotificationModule {
}
