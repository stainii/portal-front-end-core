import {Component} from '@angular/core';
import {TaskTemplate} from "@app/todo/task-template.model";
import {MatDialog} from "@angular/material/dialog";
import {TodoTaskTemplateDetailsComponent} from "@app/todo/todo-task-template-details/todo-task-template-details.component";
import {TaskTemplateService} from "@app/todo/task-template.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-todo-templates',
    templateUrl: './todo-templates.component.html',
    styleUrls: ['./todo-templates.component.scss']
})
export class TodoTemplatesComponent {

    allTaskTemplates$: Observable<TaskTemplate[]>;

    constructor(public dialog: MatDialog,
                private _taskTemplateService: TaskTemplateService) {
        this.allTaskTemplates$ = _taskTemplateService.findAll();
    }

    showCreateDialog() {
        setTimeout(() => {
            let dialogConfig = {
                data: new TaskTemplate()
            };

            let dialogRef = this.dialog.open(TodoTaskTemplateDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    if (result) {
                        this._taskTemplateService.create(result)
                            .subscribe(() => this.allTaskTemplates$ = this._taskTemplateService.findAll());
                    }
                });
        }, 1);
    }

    showEditDialog(taskTemplate: TaskTemplate) {
        setTimeout(() => {
            let dialogConfig = {
                data: taskTemplate
            };

            let dialogRef = this.dialog.open(TodoTaskTemplateDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .subscribe(result => {
                    if (result) {
                        this._taskTemplateService.update(taskTemplate)
                            .subscribe(() => this.allTaskTemplates$ = this._taskTemplateService.findAll());
                    }
                });
        }, 1);

    }

    delete(taskTemplate: TaskTemplate) {
        // no dialog shown here, just delete
        this._taskTemplateService.delete(taskTemplate)
            .subscribe(() => this.allTaskTemplates$ = this._taskTemplateService.findAll());
    }


}
