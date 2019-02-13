import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HousagotchiAppComponent} from './housagotchi-app.component';
import {HousagotchiAddExecutionComponent} from "@app/housagotchi/housagotchi-add-execution/housagotchi-add-execution.component";
import {HousagotchiBalloonComponent} from "@app/housagotchi/housagotchi-balloon/housagotchi-balloon.component";
import {HousagotchiCreatureComponent} from "@app/housagotchi/housagotchi-creature/housagotchi-creature.component";
import {HousagotchiManageRecurringTasksComponent} from "@app/housagotchi/housagotchi-manage-recurring-tasks/housagotchi-manage-recurring-tasks.component";
import {HousagotchiMenuBarForCreatureComponent} from "@app/housagotchi/housagotchi-menu-bar-for-creature/housagotchi-menu-bar-for-creature.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSnackBar,
    MatTableModule
} from "@angular/material";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ExecutionService} from "@app/housagotchi/execution.service";
import {RecurringTaskService} from "@app/housagotchi/recurring-task.service";
import {of} from 'rxjs';

describe('HousagotchiAppComponent', () => {
    let component: HousagotchiAppComponent;
    let fixture: ComponentFixture<HousagotchiAppComponent>;
    let executionService: ExecutionService;
    let snackBar: MatSnackBar;
    let recurringTaskService;

    beforeEach(async(() => {
        executionService = jasmine.createSpyObj("ExecutionService", ["addExecution"]);
        snackBar = jasmine.createSpyObj("SnackBar", ["open"]);
        recurringTaskService = jasmine.createSpyObj("RecurringTaskService", ["findAll"]);


        TestBed.configureTestingModule({
            declarations: [
                HousagotchiAppComponent,
                HousagotchiAddExecutionComponent,
                HousagotchiBalloonComponent,
                HousagotchiCreatureComponent,
                HousagotchiManageRecurringTasksComponent,
                HousagotchiMenuBarForCreatureComponent,
            ], imports: [
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
                RouterTestingModule.withRoutes([]),
                NoopAnimationsModule,
                MatTableModule
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

        fixture = TestBed.createComponent(HousagotchiAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
