import { Task } from "./task";

export class ContentData {

  constructor(name, description, dueDate, tasks) {
    this.title = name;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = [];
    tasks.forEach((task, index) => {
      this.tasks[index] = new Task(task.name, task.description, task.dueDate, task.isComplete);
    });
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getDueDate() {
    return this.dueDate;
  }

  getTasks() {
    return this.tasks;
  }

  getCompletedTasks() {
    return this.getTasks().filter(task => task.isComplete);
  }

  getPendingTasks() {
    return this.getTasks().filter(task => !task.isComplete);
  }

  getProgress() {
    const totalTasks = this.getTasks().length;
    const completedTasks = this.getCompletedTasks().length;

    if (totalTasks === 0) {
      return 0;
    }

    return Math.round((completedTasks / totalTasks) * 100);
  }
}