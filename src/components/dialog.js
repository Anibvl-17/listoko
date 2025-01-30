export const DIALOG_EDIT = 'dialog_edit';
export const DIALOG_NEW = 'dialog_new';
export const DIALOG_TASK = 'dialog_task';
export const DIALOG_PROJECT = 'dialog_project';

export class Dialog {
  static dialog = document.getElementById('dialog');
  static dialogTitle = document.getElementById('dialog-title');
  static dialogConfirm = document.getElementById('dialog-confirm');
  static dialogCancel = document.querySelector('.dialog-cancel');
  static dialogForm = document.forms.dialogForm;

  static inputName = document.getElementById('form-name');
  static inputDescription = document.getElementById('form-description');
  static inputDueDate = document.getElementById('form-due-date');

  // The dialog constructor receives the mode (new or edit), the object (project or task), and
  // data only if the mode is edit. The data is the object to be edited.
  constructor(mode, object, data = null) {
    this.mode = mode;
    this.object = object;
    this.data = data;

    Dialog.dialog.addEventListener('close', () => Dialog.dialogForm.reset() );
    Dialog.dialogCancel.addEventListener('click', () => Dialog.dialog.close() );

    if (mode === DIALOG_EDIT) {
      Dialog.dialogConfirm.addEventListener('click', this.confirmEdit);
      Dialog.dialogTitle.textContent = object === DIALOG_PROJECT ? 'Edit Project' : 'Edit Task';
      Dialog.dialogConfirm.textContent = object === DIALOG_PROJECT ? 'Save Project' : 'Save Task';

      Dialog.inputName.value = data.title;
      Dialog.inputDescription.value = data.description;
      Dialog.inputDueDate.value = data.dueDate.toString();
    } else {
      Dialog.dialogConfirm.addEventListener('click', this.confirmNew);
      Dialog.dialogTitle.textContent = object === DIALOG_PROJECT ? 'New Project' : 'New Task';
      Dialog.dialogConfirm.textContent = object === DIALOG_PROJECT ? 'Create Project' : 'Create Task';
    }
  }

  show() {
    Dialog.dialog.showModal();
  }

  confirmEdit(e) {
    // Prevent the form from submitting
    e.preventDefault();
    
    alert('Edit confirmed, new name ' + Dialog.inputName.value);
    
  }

  confirmNew(e) {
    // Prevent the form from submitting
    e.preventDefault();
    
    alert('New confirmed, name ' + Dialog.inputName.value);
  }
}