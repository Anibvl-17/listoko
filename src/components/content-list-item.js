import expandIcon from '../assets/expand.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

// Missing: Event listeners for the buttons
//          Checkbox functionality

export function buildListItem(name, date) {
  const listItem = document.createElement('li');
  listItem.classList.add('content-list-item');

  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.classList.add('task-checkbox');
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
  dueDate.textContent = 'Due on ' + date;
  listItem.appendChild(dueDate);

  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  const expandTaskBtn = document.createElement('button');
  expandTaskBtn.classList.add('icon-btn', 'expand-task');

  const expandTaskIcon = document.createElement('img');
  expandTaskIcon.src = expandIcon;
  expandTaskIcon.alt = 'Expand task';

  expandTaskBtn.appendChild(expandTaskIcon);

  const editTaskBtn = document.createElement('button');
  editTaskBtn.classList.add('icon-btn', 'edit-task');

  const editTaskIcon = document.createElement('img');
  editTaskIcon.src = editIcon;
  editTaskIcon.alt = 'Edit task';

  editTaskBtn.appendChild(editTaskIcon);

  const deleteTaskBtn = document.createElement('button');
  deleteTaskBtn.classList.add('icon-btn', 'delete-task');

  const deleteTaskIcon = document.createElement('img');
  deleteTaskIcon.src = deleteIcon;
  deleteTaskIcon.alt = 'Delete task';

  deleteTaskBtn.appendChild(deleteTaskIcon);

  taskActions.append(expandTaskBtn, editTaskBtn, deleteTaskBtn);

  listItem.appendChild(taskActions);

  return listItem;
}