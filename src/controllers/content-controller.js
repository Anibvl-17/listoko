import { buildListItem } from "../components/content-list-item";
import Project from "../objects/project";

export function loadContent(data) {
  if (data.id === 'today' || data.id === 'quicklist' || data.id === 'all-tasks') {
    data = loadDefaultContent(data);
  }

  const title = data.title;
  const progress = data.getProgress();
  const description = data.description;
  const completedTasks = data.getCompletedTasks().length;
  const pendingTasks = data.getPendingTasks().length;
  const tasks = data.tasks;

  const titleElement = document.getElementById('content-title');
  titleElement.textContent = title;

  const progressElement = document.getElementById('content-progress');
  progressElement.textContent = progress + '%';

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

// Loads the default content for the 'Today', 'Quicklist', and 'All Tasks' sections
// as projects, to access the project methods like getProgress or getCompletedTasks
function loadDefaultContent(data) {
  return new Project(
    data.title,
    data.description,
    data.dueDate,
    data.tasks,
  );
}