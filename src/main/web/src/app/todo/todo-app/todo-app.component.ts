import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Task} from "@app/todo/task.model";
import {TaskService} from "@app/todo/task.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {TodoTaskDetailsComponent} from "@app/todo/todo-task-details/todo-task-details.component";
import {TaskTemplateEntry} from "@app/todo/task-template-entry.model";
import {TodoTaskTemplateEntryDetailsComponent} from "@app/todo/todo-task-template-entry-details/todo-task-template-entry-details.component";
import {DialogResultNextAction} from "@app/todo/dialog-result.model";
import {ErrorService} from "@app/error/error.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-todo-app',
    templateUrl: './todo-app.component.html',
    styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent {

    tasks$: Observable<Task[]>;

    constructor(private _taskService: TaskService,
                private _route: ActivatedRoute,
                public dialog: MatDialog,
                private _errorService: ErrorService,
                private _snackBar: MatSnackBar) {
        this.tasks$ = this._taskService.watchTasks();
    }

    complete(task: Task) {
        this._taskService.complete(task).subscribe(
            taskPatchResult => {
                this._snackBar.open("Task completed", "Undo", {
                    duration: 5000,
                }).onAction()
                    .subscribe(() => this._taskService.undo(taskPatchResult.taskPatch)
                        .subscribe(() => console.info("Task patch reverted")));
                console.log("Task " + task.id + " completed!");
            }, error => this._errorService.notify(error));
    }

    showDetails(task: Task) {
        setTimeout(() => {
            let dialogConfig = {
                data: task
            };

            let dialogRef = this.dialog.open(TodoTaskDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    if (result.nextAction == DialogResultNextAction.SAVE_TASK) {
                        this._taskService.update(result.data, task)
                            .subscribe(taskPatchResult => {
                                this._snackBar.open("Task updated", "Undo", {
                                    duration: 5000,
                                }).onAction()
                                    .subscribe(() => this._taskService.undo(taskPatchResult.taskPatch)
                                        .subscribe(() => console.info("Task patch reverted")));
                                console.log("Task updated", result);
                            }, error => this._errorService.notify(error));
                    }
                });
        }, 1);
    }

    create() {
        setTimeout(() => {
            let dialogConfig = {
                data: new Task()
            };

            let dialogRef = this.dialog.open(TodoTaskDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    if (result.nextAction == DialogResultNextAction.SAVE_TASK) {
                        this._taskService.create(result.data)
                            .subscribe(
                                task => {
                                    this._snackBar.open("Task created", "Undo", {
                                        duration: 5000,
                                    }).onAction()
                                        .subscribe(() => this._taskService.undo(task.history[0])
                                            .subscribe(() => console.info("Task patch reverted")));
                                    console.log("Task created", task)
                                }, error => this._errorService.notify(error));
                    } else if (result.nextAction == DialogResultNextAction.USE_A_TASK_TEMPLATE) {
                        this.createTaskWithTaskTemplate();
                    }
                });
        }, 1);
    }

    createTaskWithTaskTemplate() {
        console.log("create task with task template");

        setTimeout(() => {
            let dialogConfig = {
                data: new TaskTemplateEntry()
            };

            let dialogRef = this.dialog.open(TodoTaskTemplateEntryDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    if (result.nextAction == DialogResultNextAction.SAVE_TASK_TEMPLATE_ENTRY) {
                        this._taskService.createTasksBasedOn(result.data)
                            .subscribe(
                                task => console.log("Tasks created!"),
                                error => this._errorService.notify(error));
                    }
                });
        }, 1);
    }

}
