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

        if (task.dueDateTime) {
            let today = moment();
            let dueDateOfTask = moment(task.dueDateTime);
            let numberOfDaysBetweenTasks = dueDateOfTask.diff(today, "day");
            let pointsForUrgency = 10 - numberOfDaysBetweenTasks;

            if (pointsForUrgency > 0) {
                points += pointsForUrgency;
            }
        } else {
            // if a task has no due date time, we cannot know how urgent it is. Let's take an average
            points += 5;
        }

        switch (task.importance) {
            case Importance.NOT_SO_IMPORTANT: points += 5; break;
            case Importance.VERY_IMPORTANT: points += 10; break;
        }

        return points;
    };

    let pointsForTask1 = calculatePointsForTask(task1);
    let pointsForTask2 = calculatePointsForTask(task2);
    return pointsForTask2 - pointsForTask1;
};
