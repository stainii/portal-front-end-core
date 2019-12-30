import {Importance} from "@app/todo/importance.model";

export class TaskDefinition {
    public name: string;
    public deviationOfTheMainTaskStartDateTimeInDays: number;
    public deviationOfTheMainTaskDueDateTimeInDays: number;
    public expectedDurationInHours: number;
    public context: string;
    public importance: Importance;
    public description: string;

}
