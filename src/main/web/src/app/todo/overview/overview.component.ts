import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "@app/todo/task.service";
import {Task} from "@app/todo/task.model";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {taskComparator} from "@app/todo/task.comparator";

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {

    tasks: Task[];
    private _taskWatcher: Subscription;

    constructor(private _taskService: TaskService, private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route
            .queryParams
            .subscribe(params => {
                let context = params.context;
                this.watchTasks(context);
            });

    }

    ngOnDestroy(): void {
        if (this._taskWatcher) {
            this._taskWatcher.unsubscribe();
        }
    }

    private watchTasks(context) {
        if (this._taskWatcher) {
            this._taskWatcher.unsubscribe();
        }
        this._taskWatcher = this._taskService.watchTasks()
            .pipe(
                map(tasks =>
                    tasks.filter(task => !context || task.context == context)
                )
            ).subscribe(tasks => this.tasks = tasks.sort(taskComparator));
    }

}
