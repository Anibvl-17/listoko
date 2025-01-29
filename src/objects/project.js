import DataController from "../controllers/data-controller";

export default class Project {
  constructor(title, description, dueDate, tasks) {
    this.id = DataController.generateId();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = tasks;
    this.isComplete = false;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

  // This method is used to update a task after it has been edited
  updateTask(task, newTask) {
    const index = this.tasks.indexOf(task);
    this.tasks[index] = newTask;
  }

  updateTitle(title) {
    this.title = title;
  }

  updateDescription(description) {
    this.description = description;
  }

  updateDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
}