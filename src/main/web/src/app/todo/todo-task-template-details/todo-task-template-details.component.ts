import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskTemplate} from "@app/todo/task-template.model";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {RandomAdjectiveService} from "@app/funny-details/random-adjective.service";
import {TaskDefinition} from "@app/todo/task-definition.model";

@Component({
    selector: 'app-todo-task-template-details',
    templateUrl: './todo-task-template-details.component.html',
    styleUrls: ['./todo-task-template-details.component.scss']
})
export class TodoTaskTemplateDetailsComponent {

    taskTemplate: TaskTemplate;
    newVariableName: string;

    dialogContext: string;
    isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));
    selectedTaskDefinition = new FormControl(0);
    placeholderForTaskTemplateName: string;
    placeholderForVariableName: string;

    constructor(public dialogRef: MatDialogRef<TodoTaskTemplateDetailsComponent>,
                private _breakpointObserver: BreakpointObserver,
                private _randomAdjective: RandomAdjectiveService,
                @Inject(MAT_DIALOG_DATA) data: TaskTemplate) {
        if (data) {
            this.taskTemplate = Object.create(data);
            this.dialogContext = "UPDATE";
        } else {
            this.taskTemplate = new TaskTemplate();
            this.dialogContext = "CREATE";
        }

        this.placeholderForTaskTemplateName = "My " + this._randomAdjective.lowercase() + " task template";
        this.placeholderForVariableName = "my" + this._randomAdjective.capitalized() + "Variable";
    }

    close() {
        this.dialogRef.close();
    }

    saveAndClose() {
        if (this.isValid(this.taskTemplate)) {
            this.dialogRef.close(this.taskTemplate);
        }
    }

    private isValid(taskTemplate: TaskTemplate) {
        for (let taskDefinition of taskTemplate.taskDefinitions) {
            if (!!taskDefinition.name) {
                return false;
            }
        }
        return taskTemplate.name!!;
    }

    addTab() {
        let newTaskDefinition = new TaskDefinition();

        if (this.taskTemplate.taskDefinitions) {
            this.taskTemplate.taskDefinitions.push(newTaskDefinition);
        } else {
            this.taskTemplate.taskDefinitions = [newTaskDefinition];
        }
        this.selectedTaskDefinition.setValue(this.taskTemplate.taskDefinitions.length - 1);
    }

    deleteTaskDefinition(index: number) {
        this.taskTemplate.taskDefinitions.splice(index, 1);
    }

    addVariableName() {
        if (!this.taskTemplate.variableNames) {
            this.taskTemplate.variableNames = [this.newVariableName];
        } else {
            this.taskTemplate.variableNames.push(this.newVariableName);
        }
        this.newVariableName = "";
    }

    deleteVariableName(variableName) {
        let index = this.taskTemplate.variableNames.indexOf(variableName);
        this.taskTemplate.variableNames.splice(index, 1);
    }
}