import {inject, TestBed} from '@angular/core/testing';

import {AuthenticationGuardService} from './authentication-guard.service';
import {ActivatedRouteSnapshot} from "@angular/router";
import {ModuleService} from "@app/module/module.service";
import {AuthorisationGuardService} from "@app/user/authorisation-guard.service";
import {Observable, of} from "rxjs";
import {Module} from "@app/module/module.model";

describe('AuthorisationGuardService', () => {
    let moduleService;
    let route;
    let state;
    beforeEach(() => {
        moduleService = jasmine.createSpyObj('ModuleService', ['findModulesForLoggedInUser']);
        route = new ActivatedRouteSnapshot();
        state = jasmine.createSpyObj("RouterStateSnapshot", ['toString']);
        TestBed.configureTestingModule({
            providers: [AuthorisationGuardService,
                {provide: ModuleService, useValue: moduleService},
            ],
        });
    });

    it('should be created', inject([AuthorisationGuardService], (service: AuthenticationGuardService) => {
        expect(service).toBeTruthy();
    }));

    it('should allow an authorised request', done => {
        inject([AuthorisationGuardService], (service: AuthenticationGuardService) => {
            let module1 = new Module();
            module1.name = "test";

            let module2 = new Module();
            module2.name = "My-Module";

            state.url = "my-module";

            moduleService.findModulesForLoggedInUser.and.returnValue(of([module1, module2]));

            (<Observable<Boolean>>service.canActivate(route, state)).subscribe(result => {
                expect(result).toBeTruthy();
                done();
            });
        })();
    });

    it('should not allow an unauthorised request', done => {
        inject([AuthorisationGuardService], (service: AuthenticationGuardService) => {
            let module1 = new Module();
            module1.name = "test";

            let module2 = new Module();
            module2.name = "my-module";

            state.url = "another-module";

            moduleService.findModulesForLoggedInUser.and.returnValue(of([module1, module2]));

            (<Observable<Boolean>>service.canActivate(route, state)).subscribe(result => {
                expect(result).toBeFalsy();
                done();
            });
        })();
    });

    it('should not allow a random request when no modules are assigned to the user', done => {
        inject([AuthorisationGuardService], (service: AuthenticationGuardService) => {
            state.url = "any-module";

            moduleService.findModulesForLoggedInUser.and.returnValue(of([]));

            (<Observable<Boolean>>service.canActivate(route, state)).subscribe(result => {
                expect(result).toBeFalsy();
                done();
            });
        })();
    });

    it('should always allow login', inject([AuthorisationGuardService], (service: AuthenticationGuardService) => {
        state.url = "login";
        expect(service.canActivate(route, state)).toBeTruthy();
    }));

    it('should always allow login/', inject([AuthorisationGuardService], (service: AuthenticationGuardService) => {
        state.url = "login/";
        expect(service.canActivate(route, state)).toBeTruthy();
    }));

    it('should always allow root ("")', inject([AuthorisationGuardService], (service: AuthenticationGuardService) => {
        state.url = "";
        expect(service.canActivate(route, state)).toBeTruthy();
    }));

    it('should always allow root ("/")', inject([AuthorisationGuardService], (service: AuthenticationGuardService) => {
        state.url = "/";
        expect(service.canActivate(route, state)).toBeTruthy();
    }));
});
