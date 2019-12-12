import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {TaskTemplate} from "@app/todo/task-template.model";
import {MatTreeNestedDataSource} from "@angular/material/tree";

@Component({
    selector: 'app-todo-task-templates',
    templateUrl: './todo-task-templates.component.html',
    styleUrls: ['./todo-task-templates.component.scss']
})
export class TodoTaskTemplatesComponent {

    treeControl = new NestedTreeControl<TaskTemplate>(node => node.subTaskTemplates);
    dataSource = new MatTreeNestedDataSource<TaskTemplate>();

    @Input()
    public set templates(templates: TaskTemplate[]) {
        this.dataSource.data = templates;
    }

    @Output()
    onDelete: EventEmitter<TaskTemplate> = new EventEmitter<TaskTemplate>();

    hasChild = (_: number, node: TaskTemplate) => !!node.subTaskTemplates && node.subTaskTemplates.length > 0;

    delete(template: TaskTemplate) {
        this.onDelete.emit(template);
    }
}
