import {inject, TestBed} from '@angular/core/testing';

import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "@env/environment";
import {TaskService} from "@app/todo/task.service";
import {Task} from './task.model';
import {LocalStorageService} from "ngx-webstorage";
import {TaskPatchService} from "@app/todo/task-patch.service";

let localStorageService;
let taskPatchService;

describe('TaskService', () => {
    localStorageService = jasmine.createSpyObj("LocalStorageService", ["retrieve", "store", "clear"]);
    taskPatchService = jasmine.createSpyObj("TaskPatchService", ["update"]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TaskService,
                { provide: LocalStorageService, useValue: localStorageService },
                { provide: TaskPatchService, useValue: taskPatchService }
            ],
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ]
        });
    });

    it('should be created', inject([TaskService], (service: TaskService) => {
        expect(service).toBeTruthy();
    }));

    it('should create a task and not change the context when it is already filled in', inject([TaskService, HttpTestingController], (service: TaskService, backend: HttpTestingController) => {
        const task = new Task();
        task.id = "12";
        task.name = 'test';
        task.context = 'myContext';

        service.create(task).subscribe();

        let request = backend.expectOne({
            url: environment.apiBaseUrl + "todo/task/",
            method: 'POST'
        });
        request.flush(task);
    }));

    it('should create a task and not change the context to a default value when it is not filled in', inject([TaskService, HttpTestingController], (service: TaskService, backend: HttpTestingController) => {
        const task = new Task();
        task.id = "12";
        task.name = 'test';

        service.create(task).subscribe();

        let request = backend.expectOne({
            url: environment.apiBaseUrl + "todo/task/",
            method: 'POST'
        });
        request.flush(task);

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(task.context).toEqual(environment.defaultTaskContext);
    }));

    it('should create a task and not change the context to a default value when it is empty', inject([TaskService, HttpTestingController], (service: TaskService, backend: HttpTestingController) => {
        const task = new Task();
        task.id = "12";
        task.name = 'test';
        task.context = "";

        service.create(task).subscribe();

        let request = backend.expectOne({
            url: environment.apiBaseUrl + "todo/task/",
            method: 'POST'
        });
        request.flush(task);

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(task.context).toEqual(environment.defaultTaskContext);
    }));

    it('should update a task and not change the context when it is already filled in', inject([TaskService, HttpTestingController], (service: TaskService, backend: HttpTestingController) => {
        const originalTask = new Task();
        originalTask.id = "12";
        originalTask.name = 'test';
        originalTask.context = "testContext";

        const updatedTask = new Task();
        updatedTask.id = "12";
        updatedTask.name = 'test';
        updatedTask.context = 'newContext';

        service.update(updatedTask, originalTask);

        expect(taskPatchService.update).toHaveBeenCalledWith(updatedTask, originalTask);
    }));

    it('should update a task and not change the context to a default value when it is not filled in', inject([TaskService, HttpTestingController], (service: TaskService, backend: HttpTestingController) => {
        const originalTask = new Task();
        originalTask.id = "12";
        originalTask.name = 'test';
        originalTask.context = "testContext";

        const updatedTask = new Task();
        updatedTask.id = "12";
        updatedTask.name = 'test';

        service.update(updatedTask, originalTask);

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(updatedTask.context).toEqual(environment.defaultTaskContext);
        expect(taskPatchService.update).toHaveBeenCalledWith(updatedTask, originalTask);
    }));

    it('should update a task and not change the context to a default value when it is empty', inject([TaskService, HttpTestingController], (service: TaskService, backend: HttpTestingController) => {
        const originalTask = new Task();
        originalTask.id = "12";
        originalTask.name = 'test';
        originalTask.context = "testContext";

        const updatedTask = new Task();
        updatedTask.id = "12";
        updatedTask.name = 'test';
        updatedTask.context = "";

        service.update(updatedTask, originalTask);

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(updatedTask.context).toEqual(environment.defaultTaskContext);
        expect(taskPatchService.update).toHaveBeenCalledWith(updatedTask, originalTask);
    }));
});
