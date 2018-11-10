import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationMenuBarForListComponent} from './notification-menu-bar-for-list.component';
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

describe('NotificationMenuBarForListComponent', () => {
    let component: NotificationMenuBarForListComponent;
    let fixture: ComponentFixture<NotificationMenuBarForListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationMenuBarForListComponent],
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
        fixture = TestBed.createComponent(NotificationMenuBarForListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
