import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "@app/todo/task.model";
import {ActivatedRoute} from "@angular/router";
import {taskComparator} from "@app/todo/task.comparator";

@Component({
    selector: 'app-todo-overview',
    templateUrl: './todo-overview.component.html',
    styleUrls: ['./todo-overview.component.scss'],
})
export class TodoOverviewComponent implements OnInit {

    mostImportantTasks: Task[];
    lessImportantTasks: Task[];
    lessImportantTasksVisible: boolean;

    private _allTasks: Task[];
    private context: string;

    @Input()
    set tasks(tasks: Task[]) {
        this._allTasks = tasks;
        this.watchTasks();
    };

    @Output()
    public onEdit: EventEmitter<Task> = new EventEmitter<Task>();

    @Output()
    public onComplete: EventEmitter<Task> = new EventEmitter<Task>();

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route
            .queryParams
            .subscribe(params => {
                this.context = params.context;
                this.watchTasks();
            });
        this.lessImportantTasksVisible = false;
    }

    makeLessImportantTasksVisible() {
        this.lessImportantTasksVisible = true;
    }

    edit(task: Task) {
        this.onEdit.emit(task);
    }

    complete(task: Task) {
        this.onComplete.emit(task);
    }

    private watchTasks() {
        let sortedTasks = this._allTasks
            .filter(task => !this.context || this.context == 'all' || task.context == this.context)
            .sort(taskComparator);
        this.mostImportantTasks = sortedTasks.slice(0,5);
        this.lessImportantTasks = sortedTasks.slice(5);
    }

}
