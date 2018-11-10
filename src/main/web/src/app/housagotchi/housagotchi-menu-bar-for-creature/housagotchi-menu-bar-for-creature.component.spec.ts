import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HousagotchiMenuBarForCreatureComponent} from './housagotchi-menu-bar-for-creature.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatIconModule} from "@angular/material";

describe('HousagotchiMenuBarForCreatureComponent', () => {
    let component: HousagotchiMenuBarForCreatureComponent;
    let fixture: ComponentFixture<HousagotchiMenuBarForCreatureComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HousagotchiMenuBarForCreatureComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                MatIconModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HousagotchiMenuBarForCreatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
