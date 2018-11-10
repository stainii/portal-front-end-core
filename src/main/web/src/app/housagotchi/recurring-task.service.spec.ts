import {inject, TestBed} from '@angular/core/testing';

import {RecurringTaskService} from './recurring-task.service';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "@env/environment";
import {RecurringTask} from "@app/housagotchi/recurring-task.model";

describe('RecurringTaskService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RecurringTaskService],
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ]
        });
    });

    it('should be created', inject([RecurringTaskService], (service: RecurringTaskService) => {
        expect(service).toBeTruthy();
    }));

    it('should find all recurring tasks', inject([RecurringTaskService, HttpTestingController], (service: RecurringTaskService, backend: HttpTestingController) => {
        service.findAll().subscribe();

        backend.expectOne({
            url: environment.apiBaseUrl + 'housagotchi/api/recurring-task/',
            method: 'GET'
        });
    }));

    it('should delete a recurring task', inject([RecurringTaskService, HttpTestingController], (service: RecurringTaskService, backend: HttpTestingController) => {
        const recurringTask: RecurringTask = {
            id: 12,
            name: 'test',
            minNumberOfDaysBetweenExecutions: 1,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: null
        };
        service.delete(recurringTask).subscribe();

        backend.expectOne({
            url: environment.apiBaseUrl + 'housagotchi/api/recurring-task/12/',
            method: 'DELETE'
        });
    }));

    it('should update a recurring task', inject([RecurringTaskService, HttpTestingController], (service: RecurringTaskService, backend: HttpTestingController) => {
        const recurringTask: RecurringTask = {
            id: 12,
            name: 'test',
            minNumberOfDaysBetweenExecutions: 1,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: null
        };
        service.update(recurringTask).subscribe();

        let request = backend.expectOne({
            url: environment.apiBaseUrl + 'housagotchi/api/recurring-task/12/',
            method: 'PUT'
        });
        request.flush(recurringTask);
    }));

    it('should create a recurring task', inject([RecurringTaskService, HttpTestingController], (service: RecurringTaskService, backend: HttpTestingController) => {
        const recurringTask: RecurringTask = {
            id: 12,
            name: 'test',
            minNumberOfDaysBetweenExecutions: 1,
            maxNumberOfDaysBetweenExecutions: 10,
            lastExecution: null
        };
        service.create(recurringTask).subscribe();

        let request = backend.expectOne({
            url: environment.apiBaseUrl + 'housagotchi/api/recurring-task/',
            method: 'POST'
        });
        request.flush(recurringTask);
    }));
});
