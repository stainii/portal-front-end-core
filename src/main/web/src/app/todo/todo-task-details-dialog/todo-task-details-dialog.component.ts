import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from '@app/todo/task.model';

@Component({
    selector: 'app-todo-task-details-dialog',
    templateUrl: './todo-task-details-dialog.component.html',
    styleUrls: ['./todo-task-details-dialog.component.scss']
})
export class TodoTaskDetailsDialogComponent implements OnInit {

    task: Task;
    dialogContext: string;

    constructor(public dialogRef: MatDialogRef<TodoTaskDetailsDialogComponent>,
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
        this.dialogRef.close(this.task);
    }
}
