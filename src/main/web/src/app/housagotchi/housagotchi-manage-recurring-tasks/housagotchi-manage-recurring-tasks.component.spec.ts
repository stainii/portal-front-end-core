import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HousagotchiManageRecurringTasksComponent} from './housagotchi-manage-recurring-tasks.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBar,
    MatSnackBarModule,
    MatTableModule
} from "@angular/material";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {ExecutionService} from "@app/housagotchi/execution.service";
import {RecurringTaskService} from "@app/housagotchi/recurring-task.service";
import {of} from "rxjs";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('HousagotchiManageRecurringTasksComponent', () => {
    let component: HousagotchiManageRecurringTasksComponent;
    let fixture: ComponentFixture<HousagotchiManageRecurringTasksComponent>;
    let executionService;
    let snackBar;
    let recurringTaskService;

    beforeEach(async(() => {
        executionService = jasmine.createSpyObj("ExecutionService", ["addExecution"]);
        snackBar = jasmine.createSpyObj("SnackBar", ["open"]);
        recurringTaskService = jasmine.createSpyObj("RecurringTaskService", ["findAll"]);

        TestBed.configureTestingModule({
            declarations: [HousagotchiManageRecurringTasksComponent],
            imports: [
                FormsModule,
                MatCardModule,
                MatButtonModule,
                MatIconModule,
                MatListModule,
                MatCardModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatDatepickerModule,
                MatMomentDateModule,
                ReactiveFormsModule,
                MatSnackBarModule,
                MatTableModule,
                MatRadioModule,
                NoopAnimationsModule
            ], providers: [
                {provide: ExecutionService, useValue: executionService},
                {provide: MatSnackBar, useValue: snackBar},
                {provide: RecurringTaskService, useValue: recurringTaskService}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        // mock recurring tasks to satisfy ngInit
        recurringTaskService.findAll.and.returnValue(of([]));

        fixture = TestBed.createComponent(HousagotchiManageRecurringTasksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
