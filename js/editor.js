// Text editor functionality
export class Editor {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
    this.currentText = '';
    this.maxStackSize = 100;
    this.setupAutoSave();
  }

  setupAutoSave() {
    setInterval(() => {
      if (this.currentText) {
        this.saveToLocalStorage();
      }
    }, 30000);
  }

  setText(text, addToHistory = true) {
    if (text !== this.currentText) {
      if (addToHistory) {
        this.pushToUndo();
      }
      this.currentText = text;
      this.saveToLocalStorage();
    }
  }

  getText() {
    return this.currentText;
  }

  pushToUndo() {
    if (this.currentText) {
      this.undoStack.push(this.currentText);
      if (this.undoStack.length > this.maxStackSize) {
        this.undoStack.shift();
      }
      this.redoStack = [];
    }
  }

  undo() {
    if (this.undoStack.length > 0) {
      this.redoStack.push(this.currentText);
      this.currentText = this.undoStack.pop();
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(this.currentText);
      this.currentText = this.redoStack.pop();
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('currentStory', this.currentText);
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }

  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('currentStory');
      if (saved) {
        this.currentText = saved;
      }
      return true;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return false;
    }
  }
}