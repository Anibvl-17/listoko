export default class DataController {

  // Returns a default object according to the section or
  // returns a project object if the section is 'project'
  static getData(section, id = null) {
    if (section === 'today') {
      return todaySection;
    } else if (section === 'quicklist') {
      return quicklistSection;
    } else if (section === 'all-tasks') {
      return allTasksSection;
    } else if (section === 'project' && id !== null) {
      return DataController.getProject(id);
    }
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
    return DataController.getProjects().find(project => project.id == id);
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
  title: 'Today',
  description: "Today's tasks",
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
  title: 'Quicklist',
  description: 'Quickly add tasks here',
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
  title: "All Tasks",
  description: "All tasks",
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