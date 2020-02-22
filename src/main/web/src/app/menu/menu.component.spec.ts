import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {MatListModule} from "@angular/material/list";
import {ModuleService} from "@app/module/module.service";
import {of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let moduleService;

    beforeEach(async(() => {
        moduleService = jasmine.createSpyObj("ModuleService", ["findModulesForLoggedInUser"]);
        TestBed.configureTestingModule({
            declarations: [MenuComponent],
            providers: [
                {provide: ModuleService, useValue: moduleService}
            ], imports: [
                MatListModule,
                RouterTestingModule.withRoutes([]),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        moduleService.findModulesForLoggedInUser.and.returnValue(of([]));
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
