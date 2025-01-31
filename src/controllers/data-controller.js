export class DataController {
  static projects = [];

  static loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects'));

    if (projects) {
      DataController.projects = projects;
      console.log(`${projects.length} project(s) loaded.`);
    } else {
      console.log('No projects found.');
    }
  }

  static saveProject(project) {
    DataController.loadProjects();

    if (DataController.checkIfProjectExists(project.name)) {
      return false;
    }

    DataController.projects.push(project);

    localStorage.removeItem('projects');
    localStorage.setItem('projects', JSON.stringify(DataController.projects));
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
    return DataController.projects.find(p => p.name === name);
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
    localStorage.removeItem('projects');
    localStorage.setItem('projects', JSON.stringify(DataController.projects));

    return true;
  }
}