import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HousagotchiRecurringTaskDetailsComponent} from './housagotchi-recurring-task-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MAT_DIALOG_DATA,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogRef,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule
} from "@angular/material";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('HousagotchiRecurringTaskDetailsComponent', () => {
    let component: HousagotchiRecurringTaskDetailsComponent;
    let fixture: ComponentFixture<HousagotchiRecurringTaskDetailsComponent>;
    let dialogRef;

    beforeEach(async(() => {
        dialogRef = jasmine.createSpyObj("MatDialogRef", ["open"]);
        let recurringTask = {
            id: 1,
            name: "test",
            minNumberOfDaysBetweenExecutions: 1,
            maxNumberOfDaysBetweenExecutions: 2
        };

        TestBed.configureTestingModule({
            declarations: [HousagotchiRecurringTaskDetailsComponent],
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
                {provide: MatDialogRef, useValue: dialogRef},
                {provide: MAT_DIALOG_DATA, useValue: {
                    recurringTask: recurringTask
                }},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HousagotchiRecurringTaskDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
