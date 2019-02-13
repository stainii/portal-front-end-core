import {Component, OnInit} from '@angular/core';
import {ExecutionService} from "@app/housagotchi/execution.service";
import {MatSnackBar} from "@angular/material";
import {RecurringTaskService} from "@app/housagotchi/recurring-task.service";
import {Execution} from "@app/housagotchi/execution.model";
import {RecurringTask} from "@app/housagotchi/recurring-task.model";

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
        this._executionService.addExecution(execution)
            .subscribe(() => {
                this._snackBar.open("Done!", "Thank you!", {
                    duration: 2000,
                });
                this._findAllRecurringTasks();
            });
    }

    _findAllRecurringTasks() {
        this._recurringTaskService
            .findAll()
            .subscribe(recurringTasks => this.recurringTasks = recurringTasks);
    }

}
