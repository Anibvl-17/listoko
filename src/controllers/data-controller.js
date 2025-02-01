import { getDefaultSection } from "../objects/default-sections";
import Project from "../objects/project";

export class DataController {
  static projects = [];

  static loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects'));

    if (projects) {
      DataController.projects = projects;
    } else {
      return false;
    }
  }

  static saveProject(project) {
    DataController.loadProjects();

    if (DataController.checkIfProjectExists(project.name)) {
      return false;
    }

    DataController.projects.push(project);

    DataController.updateStorage();
    return true;
  }

  static checkIfProjectExists(name) {  
    return DataController.projects.some(p => p.name === name);
  }

  static getAllProjects() {
    DataController.loadProjects();
    return DataController.projects;
  }

  static getProject(name) {
    DataController.loadProjects();
    const data = DataController.projects.find(p => p.name === name);
    const project = new Project(data.name, data.description, data.dueDate, data.tasks);
    return project;
  }

  static updateProjectInfo(originalProjectName, newProject) {
    DataController.loadProjects();

    const index = DataController.projects.findIndex(p => p.name === originalProjectName);

    if (index === -1) {
      console.log(`Project '${originalProjectName}' not found.`);
      return false;
    }

    // If the project name IS different and the new name already exists, return false
    if (
      originalProjectName !== newProject.name &&
      DataController.checkIfProjectExists(newProject.name)
    ) {
      console.log(`Project '${newProject.name}' already exists.`);
      return false;
    }

    DataController.projects[index] = newProject;
    DataController.updateStorage();

    return true;
  }

  static deleteProject(name) {
    DataController.loadProjects();

    const index = DataController.projects.findIndex(p => p.name === name);
    if (index === -1) {
      console.log(`Project '${name}' not found.`);
      return false;
    }

    DataController.projects.splice(index, 1);
    this.updateStorage();
    return true;
  }

  static updateStorage() {
    localStorage.removeItem('projects');
    localStorage.setItem('projects', JSON.stringify(DataController.projects));
  }

  static checkStorage() {
    if (localStorage.getItem('projects')) {
      console.log('Projects found in localStorage.');
    } else {
      this.loadDefaultStorage();
    }
  }

  static loadDefaultStorage() {
    console.log('Loading default projects...');
    this.saveProject(getDefaultSection('Today'));
    this.saveProject(getDefaultSection('Quicklist'));
    this.saveProject(getDefaultSection('All tasks'));
  }
}