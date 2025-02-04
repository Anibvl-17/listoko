import Project from "./project";
import { Task } from "./task";

export function getDefaultSection(sectionName) {
  if (sectionName === 'Today') return todaySection;
  else if (sectionName === 'Quicklist') return quicklistSection;
  else return todaySection;
}

const todayDate = new Date().toISOString().substring(0, 10);

// Default Today section
const todaySection = new Project(
  'Today',
  'Stay focused on what matters now! Track your tasks for the day and complete them before midnight. ' +
    'A fresh start awaits tomorrow—make every task count!',
  new Date().toDateString(),
  [
    new Task('Task 1', 'Description 1', todayDate, true),
    new Task('Task 2', 'Description 2', todayDate, false),
    new Task('Task 3', 'Description 3', todayDate, true)
  ]
);



const quicklistSection = new Project(
  'Quicklist',
  'Jot down quick tasks in a snap! This list is your instant workspace for ideas and ' +
    'reminders. It stays until you reset it—perfect for fast notes and urgent to-dos!',
  new Date().toDateString(),
  [
    new Task('Task 1', 'Description 1', todayDate, false),
    new Task('Task 2', 'Description 2', todayDate, true),
    new Task('Task 3', 'Description 3', todayDate, false)
  ]
);