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

  deleteTask(taskIndex) {
    this.tasks.splice(taskIndex, 1);
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