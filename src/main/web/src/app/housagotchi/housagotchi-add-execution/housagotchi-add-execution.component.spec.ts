import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HousagotchiAddExecutionComponent} from './housagotchi-add-execution.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule
} from "@angular/material";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";

describe('HousagotchiAddExecutionComponent', () => {
    let component: HousagotchiAddExecutionComponent;
    let fixture: ComponentFixture<HousagotchiAddExecutionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HousagotchiAddExecutionComponent],
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
                MatDatepickerModule,
                MatMomentDateModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HousagotchiAddExecutionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
