import {Task} from "@app/todo/task.model";
import {Importance} from "@app/todo/importance.model";
import * as moment from "moment";

/**
 * Function that can be used to sort tasks based on their urgency and importance.
 * Morge Urgent/important tasks are put in the front of the list
 * @param task1 first task to compare
 * @param task2 second task to compare
 * @return number. If number < 0, task1 is more urgent/important than task2 and should be put before task 2 in the list.
 *                  0 means they are equally important.
 *                  Number > 1 means that task1 is less urgent/important than task2 and should be put after task 2 in the list.
 */
export const taskComparator = (task1: Task, task2: Task) => {
    let calculatePointsForTask = (task: Task): number => {
        let points = 0;

        // add more points to more urgent tasks
        let today = moment();

        let dueDateOfTask;
        if (task.dueDateTime) {
            dueDateOfTask = moment(task.dueDateTime);
        } else {
            dueDateOfTask = moment(task.creationDateTime).add(1, "year");
        }

        let numberOfDaysBetweenTasks = dueDateOfTask.diff(today.startOf("day"), "day");
        if (numberOfDaysBetweenTasks < 0) {
            points += 100;
        } else {
            let extraPoints = 40 + (task.expectedDurationInHours ? task.expectedDurationInHours/4 : 0) - numberOfDaysBetweenTasks;
            if (extraPoints <= 0) {
                extraPoints = 15;
            }
            points += extraPoints;
        }

        // add more points to more important tasks
        switch (task.importance) {
            case Importance.NOT_SO_IMPORTANT: points += 10; break;
            case null: points += 20; break;
            case Importance.IMPORTANT: points += 30; break;
            case Importance.VERY_IMPORTANT: points += 40; break;
        }

        return points;
    };

    // and the points from the task comparator go to...
    let pointsForTask1 = calculatePointsForTask(task1);
    let pointsForTask2 = calculatePointsForTask(task2);

    // if the two tasks have the same amount of points, the earliest created task comes first
    if (pointsForTask1 == pointsForTask2) {
        if (moment(task1.creationDateTime).isBefore(moment(task2.creationDateTime))) {
            pointsForTask1++;
        } else if (moment(task2.creationDateTime).isBefore(moment(task1.creationDateTime))) {
            pointsForTask2++;
        }
    }

    return pointsForTask2 - pointsForTask1;
};
