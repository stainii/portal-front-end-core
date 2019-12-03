import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TaskDetailsDialogComponent} from "@app/todo/task-details-dialog/task-details-dialog.component";
import {Task} from "@app/todo/task.model";
import {TaskService} from "@app/todo/task.service";

@Component({
    selector: 'app-todo-app',
    templateUrl: './todo-app.component.html',
    styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {

    constructor(private _taskService: TaskService,
                private _router: Router,
                public dialog: MatDialog) {
    }

    ngOnInit() {

    }

    complete(task: Task) {
        this._taskService.complete(task).subscribe(
            task => console.log("Task " + task.id + " completed!"),
            error => console.error(error));
    }

    showDetails(task: Task) {
        setTimeout(() => {
            let dialogConfig = {
                data: task
            };

            let dialogRef = this.dialog.open(TaskDetailsDialogComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    this._taskService.update(result, task)
                        .subscribe();
                    this._router.navigate(["todo/overview"])
                });
        }, 1);
    }

    create() {
        setTimeout(() => {
            let dialogConfig = {
                data: {}
            };

            let dialogRef = this.dialog.open(TaskDetailsDialogComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    this._taskService.create(result)
                        .subscribe(
                            task => console.log("Task created!"),
                            error => console.error(error));
                    this._router.navigate(["todo/overview"])
                });
        }, 1);
    }

}
