import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TaskService} from "@app/todo/task.service";
import {Task} from "@app/todo/task.model";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {taskComparator} from "@app/todo/task.comparator";

@Component({
    selector: 'app-todo-overview',
    templateUrl: './todo-overview.component.html',
    styleUrls: ['./todo-overview.component.scss'],
})
export class TodoOverviewComponent implements OnInit, OnDestroy {

    mostImportantTasks: Task[];
    lessImportantTasks: Task[];
    lessImportantTasksVisible: boolean;
    private _taskWatcher: Subscription;

    @Output()
    public onEdit: EventEmitter<Task> = new EventEmitter<Task>();

    @Output()
    public onComplete: EventEmitter<Task> = new EventEmitter<Task>();

    constructor(private _taskService: TaskService, private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route
            .queryParams
            .subscribe(params => {
                let context = params.context;
                this.watchTasks(context);
            });
        this.lessImportantTasksVisible = false;
    }

    ngOnDestroy(): void {
        if (this._taskWatcher) {
            this._taskWatcher.unsubscribe();
        }
    }

    makeLessImportantTasksVisible() {
        this.lessImportantTasksVisible = true;
    }

    private watchTasks(context) {
        if (this._taskWatcher) {
            this._taskWatcher.unsubscribe();
        }
        this._taskWatcher = this._taskService.watchTasks()
            .pipe(
                map(tasks => tasks.filter(task => !context || context == 'all' || task.context == context))
            ).subscribe(tasks => {
                let sortedTasks = tasks.sort(taskComparator);
                this.mostImportantTasks = sortedTasks.slice(0,5);
                this.lessImportantTasks = sortedTasks.slice(5);
            });
    }

    edit(task: Task) {
        this.onEdit.emit(task);
    }

    complete(task: Task) {
        this.onComplete.emit(task);
    }

}
