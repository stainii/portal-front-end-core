import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HousagotchiCreatureComponent} from './housagotchi-creature.component';
import {HousagotchiBalloonComponent} from "@app/housagotchi/housagotchi-balloon/housagotchi-balloon.component";
import {ReportService} from "@app/housagotchi/report.service";

describe('HousagotchiCreatureComponent', () => {
    let component: HousagotchiCreatureComponent;
    let fixture: ComponentFixture<HousagotchiCreatureComponent>;
    let reportService;

    beforeEach(async(() => {
        reportService = jasmine.createSpyObj("ReportService", ["assemble"]);

        TestBed.configureTestingModule({
            declarations: [
                HousagotchiCreatureComponent,
                HousagotchiBalloonComponent
            ], providers: [
                {provide: ReportService, useValue: reportService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HousagotchiCreatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
