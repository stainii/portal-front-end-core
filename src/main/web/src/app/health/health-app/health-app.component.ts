import {Component, OnInit} from '@angular/core';
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {ExecutionService} from "@app/recurring-tasks/execution.service";
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {Execution} from "@app/recurring-tasks/execution.model";
import {DEPLOYMENT_NAME} from "@app/health/health-constants";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-health-app',
  templateUrl: './health-app.component.html',
  styleUrls: ['./health-app.component.scss']
})
export class HealthAppComponent implements OnInit {

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
                this._snackBar.open("Done!", "Ow yeah!", {
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
