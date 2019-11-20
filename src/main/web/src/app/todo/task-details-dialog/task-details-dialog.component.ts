import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from '@app/todo/task.model';

@Component({
    selector: 'app-task-details-dialog',
    templateUrl: './task-details-dialog.component.html',
    styleUrls: ['./task-details-dialog.component.scss']
})
export class TaskDetailsDialogComponent implements OnInit {

    task: Task;

    constructor(public dialogRef: MatDialogRef<TaskDetailsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) data: Task) {
        this.task = Object.create(data);
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
