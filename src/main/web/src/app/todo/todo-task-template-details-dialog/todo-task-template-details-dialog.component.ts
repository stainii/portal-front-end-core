import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskTemplate} from "@app/todo/task-template.model";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-todo-task-template-details-dialog',
    templateUrl: './todo-task-template-details-dialog.component.html',
    styleUrls: ['./todo-task-template-details-dialog.component.scss']
})
export class TodoTaskTemplateDetailsDialogComponent implements OnInit {

    taskTemplate: TaskTemplate;
    dialogContext: string;
    isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    constructor(public dialogRef: MatDialogRef<TodoTaskTemplateDetailsDialogComponent>,
                private _breakpointObserver: BreakpointObserver,
                @Inject(MAT_DIALOG_DATA) data: TaskTemplate) {
        if (data) {
            this.taskTemplate = Object.create(data);
            this.dialogContext = "UPDATE";
        } else {
            this.taskTemplate = new TaskTemplate();
            this.dialogContext = "CREATE";
        }
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

    saveAndClose() {
        this.dialogRef.close(this.taskTemplate);
    }
}
