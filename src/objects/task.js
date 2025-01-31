export class Task {
  constructor(name, description, dueDate, isComplete) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.isComplete = isComplete;
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