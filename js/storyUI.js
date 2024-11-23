export class StoryUI {
  constructor(storyManager) {
    this.storyManager = storyManager;
    this.setupEventListeners();
  }

  setupEventListeners() {
    const input = document.getElementById('input_text');
    const sendButton = document.getElementById('btnsend');

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && document.getElementById('entersubmit').checked) {
        e.preventDefault();
        this.handleGenerate();
      }
    });

    sendButton.addEventListener('click', () => this.handleGenerate());

    // Memory and author's note handlers
    document.getElementById('btn_actmem')?.addEventListener('click', () => {
      this.showMemoryDialog();
    });
  }

  async handleGenerate() {
    const input = document.getElementById('input_text');
    const prompt = input.value.trim();

    if (!prompt) return;

    try {
      const gameText = document.getElementById('gametext');
      gameText.textContent += '\n' + prompt;
      input.value = '';

      const response = await this.storyManager.generateContinuation(prompt);
      gameText.textContent += '\n' + response;
      
      // Scroll to bottom
      gameText.scrollTop = gameText.scrollHeight;
    } catch (error) {
      this.showError(error.message);
    }
  }

  showMemoryDialog() {
    // Create memory dialog
    const dialog = document.createElement('div');
    dialog.className = 'memory-dialog';
    dialog.innerHTML = `
      <div class="memory-content">
        <h3>Story Memory</h3>
        <textarea id="memory-text" placeholder="Enter story memory here...">${this.storyManager.memory}</textarea>
        <h3>Author's Note</h3>
        <textarea id="author-note" placeholder="Enter author's note here...">${this.storyManager.authorNote}</textarea>
        <div class="dialog-buttons">
          <button id="save-memory">Save</button>
          <button id="cancel-memory">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    // Handle dialog buttons
    document.getElementById('save-memory').addEventListener('click', () => {
      const memory = document.getElementById('memory-text').value;
      const note = document.getElementById('author-note').value;
      
      this.storyManager.setMemory(memory);
      this.storyManager.setAuthorNote(note);
      
      document.body.removeChild(dialog);
    });

    document.getElementById('cancel-memory').addEventListener('click', () => {
      document.body.removeChild(dialog);
    });
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      document.body.removeChild(errorDiv);
    }, 3000);
  }
}