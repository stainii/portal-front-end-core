import {inject, TestBed} from '@angular/core/testing';

import {ModuleService} from './module.service';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "@env/environment";
import {Subject} from "rxjs";
import {UserService} from "@app/user.service";
import {Module} from "@app/module.model";

describe('ModuleService', () => {
    let userService;
    let userLoginStatus = new Subject<Boolean>();

    beforeEach(() => {
        userService = jasmine.createSpyObj("UserService", ["watchLoginStatus"]);
        userService.watchLoginStatus.and.returnValue(userLoginStatus.asObservable());

        TestBed.configureTestingModule({
            providers: [
                ModuleService,
                {provide: UserService, useValue: userService}
            ], imports: [
                HttpClientModule,
                HttpClientTestingModule
            ]
        });

    });

    it('should be created', inject([ModuleService], (service: ModuleService) => {
        expect(service).toBeTruthy();
    }));

    it('should fetch the modules for the logged in user',
        inject([ModuleService, HttpTestingController], (service: ModuleService, backend: HttpTestingController) => {
            service.findModulesForLoggedInUser().subscribe();
            const call = backend.expectOne({
                url: environment.apiBaseUrl + 'front-end/api/module/',
                method: 'GET'
            });
            call.flush([new Module()]);
        })
    );

});
