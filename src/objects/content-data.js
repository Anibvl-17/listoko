export class ContentData {

  constructor(title, description, dueDate, tasks) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = tasks;
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
    return Math.round((completedTasks / totalTasks) * 100);
  }
}