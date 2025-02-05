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
    'A fresh start awaits tomorrow!',
  new Date().toDateString(),
  [
    new Task('Clean my bedroom', 'This is a default task, you can edit it, but cleaning your bedroom sounds like a good idea... :)', todayDate, false),
    new Task('Do exercise', 'Exercising is good for health and improves your mood, give it a try!', todayDate, false),
    new Task('Read 20 minutes', 'Not scrolling through social media! Read about something you are interested, a book, comic, anything!', todayDate, false)
  ]
);

const quicklistSection = new Project(
  'Quicklist',
  'Jot down quick tasks in a snap! This list is your instant workspace for ideas and ' +
    'reminders. It stays until you reset it, perfect for fast notes and urgent to-dos!',
  new Date().toDateString(),
  [
    new Task('Buy: Umbrella', 'This is a default task. You can delete or edit this!', todayDate, false),
    new Task('Try The Odin Project', 'Give it a try, it\'s an awesome resource to learn about web development if you don\'t know where to start!', todayDate, true),
    new Task('Watch: Interestellar', 'People say it\'s an awesome movie, people also say it isn\'t really awesome. You decide.', todayDate, false)
  ]
);