import {Component, OnInit} from '@angular/core';
import {ExecutionService} from "@app/recurring-tasks/execution.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {Execution} from "@app/recurring-tasks/execution.model";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {DEPLOYMENT_NAME} from "@app/housagotchi/housagotchi-constants";

@Component({
    selector: 'app-housagotchi-app',
    templateUrl: './housagotchi-app.component.html',
    styleUrls: ['./housagotchi-app.component.scss']
})
export class HousagotchiAppComponent implements OnInit {

    recurringTasks: RecurringTask[];

    constructor(private _executionService: ExecutionService,
                private _snackBar: MatSnackBar,
                private _recurringTaskService: RecurringTaskService) {
    }

    ngOnInit() {
        this._findAllRecurringTasks();
    }

    addExecution(execution: Execution) {
        this._executionService.addExecution(DEPLOYMENT_NAME, execution)
            .subscribe(() => {
                this._snackBar.open("Done!", "Thank you!", {
                    duration: 2000,
                });
                this._findAllRecurringTasks();
            });
    }

    _findAllRecurringTasks() {
        this._recurringTaskService
            .findAll(DEPLOYMENT_NAME)
            .subscribe(recurringTasks => this.recurringTasks = recurringTasks);
    }

}
