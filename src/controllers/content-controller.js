import { buildListItem } from "../components/content-list-item";
import { Dialog } from "../components/dialog";
import { getDefaultSection } from "../objects/default-sections";
import { ContentData } from "../objects/content-data";
import { DataController } from "./data-controller";
import { selectProject, updateSidebarProjects } from "./sidebar-controller";

let contentData;

export function loadContent(name) {
  let data;

  if (name === 'today' || name === 'quicklist' || name === 'all-tasks') {
    data = getDefaultSection(name);
    document.getElementById('edit-project').style.visibility = 'hidden';
    document.getElementById('delete-project').style.visibility = 'hidden';
  } else {
    data = DataController.getProject(name);
    document.getElementById('edit-project').style.visibility = 'visible';
    document.getElementById('delete-project').style.visibility = 'visible';
  }

  contentData = new ContentData(data.name, data.description, data.dueDate, data.tasks);

  const title = contentData.getTitle();
  const progress = contentData.getProgress();
  const description = contentData.getDescription();
  const completedTasks = contentData.getCompletedTasks().length;
  const pendingTasks = contentData.getPendingTasks().length;
  const tasks = contentData.getTasks();

  const titleElement = document.getElementById('content-title');
  titleElement.textContent = title;

  const progressElement = document.getElementById('content-progress');
  progressElement.textContent = progress + '% complete';

  const descriptionElement = document.getElementById('content-description');
  descriptionElement.textContent = description;

  const pendingTasksElement = document.getElementById('pending-tasks');
  pendingTasksElement.textContent = pendingTasks + ' pending';

  const completedTasksElement = document.getElementById('completed-tasks');
  completedTasksElement.textContent = completedTasks + ' completed';

  const tasksList = document.getElementById('content-list');
  tasksList.textContent = '';

  tasks.forEach(task => {
    const taskItem = buildListItem(task.name, task.dueDate);
    tasksList.appendChild(taskItem);
  });
}

const editProjectBtn = document.getElementById('edit-project');
editProjectBtn.addEventListener('click', () => {
  // Notice that data is passing a ContentData object, not a Project object
  // So, data.title is the project name.
  new Dialog(Dialog.DIALOG_EDIT, Dialog.DIALOG_PROJECT, contentData).show();
});

const removeProjectBtn = document.getElementById('delete-project');
removeProjectBtn.addEventListener('click', () => {

  const remove = confirm(`Are you sure you want to delete the project ${contentData.title}?`);

  if (!remove) {
    return;
  }

  if(DataController.deleteProject(contentData.getTitle())) {
    selectProject('today');
    updateSidebarProjects();
  } else {
    alert('Project not found.');
  }
});
