import {Component} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {TaskTemplate} from "@app/todo/task-template.model";
import {Importance} from "@app/todo/importance.model";

@Component({
    selector: 'app-todo-settings',
    templateUrl: './todo-settings.component.html',
    styleUrls: ['./todo-settings.component.scss']
})
export class TodoSettingsComponent {

    treeControl = new NestedTreeControl<TaskTemplate>(node => node.subTaskTemplates);
    dataSource = new MatTreeNestedDataSource<TaskTemplate>();

    constructor() {
        this.dataSource.data = [
            {
                "id": "5dee647e4fd468674cf4e0ac",
                "name": "nummer 1",
                "deviationOfTheMainTaskStartDateTime": null,
                "deviationOfTheMainTaskDueDateTime": null,
                "expectedDurationInHours": 3,
                "context": "Realdolmen",
                "importance": Importance.NOT_SO_IMPORTANT,
                "description": null,
                "subTaskTemplates": [],
                "variableNames": []
            },
            {
                "id": "5dee65a04fd468674cf4e0ad",
                "name": "nummer 1",
                "deviationOfTheMainTaskStartDateTime": null,
                "deviationOfTheMainTaskDueDateTime": null,
                "expectedDurationInHours": 3,
                "context": "Realdolmen",
                "importance": Importance.NOT_SO_IMPORTANT,
                "description": null,
                "subTaskTemplates": [
                    {
                        "id": null,
                        "name": "nummer 2",
                        "deviationOfTheMainTaskStartDateTime": null,
                        "deviationOfTheMainTaskDueDateTime": null,
                        "expectedDurationInHours": 3,
                        "context": "Realdolmen",
                        "importance": Importance.NOT_SO_IMPORTANT,
                        "description": null,
                        "subTaskTemplates": [],
                        "variableNames": []
                    }
                ],
                "variableNames": []
            }
        ];
    }

    hasChild = (_: number, node: TaskTemplate) => !!node.subTaskTemplates && node.subTaskTemplates.length > 0;


}
