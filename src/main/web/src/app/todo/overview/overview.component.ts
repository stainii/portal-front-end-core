import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "@app/todo/task.service";
import {Task} from "@app/todo/task.model";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {taskComparator} from "@app/todo/task.comparator";
import {TaskDetailsDialogComponent} from "@app/todo/task-details-dialog/task-details-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {

    mostImportantTasks: Task[];
    lessImportantTasks: Task[];
    lessImportantTasksVisible: boolean;
    private _taskWatcher: Subscription;

    constructor(private _taskService: TaskService, private _route: ActivatedRoute,
                private _router: Router, public dialog: MatDialog) {
    }

    ngOnInit() {
        this._route
            .queryParams
            .subscribe(params => {
                let context = params.context;
                this.watchTasks(context);
            });
        this.lessImportantTasksVisible = false;
    }

    ngOnDestroy(): void {
        if (this._taskWatcher) {
            this._taskWatcher.unsubscribe();
        }
    }

    makeLessImportantTasksVisible() {
        this.lessImportantTasksVisible = true;
    }

    private watchTasks(context) {
        if (this._taskWatcher) {
            this._taskWatcher.unsubscribe();
        }
        this._taskWatcher = this._taskService.watchTasks()
            .pipe(
                map(tasks => tasks.filter(task => !context || context == 'all' || task.context == context))
            ).subscribe(tasks => {
                let sortedTasks = tasks.sort(taskComparator);
                this.mostImportantTasks = sortedTasks.slice(0,5);
                this.lessImportantTasks = sortedTasks.slice(5);
            });
    }

    showDetails(task: Task) {
        console.log("Should open details of task " + task + ", either in a dialog or next to the tasks");
        setTimeout(() => {
            let dialogRef = this.dialog.open(TaskDetailsDialogComponent);

            dialogRef.afterClosed()
                .subscribe(result => this._router.navigate(["todo/overview"]));
        }, 1);
    }

    complete(task: Task) {
        console.log("Complete task " + task);
    }
}
