import {Task} from "@app/todo/task.model";
import {Importance} from "@app/todo/importance.model";
import * as moment from "moment";
import {taskComparator} from "@app/todo/task.comparator";

describe('taskComparator', () => {

    it('should put an urgent task before a non-urgent task', () => {
        let task1 = new Task();
        task1.importance = Importance.NOT_SO_IMPORTANT;
        task1.dueDateTime = moment().add(1, "day").toDate();

        let task2 = new Task();
        task2.importance = Importance.NOT_SO_IMPORTANT;
        task2.dueDateTime = moment().add(5, "day").toDate();

        let task3 = new Task();
        task3.importance = Importance.NOT_SO_IMPORTANT;
        task3.dueDateTime = moment().toDate();

        let sortedTasks = [task1, task2, task3].sort(taskComparator);

        expect(sortedTasks).toEqual([task3, task1, task2]);
    });

    it('should put an important task before a non-important task', () => {
        let task1 = new Task();
        task1.importance = Importance.NOT_SO_IMPORTANT;
        task1.dueDateTime = moment().add(1, "day").toDate();

        let task2 = new Task();
        task2.importance = Importance.I_DO_NOT_REALLY_CARE;
        task2.dueDateTime = moment().add(1, "day").toDate();

        let task3 = new Task();
        task3.importance = Importance.IMPORTANT;
        task3.dueDateTime = moment().add(1, "day").toDate();

        let task4 = new Task();
        task4.importance = Importance.VERY_IMPORTANT;
        task4.dueDateTime = moment().add(1, "day").toDate();

        let sortedTasks = [task1, task2, task3, task4].sort(taskComparator);
        expect(sortedTasks).toEqual([task4, task3, task1, task2]);
    });

    it('should put a task without importance before a non-important task, but after an important task', () => {
        let task1 = new Task();
        task1.importance = Importance.NOT_SO_IMPORTANT;
        task1.dueDateTime = moment().add(1, "day").toDate();

        let task2 = new Task();
        task2.importance = null;
        task2.dueDateTime = moment().add(1, "day").toDate();

        let task3 = new Task();
        task3.importance = Importance.VERY_IMPORTANT;
        task3.dueDateTime = moment().add(1, "day").toDate();

        let sortedTasks = [task1, task2, task3].sort(taskComparator);
        expect(sortedTasks).toEqual([task3, task2, task1]);
    });

    it('should put an urgent and important task before an urgent but less important task', () => {
        let task1 = new Task();
        task1.importance = Importance.NOT_SO_IMPORTANT;
        task1.dueDateTime = moment().add(1, "day").toDate();

        let task2 = new Task();
        task2.importance = Importance.VERY_IMPORTANT;
        task2.dueDateTime = moment().add(1, "day").toDate();

        let sortedTasks = [task1, task2].sort(taskComparator);

        expect(sortedTasks).toEqual([task2, task1]);
    });

    it('should put an non-urgent but important task before a urgent but non-important task', () => {
        let task1 = new Task();
        task1.importance = Importance.VERY_IMPORTANT;
        task1.dueDateTime = moment().add(10, "day").toDate();

        let task2 = new Task();
        task2.importance = Importance.I_DO_NOT_REALLY_CARE;
        task2.dueDateTime = moment().add(1, "day").toDate();

        let sortedTasks = [task1, task2].sort(taskComparator);

        expect(sortedTasks).toEqual([task1, task2]);
    });

    it('should put an overdue but non-important task before an important task that is not urgent at all', () => {
        let task1 = new Task();
        task1.importance = Importance.NOT_SO_IMPORTANT;
        task1.dueDateTime = moment().subtract(5, "day").toDate();

        let task2 = new Task();
        task2.importance = Importance.VERY_IMPORTANT;
        task2.dueDateTime = moment().add(2, "day").toDate();

        let sortedTasks = [task1, task2].sort(taskComparator);

        expect(sortedTasks).toEqual([task1, task2]);
    });

    it('should take into account the expected duration', () => {
        let task1 = new Task();
        task1.importance = Importance.IMPORTANT;
        task1.dueDateTime = moment().add(5, "day").toDate();
        task1.expectedDurationInHours = 16;

        let task2 = new Task();
        task2.importance = Importance.IMPORTANT;
        task2.dueDateTime = moment().add(4, "day").toDate();
        task2.expectedDurationInHours = 4;

        let sortedTasks = [task1, task2].sort(taskComparator);

        expect(sortedTasks).toEqual([task1, task2]);
    });

    it('should take into account the expected duration, even when one of the tasks has no expected duration', () => {
        let task1 = new Task();
        task1.importance = Importance.IMPORTANT;
        task1.dueDateTime = moment().add(5, "day").toDate();
        task1.expectedDurationInHours = 16;

        let task2 = new Task();
        task2.importance = Importance.IMPORTANT;
        task2.dueDateTime = moment().add(4, "day").toDate();

        let sortedTasks = [task1, task2].sort(taskComparator);

        expect(sortedTasks).toEqual([task1, task2]);
    });

    it('should take iput a task with a due date in the future still before a task without a due date', () => {
        let task1 = new Task();
        task1.importance = Importance.IMPORTANT;
        task1.dueDateTime = moment().add(150, "day").toDate();

        let task2 = new Task();
        task2.importance = Importance.IMPORTANT;

        let sortedTasks = [task1, task2].sort(taskComparator);

        expect(sortedTasks).toEqual([task1, task2]);
    });
});
