import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HousagotchiMenuBarForManageRecurringTasksComponent} from './housagotchi-menu-bar-for-manage-recurring-tasks.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatIconModule} from "@angular/material";

describe('HousagotchiMenuBarForManageRecurringTasksComponent', () => {
    let component: HousagotchiMenuBarForManageRecurringTasksComponent;
    let fixture: ComponentFixture<HousagotchiMenuBarForManageRecurringTasksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HousagotchiMenuBarForManageRecurringTasksComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                MatIconModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HousagotchiMenuBarForManageRecurringTasksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
