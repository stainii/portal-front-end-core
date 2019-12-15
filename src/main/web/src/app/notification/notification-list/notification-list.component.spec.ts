import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationListComponent} from './notification-list.component';
import {NotificationComponent} from "@app/notification/notification/notification.component";
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
import {TokenService} from "@app/user/token.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NotificationListComponent', () => {
    let component: NotificationListComponent;
    let fixture: ComponentFixture<NotificationListComponent>;
    let apiService;

    beforeEach(async(() => {
        apiService = jasmine.createSpyObj("TokenService", ["logIn"]);

        TestBed.configureTestingModule({
            declarations: [NotificationListComponent, NotificationComponent],
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
        fixture = TestBed.createComponent(NotificationListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
