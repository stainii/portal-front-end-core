import {Component, OnInit} from '@angular/core';
import {TaskService} from "@app/todo/task.service";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-menu-bar-for-overview',
    templateUrl: './menu-bar-for-overview.component.html',
    styleUrls: ['./menu-bar-for-overview.component.scss']
})
export class MenuBarForOverviewComponent implements OnInit {

    contexts: string[];

    constructor(private _taskService: TaskService) {
    }

    ngOnInit() {
        this._taskService.watchTasks()
            .pipe(map(tasks => tasks.map(task => task.context)))
            .subscribe(contexts => {
                this.contexts = Array.from(new Set(contexts));
            });
    }

    refreshTasks() {
        this._taskService.refreshTasks();
    }
}
