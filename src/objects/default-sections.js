export function getDefaultSection(sectionName) {
  if (sectionName === 'today') return todaySection;
  else if (sectionName === 'quicklist') return quicklistSection;
  else if (sectionName === 'all-tasks') return allTasksSection;
  else return todaySection;
}

// Default Today section
const todaySection = {
  id: 'today',
  name: 'Today',
  description: 'Stay focused on what matters now! Track your tasks for the day and complete them before midnight. ' +
               'A fresh start awaits tomorrow—make every task count!',
  dueDate: new Date().toDateString(),
  tasks: [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      dueDate: new Date().toDateString(),
      isComplete: true
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      dueDate: new Date().toDateString(),
      isComplete: false
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      dueDate: new Date().toDateString(),
      isComplete: true
    }
  ]
}

// Default Quicklist section
const quicklistSection = {
  id: 'quicklist',
  name: 'Quicklist',
  description: 'Jot down quick tasks in a snap! This list is your instant workspace for ideas and ' +
               'reminders. It stays until you reset it—perfect for fast notes and urgent to-dos!',
  dueDate: new Date().toDateString(),
  tasks: [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      dueDate: new Date().toDateString(),
      isComplete: false
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      dueDate: new Date().toDateString(),
      isComplete: true
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      dueDate: new Date().toDateString(),
      isComplete: false
    }
  ]
}

// Default All Tasks section
const allTasksSection = {
  id: 'all-tasks',
  name: 'All Tasks',
  description: 'Your complete task hub! Find every to-do you\'ve created, from standalone notes to project ' + 
               'tasks. Stay organized, track progress, and never lose sight of what\'s next!',
  dueDate: new Date().toDateString(),
  tasks: [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      dueDate: new Date().toDateString(),
      isComplete: true
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      dueDate: new Date().toDateString(),
      isComplete: true
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      dueDate: new Date().toDateString(),
      isComplete: true
    }
  ]
}