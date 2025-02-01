import { DataController } from "../controllers/data-controller";
import { selectProject, updateBadge, updateSidebarProjects } from "../controllers/sidebar-controller";
import Project from "../objects/project";
import { Task } from "../objects/task";

export class Dialog {
  static DIALOG_EDIT = 'dialog_edit';
  static DIALOG_NEW = 'dialog_new';
  static DIALOG_TASK = 'dialog_task';
  static DIALOG_PROJECT = 'dialog_project';

  static dialog = document.getElementById('dialog');
  static dialogTitle = document.getElementById('dialog-title');
  static dialogConfirm = document.getElementById('dialog-confirm');
  static dialogCancel = document.querySelector('.dialog-cancel');
  static dialogForm = document.forms.dialogForm;

  static inputName = document.getElementById('form-name');
  static inputDescription = document.getElementById('form-description');
  static inputDueDate = document.getElementById('form-due-date');

  mode;
  object;
  data;

  // The dialog constructor receives the mode (new or edit), the object (project or task), and
  // data only if the mode is edit. The data is the object to be edited.
  constructor(mode, object, data = null) {
    this.mode = mode;
    this.object = object;
    this.data = data;

    Dialog.dialog.addEventListener('close', () => Dialog.dialogForm.reset() );
    Dialog.dialogCancel.addEventListener('click', () => Dialog.dialog.close() );

    if (mode === Dialog.DIALOG_EDIT) {
      Dialog.dialogConfirm.removeEventListener('click', this.confirmNew);
      Dialog.dialogConfirm.addEventListener('click', this.confirmEdit);

      Dialog.dialogConfirm.object = object; // Passing the object type to the element
      Dialog.dialogConfirm.data = data; // Passing the original data to the element

      Dialog.dialogConfirm.textContent = object === Dialog.DIALOG_PROJECT ? 'Save Project' : 'Save Task';
      Dialog.dialogTitle.textContent = object === Dialog.DIALOG_PROJECT ? 'Edit Project' : 'Edit Task';

      Dialog.inputName.value = data.title;
      Dialog.inputDescription.value = data.description;
      Dialog.inputDueDate.value = data.dueDate.toString();
    } else {
      Dialog.dialogConfirm.removeEventListener('click', this.confirmEdit);
      Dialog.dialogConfirm.addEventListener('click', this.confirmNew);

      Dialog.dialogConfirm.object = object; // Passing the object type to the element
      Dialog.dialogConfirm.data = data; // Passing the original data to the element
      
      Dialog.dialogConfirm.textContent = object === Dialog.DIALOG_PROJECT ? 'Create Project' : 'Create Task';
      Dialog.dialogTitle.textContent = object === Dialog.DIALOG_PROJECT ? 'New Project' : 'New Task';
    }
  }

  show() {
    Dialog.dialog.showModal();
  }

  static getFormData() {
    const name = Dialog.inputName.value;
    const description = Dialog.inputDescription.value;
    const dueDate = Dialog.inputDueDate.value;
    return { name, description, dueDate };
  }

  confirmEdit(e) {
    // Prevent the form from submitting
    e.preventDefault();
    const data = Dialog.getFormData();

    if (this.object === Dialog.DIALOG_PROJECT) {

      // Create a new project without modifying the tasks, and get original projectName
      const newProject = new Project(data.name, data.description, data.dueDate, this.data.tasks);
      const projectName = this.data.title;
      
      if (DataController.updateProjectInfo(projectName, newProject)) {
        // Update the sidebar project list and the content with new project info
        updateSidebarProjects(false);
        selectProject(newProject.name);
        Dialog.dialog.close();
      } else {
        alert('The project already exists, please choose another name.');
      }
    } else {
      const newTask = new Task(data.name, data.description, data.dueDate, false);
      const projectName = this.data.projectName;
      const taskIndex = this.data.index;
      const project = DataController.getProject(projectName);

      project.updateTask(taskIndex, newTask);

      if (DataController.updateProjectInfo(projectName, project)) {
        selectProject(projectName);
        Dialog.dialog.close();
      } else {
        alert('An error occurred while editing the task.');
      }
    } 
  }

  confirmNew(e) {
    // Prevent the form from submitting
    e.preventDefault();
    const data = Dialog.getFormData();

    if (this.object === Dialog.DIALOG_PROJECT) {
      const project = new Project(data.name, data.description, data.dueDate, []);

      if (DataController.saveProject(project)) {
        updateSidebarProjects(true);
        Dialog.dialog.close();
      } else {
        alert('The project already exists, please choose another name.');
      }
    } else {
      const newTask = new Task(data.name, data.description, data.dueDate, false);
      const projectName = this.data.title;
      const project = DataController.getProject(projectName);

      project.addTask(newTask);
      DataController.updateProjectInfo(projectName, project);
      selectProject(projectName);
      updateBadge(projectName);
      Dialog.dialog.close();
    }
  }
}