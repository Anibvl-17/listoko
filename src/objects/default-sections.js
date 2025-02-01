import Project from "./project";
import { Task } from "./task";

export function getDefaultSection(sectionName) {
  if (sectionName === 'Today') return todaySection;
  else if (sectionName === 'Quicklist') return quicklistSection;
  else if (sectionName === 'All tasks') return allTasksSection;
  else return todaySection;
}

// Default Today section
const todaySection = new Project(
  'Today',
  'Stay focused on what matters now! Track your tasks for the day and complete them before midnight. ' +
    'A fresh start awaits tomorrow—make every task count!',
  new Date().toDateString(),
  [
    new Task('Task 1', 'Description 1', new Date().toDateString(), true),
    new Task('Task 2', 'Description 2', new Date().toDateString(), false),
    new Task('Task 3', 'Description 3', new Date().toDateString(), true)
  ]
);

const quicklistSection = new Project(
  'Quicklist',
  'Jot down quick tasks in a snap! This list is your instant workspace for ideas and ' +
    'reminders. It stays until you reset it—perfect for fast notes and urgent to-dos!',
  new Date().toDateString(),
  [
    new Task('Task 1', 'Description 1', new Date().toDateString(), false),
    new Task('Task 2', 'Description 2', new Date().toDateString(), true),
    new Task('Task 3', 'Description 3', new Date().toDateString(), false)
  ]
);

const allTasksSection = new Project(
  'All tasks',
  'Your complete task hub! Find every to-do you\'ve created, from standalone notes to project ' +
    'tasks. Stay organized, track progress, and never lose sight of what\'s next!',
  new Date().toDateString(),
  [
    new Task('Task 1', 'Description 1', new Date().toDateString(), true),
    new Task('Task 2', 'Description 2', new Date().toDateString(), true),
    new Task('Task 3', 'Description 3', new Date().toDateString(), true)
  ]
);