import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationAppComponent} from './notification-app.component';
import {NotificationListComponent} from "@app/notification/notification-list/notification-list.component";
import {SubscriptionEditorComponent} from "@app/notification/subscription-editor/subscription-editor.component";
import {NotificationComponent} from "@app/notification/notification/notification.component";
import {SubscriptionListComponent} from "@app/notification/subscription-list/subscription-list.component";
import {SubscriptionDetailsComponent} from "@app/notification/subscription-details/subscription-details.component";
import {FormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule
} from "@angular/material";
import {TokenService} from "@app/token.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NotificationAppComponent', () => {
    let component: NotificationAppComponent;
    let fixture: ComponentFixture<NotificationAppComponent>;
    let apiService;

    beforeEach(async(() => {
        apiService = jasmine.createSpyObj("TokenService", ["logIn"]);

        TestBed.configureTestingModule({
            declarations: [NotificationAppComponent,
                NotificationListComponent,
                SubscriptionEditorComponent,
                NotificationComponent,
                SubscriptionListComponent,
                SubscriptionDetailsComponent],
            imports: [
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
                HttpClientTestingModule
            ], providers: [
                {provide: TokenService, useValue: apiService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
