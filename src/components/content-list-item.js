import expandIcon from '../assets/expand.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import { Dialog } from './dialog';
import { DataController } from '../controllers/data-controller';
import { selectProject, updateBadge } from '../controllers/sidebar-controller';
import { Task } from '../objects/task';
import { format, isBefore, isSameDay, isToday } from 'date-fns';

export function buildListItem(projectName, task, index) {
  const taskObject = new Task(task.name, task.description, task.dueDate, task.isComplete);
  const name = taskObject.name;
  let date = taskObject.dueDate;

  const listItem = document.createElement('li');
  listItem.classList.add('content-li');

  listItem.addEventListener('click', () => { toggleDescription(listItem, task) });

  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.classList.add('task-checkbox');
  taskCheckbox.checked = taskObject.isComplete;
  taskCheckbox.addEventListener('change', () => {
    taskObject.toggleComplete();
    const project = DataController.getProject(projectName);
    project.updateTask(index, taskObject);
    DataController.updateProjectInfo(projectName, project);
    selectProject(projectName);
    updateBadge(projectName);
  });

  listItem.appendChild(taskCheckbox);

  const taskName = document.createElement('p');
  taskName.classList.add('task-name');
  taskName.textContent = name;
  listItem.appendChild(taskName);

  const bullet = document.createElement('b');
  bullet.innerHTML = '&middot;';
  listItem.appendChild(bullet);

  const dueDate = document.createElement('p');
  dueDate.classList.add('due-date');

  // Fix date format because with hyphens "-" it subtracts 1 day.
  date = new Date(date.replace(/-/g, '/'));

  const taskDate = format(date, 'yyyy-MM-dd');
  const todayDate = format(new Date(), 'yyyy-MM-dd');

  if (isToday(date)) {
    dueDate.textContent = 'Due today';
    dueDate.classList.add('text-warning');
  } else if (isBefore(taskDate, todayDate)) {
    dueDate.textContent = 'Overdue since ' + taskDate;
    dueDate.classList.add('text-danger');
  } else {
    dueDate.textContent = 'Due on ' + taskDate;
    dueDate.classList.add('text-good');
  }

  listItem.appendChild(dueDate);

  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  const expandTaskBtn = document.createElement('button');
  expandTaskBtn.classList.add('icon-btn', 'expand-task');

  expandTaskBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDescription(listItem, task) 
  });

  const expandTaskIcon = document.createElement('img');
  expandTaskIcon.src = expandIcon;
  expandTaskIcon.alt = 'Expand task';
  expandTaskIcon.style.transition = 'transform 0.2s';

  expandTaskBtn.appendChild(expandTaskIcon);

  const editTaskBtn = document.createElement('button');
  editTaskBtn.classList.add('icon-btn', 'edit-task');
  editTaskBtn.addEventListener('click', editTask);
  editTaskBtn.index = index;
  editTaskBtn.projectName = projectName;
  editTaskBtn.name = name;
  editTaskBtn.description = task.description;
  editTaskBtn.dueDate = date;

  const editTaskIcon = document.createElement('img');
  editTaskIcon.src = editIcon;
  editTaskIcon.alt = 'Edit task';

  editTaskBtn.appendChild(editTaskIcon);

  const deleteTaskBtn = document.createElement('button');
  deleteTaskBtn.classList.add('icon-btn', 'delete-task');
  deleteTaskBtn.addEventListener('click', deleteTask);
  deleteTaskBtn.index = index;
  deleteTaskBtn.projectName = projectName;

  const deleteTaskIcon = document.createElement('img');
  deleteTaskIcon.src = deleteIcon;
  deleteTaskIcon.alt = 'Delete task';

  deleteTaskBtn.appendChild(deleteTaskIcon);

  taskActions.append(expandTaskBtn, editTaskBtn, deleteTaskBtn);

  listItem.appendChild(taskActions);

  return listItem;
}

export function buildEmptyListItem() {
  const emptyListItem = document.createElement('li');
  emptyListItem.classList.add('content-li');
  emptyListItem.id = 'empty-list-item';
  
  const emptyListText = document.createElement('p');
  emptyListText.textContent = 'No tasks to display. Click the "+ New task" button to add a new task!';

  emptyListItem.appendChild(emptyListText);
  return emptyListItem;
}

function editTask() {
  const data = {
    index: this.index,
    projectName: this.projectName,
    title: this.name,
    description: this.description,
    dueDate: this.dueDate,
  };
  new Dialog(Dialog.DIALOG_EDIT, Dialog.DIALOG_TASK, data).show();
}

function deleteTask() {
  const remove = confirm('Are you sure you want to delete this task?');

  if (remove) {
    const project = DataController.getProject(this.projectName);
    project.deleteTask(this.index);

    DataController.updateProjectInfo(this.projectName, project);
    selectProject(this.projectName);
    updateBadge(this.projectName);
  } else {
    return;
  }
}

function toggleDescription(item, task) {
  const description = document.createElement('p');
  description.classList.add('task-description');
  description.textContent = task.description;

  if (item.classList.contains('expanded')) {
    item.classList.remove('expanded');
    item.removeChild(item.lastChild);
    rotateExpandIcon(item, 0);
  } else {
    item.classList.add('expanded');
    item.appendChild(description);
    rotateExpandIcon(item, 180);
  }
}

function rotateExpandIcon(item, degrees) {
  const icon = item.querySelector('.expand-task img');
  icon.style.transform = `rotate(${degrees}deg)`;
}