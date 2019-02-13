import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationMenuBarForSubscriptionsComponent} from './notification-menu-bar-for-subscriptions.component';
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
import {RouterTestingModule} from "@angular/router/testing";

describe('NotificationMenuBarForSubscriptionsComponent', () => {
    let component: NotificationMenuBarForSubscriptionsComponent;
    let fixture: ComponentFixture<NotificationMenuBarForSubscriptionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationMenuBarForSubscriptionsComponent],
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
                RouterTestingModule.withRoutes([]),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationMenuBarForSubscriptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
