import {RecurringTask} from "@app/housagotchi/recurring-task.model";

export class Report {

    constructor(public lateTasks: RecurringTask[],
                public veryLateTasks: RecurringTask[],
                public mood: string) {
    }
}
