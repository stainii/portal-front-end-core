import {Component} from '@angular/core';
import {TaskTemplate} from "@app/todo/task-template.model";
import {MatDialog} from "@angular/material/dialog";
import {TodoTaskTemplateDetailsDialogComponent} from "@app/todo/todo-task-template-details-dialog/todo-task-template-details-dialog.component";
import {TaskTemplateService} from "@app/todo/task-template.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-todo-settings',
    templateUrl: './todo-settings.component.html',
    styleUrls: ['./todo-settings.component.scss']
})
export class TodoSettingsComponent {

    allTaskTemplates$: Observable<TaskTemplate[]>;

    constructor(public dialog: MatDialog,
                private _taskTemplateService: TaskTemplateService) {
        this.allTaskTemplates$ = _taskTemplateService.findAll();
    }

    create() {
        setTimeout(() => {
            let dialogConfig = {
                data: null
            };

            let dialogRef = this.dialog.open(TodoTaskTemplateDetailsDialogComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    this._taskTemplateService.create(result).subscribe();
                });
        }, 1);
    }

    delete(taskTemplate: TaskTemplate) {
        this._taskTemplateService.delete(taskTemplate)
            .subscribe(() => this.allTaskTemplates$ = this._taskTemplateService.findAll());
    }

}
