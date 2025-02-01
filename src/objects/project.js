import DataController from "../controllers/data-controller";

export default class Project {
  constructor(name, description, dueDate, tasks) {
    this.name = name;
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
  updateTask(taskIndex, newTask) {
    this.tasks[taskIndex] = newTask;
  }

  updateName(name) {
    this.name = name;
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