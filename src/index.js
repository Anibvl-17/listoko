import './styles.css';

/*** Sidebar ***/

const sidebarListItems = document.querySelectorAll('.sidebar-list-item');
sidebarListItems.forEach((listItem) => {
  listItem.addEventListener('click', () => {
    sidebarListItems.forEach((item) => {
      item.classList.remove('sidebar-list-item-active');
    });
    listItem.classList.add('sidebar-list-item-active');
  });
});

const projectsListItem = document.getElementById('projects-list-item');
const projectsListItemIcon = projectsListItem.querySelectorAll('svg')[1]; // The chevron icon
projectsListItemIcon.style.transition = 'transform 0.3s';

// Used to keep track of the visibility of the projects
let projectsAreVisible = false;

// Handles the click event on the 'Projects" list item
projectsListItem.addEventListener('click', () => {
  projectsAreVisible = !projectsAreVisible;

  // Rotates the icon
  projectsListItemIcon.style.transform = 
    projectsAreVisible ? 'rotate(180deg)' : 'rotate(0deg)';

  // Toggles the visibility of the projects
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.style.transition = 'opacity 200ms';
  projectsContainer.style.opacity = projectsAreVisible ? '0' : '1';
});