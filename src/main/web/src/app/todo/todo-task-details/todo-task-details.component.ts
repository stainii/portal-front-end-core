import {Component, Inject} from '@angular/core';
import {Task} from '../task.model';
import {environment} from "@env/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RandomAdjectiveService} from "@app/funny-details/random-adjective.service";
import {DialogResult, DialogResultNextAction} from "@app/todo/dialog-result.model";


@Component({
    selector: 'app-todo-task-details',
    templateUrl: './todo-task-details.component.html',
    styleUrls: ['./todo-task-details.component.scss']
})
export class TodoTaskDetailsComponent {

    DEFAULT_TASK_CONTEXT = environment.defaultTaskContext;
    task: Task;
    placeholderForTaskName: string;

    constructor(public dialogRef: MatDialogRef<TodoTaskDetailsComponent, DialogResult>,
                private _randomAdjective: RandomAdjectiveService,
                @Inject(MAT_DIALOG_DATA) data: Task) {
        this.task = Object.create(data);
        this.placeholderForTaskName = "My " + this._randomAdjective.lowercase() + " task";
    }

    close() {
        this.dialogRef.close({
            nextAction: DialogResultNextAction.NO_ACTION,
            data: null
        });
    }

    saveAndClose() {
        if (this.task.name) {
            this.dialogRef.close({
                nextAction: DialogResultNextAction.SAVE_TASK,
                data: this.task
            });
        }
    }

    useATaskTemplateInstead() {
        this.dialogRef.close({
            nextAction: DialogResultNextAction.USE_A_TASK_TEMPLATE,
            data: null
        });
    }
}
