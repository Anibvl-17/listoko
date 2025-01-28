import Project from "../objects/project";

export default class DataController {

  // Returns a default object according to the section or
  // returns a project object if the section is 'project'
  static getData(id) {
    if (id === 'today') return todaySection;
    else if (id === 'quicklist') return quicklistSection;
    else if (id === 'all-tasks') return allTasksSection;
    else return DataController.getProject(id);
  }

  // --- Tasks related methods ---

  static saveTask(projectId, task) {
    const project = DataController.getProject(projectId);
    project.tasks.push(task);
    DataController.saveProject(project);
  }

  // --- Project related methods ---

  static saveProject(project) {
    // Get array of projects from local storage and push the new project
    const projects = DataController.getProjects();
    projects.push(project);

    // Clean the old projects array from local storage and save the new one
    localStorage.removeItem('projects');
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static getProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
  }

  static getProject(id) {
    const projectData = DataController.getProjects().find(project => project.id == id);
    return new Project(projectData.title, projectData.description, projectData.dueDate, projectData.tasks);
  }

  // Generates a unique ID for a new project, based on the last project id
  static generateId() {
    const projects = DataController.getProjects();
    const lastId = projects.length > 0 ? projects[projects.length - 1].id : -1;
    return lastId + 1;
  }
}

// Default Today section
const todaySection = {
  id: 'today',
  title: 'Today',
  description: 'Stay focused on what matters now! Track your tasks for the day and complete them before midnight. ' +
               'A fresh start awaits tomorrow—make every task count!',
  dueDate: new Date(),
  tasks: [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      completed: false
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      completed: false
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      completed: false
    }
  ]
}

// Default Quicklist section
const quicklistSection = {
  id: 'quicklist',
  title: 'Quicklist',
  description: 'Jot down quick tasks in a snap! This list is your instant workspace for ideas and ' +
               'reminders. It stays until you reset it—perfect for fast notes and urgent to-dos!',
  dueDate: new Date(),
  tasks: [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      completed: false
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      completed: false
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      completed: false
    }
  ]
}

// Default All Tasks section
const allTasksSection = {
  id: 'all-tasks',
  title: 'All Tasks',
  description: 'Your complete task hub! Find every to-do you\'ve created, from standalone notes to project ' + 
               'tasks. Stay organized, track progress, and never lose sight of what\'s next!',
  dueDate: new Date(),
  tasks: [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      completed: false
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      completed: false
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      completed: false
    }
  ]
}