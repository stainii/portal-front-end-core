import {TaskPatch} from "@app/todo/task-patch.model";
import {TaskStatus} from "@app/todo/task-status.model";
import {Importance} from "@app/todo/importance.model";
import * as moment from "moment";

export class Task {
    public id: string;
    public name: string;
    public creationDateTime: Date;
    public startDateTime: Date;
    public dueDateTime: Date;
    public expectedDurationInHours: number;
    public context: string;
    public importance: Importance;
    public description: string;
    public subTasks: Task[];
    public status: TaskStatus;
    public history: TaskPatch[];

    public hasType(type: string) {
        switch (type) {
            case 'focus':
                return this.hasTypeFocus();
            case 'goals':
                return this.hasTypeGoals();
            case 'fit-in':
                return this.hasTypeFitIn();
            case 'back-burner':
                return this.hasTypeBackBurner();
            default:
                throw new Error("Could not determine if task has type " + type);
        }

    }

    public hasTypeFocus() {
        return this.importance == Importance.VERY_IMPORTANT
                && (this.dueDateTime == null || this.dueDateIsGettingNear());
    }

    public hasTypeGoals() {
        return this.importance == Importance.VERY_IMPORTANT && !this.hasTypeFocus();
    }

    public hasTypeFitIn() {
        return this.importance == Importance.NOT_SO_IMPORTANT
                && (this.dueDateTime == null || this.dueDateIsGettingNear());
    }

    public hasTypeBackBurner() {
        return this.importance == Importance.I_DO_NOT_REALLY_CARE
            || (this.importance == Importance.NOT_SO_IMPORTANT && !this.hasTypeFitIn());
    }

    private dueDateIsGettingNear = () => moment(this.dueDateTime).diff(moment(), "days") < 7;

    getRemainingTime() {
        let remainingDays = moment(this.dueDateTime).diff(moment().startOf("day"), "days");
        if (remainingDays > 0) {
            return `${remainingDays} d`;
        } else {
            return "Due!";
        }
    }
}
