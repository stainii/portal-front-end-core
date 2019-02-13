import {Component, OnInit} from '@angular/core';
import {RecurringTaskService} from "@app/housagotchi/recurring-task.service";
import {RecurringTask} from "@app/housagotchi/recurring-task.model";
import {MatDialog, MatSnackBar} from "@angular/material";
import {HousagotchiRecurringTaskDetailsComponent} from "@app/housagotchi/housagotchi-recurring-task-details/housagotchi-recurring-task-details.component";

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
            .delete(recurringTask)
            .subscribe(() => {
                this._loadRecurringTasks();
                this._snackBar.open(`${recurringTask.name} deleted`, "Ok!", {
                    duration: 2000,
                });
            });
    }

    private _loadRecurringTasks() {
        this._recurringTaskService
            .findAll()
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
                this._recurringTaskService.create(result).subscribe(() => {
                    this._loadRecurringTasks();
                });
                this._snackBar.open(`${result.name} created!`, "Ok!", {
                    duration: 2000,
                });
            } else {
                this._recurringTaskService.update(result).subscribe(() => {
                    this._loadRecurringTasks();
                    this._snackBar.open(`${result.name} updated!`, "Ok!", {
                        duration: 2000,
                    });
                });
            }
        });
    }
}
