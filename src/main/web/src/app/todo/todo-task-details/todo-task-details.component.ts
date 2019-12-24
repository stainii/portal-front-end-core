import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from '@app/todo/task.model';
import {environment} from "@env/environment";

@Component({
    selector: 'app-todo-task-details',
    templateUrl: './todo-task-details.component.html',
    styleUrls: ['./todo-task-details.component.scss']
})
export class TodoTaskDetailsComponent implements OnInit {

    DEFAULT_TASK_CONTEXT = environment.defaultTaskContext;
    task: Task;
    dialogContext: string;

    constructor(public dialogRef: MatDialogRef<TodoTaskDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) data: Task) {
        if (data) {
            this.task = Object.create(data);
            this.dialogContext = "UPDATE";
        } else {
            this.task = new Task();
            this.dialogContext = "CREATE";
        }
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

    saveAndClose() {
        if (this.task.name) {
            this.dialogRef.close(this.task);
        }
    }
}
