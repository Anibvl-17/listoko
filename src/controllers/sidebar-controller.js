import { loadContent } from "./content-controller";
import DataController from "./data-controller";

export function loadSidebarProjects() {
  // Get the projects list element and clear its content
  const projectsList = document.querySelector('.projects-list');
  projectsList.textContent = '';

  console.log('Loading projects...');
  DataController.getProjects().forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.classList.add('sidebar-li');
    projectItem.dataset.id = project.id;
    projectItem.textContent = project.title;

    projectItem.addEventListener('click', listItemClickHandler);

    projectsList.appendChild(projectItem);
  });
}

export function loadSidebar() {
  const sidebarListItems = document.querySelectorAll('.sidebar-li');

  // Handle the click event on the sidebar list items
  // Updates the active list item style
  // Updates the main content based on the selected list item
  sidebarListItems.forEach((listItem) => {
    listItem.addEventListener('click', listItemClickHandler);
  });

  loadSidebarProjects();

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

export function loadLastProject() {
  const lastProjectItem = document.querySelector('.projects-list').lastChild;
  lastProjectItem.click();
}

function listItemClickHandler() {
  document.querySelector('.sidebar-li-active')?.classList.remove('sidebar-li-active');

  this.classList.add('sidebar-li-active');

  const sectionId = this.dataset.id;
  const sectionData = DataController.getData(sectionId);
  loadContent(sectionData);
}
