import {Component, Input} from '@angular/core';
import {Task} from '@app/todo/task.model';
import {animate, keyframes, style, transition, trigger} from "@angular/animations";


const taskDone = [
    style({opacity: 1, height: "48px", offset: 0}),
    style({opacity: 0, height: "48px", transform: 'translate3d(2000px, 0, 0)', offset: 0.8}),
    style({opacity: 0, height: "0px", offset: 1})
];

@Component({
    selector: 'app-task-panel',
    templateUrl: './task-panel.component.html',
    styleUrls: ['./task-panel.component.scss'],
    animations: [
        trigger('cardAnimator', [
            transition(':leave', animate(1000, keyframes(taskDone))),
        ])
    ]
})
export class TaskPanelComponent {

    private static MIN_FILL_SIZE = 10;
    private static MAX_FILL_SIZE = 400;

    @Input()
    task: Task;

    destroyed: boolean;
    fillSize: number;

    // id of intervals, keeping them to cancel the intervals when necessary
    private revertFillInterval: number;
    private fillCompletelyInterval: number;


    destroy() {
        this.fillCompletely(() => {
            this.destroyed = true;
        });
    }

    fill($event) {
        this.cancelRevertFillInterval();

        let positionOfFinger = $event.center.x - $event.target.getBoundingClientRect().left;

        if (positionOfFinger > TaskPanelComponent.MIN_FILL_SIZE) {
            this.fillSize = positionOfFinger;
        } else {
            this.fillSize = TaskPanelComponent.MIN_FILL_SIZE;
        }
    }

    fillCompletely(callback) {
        if (this.fillCompletelyInterval != null) {
            return;
        }

        this.cancelRevertFillInterval();

        this.fillCompletelyInterval = setInterval(() => {
            if (this.fillSize < TaskPanelComponent.MAX_FILL_SIZE) {
                this.fillSize = this.fillSize + 5;
            } else {
                callback();
                clearInterval(this.fillCompletelyInterval);
                this.fillCompletelyInterval = null;
            }
        }, 1);
    }


    revertFill() {
        setTimeout(() => {
            if (this.revertFillInterval != null || this.fillCompletelyInterval != null) {
                return;
            }

            this.revertFillInterval = setInterval(() => {
                if (this.fillSize > TaskPanelComponent.MIN_FILL_SIZE) {
                    this.fillSize = this.fillSize - 1;
                } else {
                    this.fillSize = TaskPanelComponent.MIN_FILL_SIZE;
                    this.cancelRevertFillInterval();
                }

            }, 1);

        }, 100);

    }

    private cancelRevertFillInterval() {
        if (this.revertFillInterval != null) {
            clearInterval(this.revertFillInterval);
            this.revertFillInterval = null;
        }
    }

}
