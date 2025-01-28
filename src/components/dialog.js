import Project from "../objects/project";
import DataController from "../controllers/data-controller";

import { loadSidebarProjects, loadLastProject } from "../controllers/sidebar-controller";

const newProjectItem = document.getElementById('new-project');
const newProjectDialog = document.getElementById('new-project-dialog');
const newProjectButton = document.getElementById('add-project');
const newProjectForm = document.forms.newProject;

// Handles the click event on the 'New Project' list item
newProjectItem.addEventListener('click', () => {
  newProjectDialog.showModal();
});

// Handles the click event on the 'Add Project' button
newProjectButton.addEventListener('click', (e) => {
  // Prevent the form from submitting
  e.preventDefault();
  
  // Get the form data
  const newProjectData = new FormData(newProjectForm);
  
  // Create a new project object
  const project = new Project(
    newProjectData.get('project-name'),
    newProjectData.get('project-description'),
    newProjectData.get('project-due-date'),
    [] // Tasks array
  );
  
  // Save the new project and reload the sidebar projects list
  DataController.saveProject(project);
  loadSidebarProjects();

  // Load the last project, which is the new project
  loadLastProject();

  newProjectDialog.close();
});