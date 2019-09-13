import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { Task } from '@app/todo/task.model';

@Component({
    selector: 'app-task-details-dialog',
    templateUrl: './task-details-dialog.component.html',
    styleUrls: ['./task-details-dialog.component.scss']
})
export class TaskDetailsDialogComponent implements OnInit {

    task: Task;

    constructor(public dialogRef: MatDialogRef<TaskDetailsDialogComponent>) {
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }
}
