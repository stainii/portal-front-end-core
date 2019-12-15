import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskTemplate} from "@app/todo/task-template.model";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {RandomAdjectiveService} from "@app/funny-details/random-adjective.service";

@Component({
    selector: 'app-todo-task-template-details-dialog',
    templateUrl: './todo-task-template-details-dialog.component.html',
    styleUrls: ['./todo-task-template-details-dialog.component.scss']
})
export class TodoTaskTemplateDetailsDialogComponent {

    taskTemplate: TaskTemplate;
    dialogContext: string;
    isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));
    tabs = ['First', 'Second', 'Third'];
    selectedTab = new FormControl(0);

    constructor(public dialogRef: MatDialogRef<TodoTaskTemplateDetailsDialogComponent>,
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
    }

    close() {
        this.dialogRef.close();
    }

    saveAndClose() {
        this.dialogRef.close(this.taskTemplate);
    }

    addTab() {
        this.tabs.push('New');
        this.selectedTab.setValue(this.tabs.length - 1);
    }

    removeTab(index: number) {
        this.tabs.splice(index, 1);
    }

    getRandomTemplateNamePlaceholder() {
        return "My " + this._randomAdjective.lowercase() + " task template";
    }

    getRandomVariablePlaceholder() {
        return "my" + this._randomAdjective.capitalized() + "Variable";
    }
}
