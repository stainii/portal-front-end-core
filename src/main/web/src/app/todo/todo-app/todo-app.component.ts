import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TodoTaskDetailsComponent} from "@app/todo/todo-task-details/todo-task-details.component";
import {Task} from "@app/todo/task.model";
import {TaskService} from "@app/todo/task.service";

@Component({
    selector: 'app-todo-app',
    templateUrl: './todo-app.component.html',
    styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {

    constructor(private _taskService: TaskService,
                public dialog: MatDialog) {
    }

    ngOnInit() {

    }

    complete(task: Task) {
        this._taskService.complete(task).subscribe(
            nothing => console.log("Task " + task.id + " completed!"),
            error => console.error(error));
    }

    showDetails(task: Task) {
        setTimeout(() => {
            let dialogConfig = {
                data: task
            };

            let dialogRef = this.dialog.open(TodoTaskDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    if (result) {
                        this._taskService.update(result, task)
                            .subscribe();
                    }
                });
        }, 1);
    }

    create() {
        setTimeout(() => {
            let dialogConfig = {
                data: null
            };

            let dialogRef = this.dialog.open(TodoTaskDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    this._taskService.create(result)
                        .subscribe(
                            task => console.log("Task created!"),
                            error => console.error(error));
                });
        }, 1);
    }

}
