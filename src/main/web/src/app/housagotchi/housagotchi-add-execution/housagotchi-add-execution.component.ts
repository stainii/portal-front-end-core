import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as moment from "moment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RecurringTask} from "@app/housagotchi/recurring-task.model";
import {Execution} from "@app/housagotchi/execution.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-housagotchi-add-execution',
    templateUrl: './housagotchi-add-execution.component.html',
    styleUrls: ['./housagotchi-add-execution.component.scss']
})
export class HousagotchiAddExecutionComponent implements OnInit, OnChanges {

    addExecutionFormGroup: FormGroup;

    @Input()
    recurringTasks: RecurringTask[];

    @Output()
    onAddExecution = new EventEmitter<Execution>();

    constructor(private _formBuilder: FormBuilder,
                private _activatedRoute: ActivatedRoute) {
        this._activatedRoute.queryParams.subscribe(params => {
            let task = params['task'];
        });
    }

    ngOnInit() {
        this.addExecutionFormGroup = this._formBuilder.group({
            selectedRecurringTask: '',
            selectedDate: moment()
        });

        if (Array.isArray(this.recurringTasks)) {
            this._selectRecurringTask(this.recurringTasks[0]);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.addExecutionFormGroup) {
            return;
        }

        for (let propName in changes) {
            if (propName == "recurringTasks") {
                this.recurringTasks.forEach(newTask => {
                    if (newTask.name == this.addExecutionFormGroup.value.selectedRecurringTask.name) {
                        this._selectRecurringTask(newTask);
                    }
                })
            }
        }
    }

    addExecution() {
        if (this.addExecutionFormGroup.valid) {
            this.onAddExecution.emit({
                recurringTaskId: this.addExecutionFormGroup.value.selectedRecurringTask.id,
                    date: this.addExecutionFormGroup.value.selectedDate
            });
        }
    }

    private _selectRecurringTask(task: RecurringTask) {
        if (Array.isArray(this.recurringTasks) && this.recurringTasks.length > 0) {
            this.addExecutionFormGroup.controls['selectedRecurringTask']
                .setValue(task);
        }
    }

}
