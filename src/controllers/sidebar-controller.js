import { Dialog } from "../components/dialog";
import { loadContent } from "./content-controller";
import { DataController } from "./data-controller";
// import DataController from "./data-controller";

export function updateSidebarProjects(selectLastProject = false) {
  const projectsList = document.getElementById('projects-list');
  projectsList.textContent = '';

  const projects = DataController.getAllProjects();
  projects.forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.classList.add('sidebar-li');
    projectItem.dataset.name = project.name;
    projectItem.textContent = project.name;

    projectItem.addEventListener('click', listItemClickHandler);

    projectsList.appendChild(projectItem);
  });

  if (selectLastProject) {
    const lastProjectItem = document.getElementById('projects-list').lastChild;
    lastProjectItem.click();
  }
}

// Initial sidebar load
export function loadSidebar() {
  const sidebarListItems = document.querySelectorAll('.sidebar-li');
  sidebarListItems.forEach((listItem) => {
    listItem.addEventListener('click', listItemClickHandler);
  });

  // Simulate a click on the "Today" list item
  sidebarListItems[0].click();

  updateSidebarProjects();

  const projectsListItem = document.getElementById('projects-li');
  const projectsListItemIcon = projectsListItem.querySelectorAll('svg')[1]; // The chevron icon
  projectsListItemIcon.style.transition = 'transform 0.3s';

  let areProjectsVisible = false;

  // Handles the click event on the 'Projects" list item
  projectsListItem.addEventListener('click', () => {
    areProjectsVisible = !areProjectsVisible;

    // Rotates the icon
    projectsListItemIcon.style.transform = 
      areProjectsVisible ? 'rotate(180deg)' : 'rotate(0deg)';

    // Toggles the visibility of the projects
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.style.transition = 'opacity 200ms';
    projectsContainer.style.opacity = areProjectsVisible ? '0' : '1';
    areProjectsVisible ? setTimeout(() => projectsContainer.style.visibility = 'hidden', 200) : projectsContainer.style.visibility = 'visible';

    const newProjectItem = document.getElementById('new-project');
    newProjectItem.style.transition = 'opacity 200ms';
    newProjectItem.style.opacity = areProjectsVisible ? '0' : '1';
    areProjectsVisible ? setTimeout(() => newProjectItem.style.visibility = 'hidden', 200) : newProjectItem.style.visibility = 'visible';
  });
}

// Handle the click event on the sidebar list items
// Updates the active list item style
// Updates the main content based on the selected list item
function listItemClickHandler() {
  document.querySelector('.sidebar-li-active')?.classList.remove('sidebar-li-active');

  this.classList.add('sidebar-li-active');

  const sectionName = this.dataset.name;
  loadContent(sectionName);
}

// Handles the click event on the 'New Project' list item
const newProjectItem = document.getElementById('new-project');
newProjectItem.addEventListener('click', () => {
  const dialog = new Dialog(Dialog.DIALOG_NEW, Dialog.DIALOG_PROJECT, null);
  dialog.show();
});