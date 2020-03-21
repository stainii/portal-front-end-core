import {Component, OnInit} from '@angular/core';
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HousagotchiRecurringTaskDetailsComponent} from "@app/housagotchi/housagotchi-recurring-task-details/housagotchi-recurring-task-details.component";
import {DEPLOYMENT_NAME} from "@app/housagotchi/housagotchi-constants";

@Component({
    selector: 'app-housagotchi-manage-recurring-tasks',
    templateUrl: './housagotchi-manage-recurring-tasks.component.html',
    styleUrls: ['./housagotchi-manage-recurring-tasks.component.scss']
})
export class HousagotchiManageRecurringTasksComponent implements OnInit {

    displayedColumns: string[] = ['name', 'minNumberOfDaysBetweenExecutions', 'maxNumberOfDaysBetweenExecutions', 'edit', 'delete',];
    recurringTasks: RecurringTask[];

    constructor(private _recurringTaskService: RecurringTaskService,
                private _snackBar: MatSnackBar,
                private _dialog: MatDialog) {

    }

    ngOnInit() {
        this._loadRecurringTasks();
    }

    edit(recurringTask: RecurringTask): void {
        this._showDialog(recurringTask);
    }

    create() {
        this._showDialog(new RecurringTask());
    }

    delete(recurringTask: RecurringTask) {
        this._recurringTaskService
            .delete(DEPLOYMENT_NAME, recurringTask)
            .subscribe(() => {
                this._loadRecurringTasks();
                this._snackBar.open(`${recurringTask.name} deleted`, "Ok!", {
                    duration: 2000,
                });
            });
    }

    private _loadRecurringTasks() {
        this._recurringTaskService
            .findAll(DEPLOYMENT_NAME)
            .subscribe(recurringTasks => this.recurringTasks = recurringTasks);
    }

    private _showDialog(recurringTask: RecurringTask) {
        const dialogRef = this._dialog.open(HousagotchiRecurringTaskDetailsComponent, {
            width: '250px',
            data: {recurringTask: recurringTask}
        });

        dialogRef.afterClosed().subscribe(result => {
            let isNew = !result.id;
            if (isNew) {
                this._recurringTaskService.create(DEPLOYMENT_NAME, result).subscribe(() => {
                    this._loadRecurringTasks();
                });
                this._snackBar.open(`${result.name} created!`, "Ok!", {
                    duration: 2000,
                });
            } else {
                this._recurringTaskService.update(DEPLOYMENT_NAME, result).subscribe(() => {
                    this._loadRecurringTasks();
                    this._snackBar.open(`${result.name} updated!`, "Ok!", {
                        duration: 2000,
                    });
                });
            }
        });
    }
}
