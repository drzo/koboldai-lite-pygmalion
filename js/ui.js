export class UI {
  constructor(api, editor) {
    this.api = api;
    this.editor = editor;
    this.setupEventListeners();
    this.checkApiStatus();
  }

  setupEventListeners() {
    // Input handling
    document.getElementById('input_text').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && document.getElementById('entersubmit').checked) {
        e.preventDefault();
        this.handleSubmit();
      }
    });

    // Button handlers
    document.getElementById('btnsend').addEventListener('click', () => this.handleSubmit());
    document.getElementById('btn_actundo').addEventListener('click', () => this.handleUndo());
    document.getElementById('btn_actredo').addEventListener('click', () => this.handleRedo());
    document.getElementById('btn_actretry').addEventListener('click', () => this.handleRetry());

    // API endpoint input
    const endpointInput = document.getElementById('endpoint');
    if (endpointInput) {
      endpointInput.value = this.api.endpoint || '';
      endpointInput.addEventListener('change', () => this.handleEndpointChange());
    }
  }

  async handleEndpointChange() {
    const endpointInput = document.getElementById('endpoint');
    const endpoint = endpointInput.value.trim();

    try {
      await this.api.setEndpoint(endpoint);
      this.showStatus('Connected to API endpoint successfully', 'success');
      this.updateModels();
    } catch (error) {
      this.showError(`Failed to connect: ${error.message}`);
      endpointInput.value = this.api.endpoint || '';
    }
  }

  async checkApiStatus() {
    const status = await this.api.checkStatus();
    const statusDiv = document.getElementById('connectstatus');
    
    if (statusDiv) {
      statusDiv.textContent = status.message;
      statusDiv.className = status.ok ? 'status success' : 'status error';
    }

    if (status.ok) {
      this.updateModels();
    }
  }

  async updateModels() {
    const models = await this.api.getModels();
    const modelSelect = document.getElementById('model');
    
    if (modelSelect) {
      modelSelect.innerHTML = '';
      models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.name;
        option.textContent = model.name;
        modelSelect.appendChild(option);
      });
    }
  }

  async handleSubmit() {
    const input = document.getElementById('input_text');
    const text = input.value.trim();

    if (!text) return;

    const submitButton = document.getElementById('btnsend');
    submitButton.disabled = true;
    
    try {
      const status = await this.api.checkStatus();
      if (!status.ok) {
        throw new Error(status.message);
      }

      const response = await this.api.generate(text);
      this.editor.setText(this.editor.getText() + '\n\n' + text + '\n' + response);
      input.value = '';
    } catch (error) {
      this.showError(`Generation failed: ${error.message}`);
    } finally {
      submitButton.disabled = false;
    }
  }

  handleUndo() {
    if (this.editor.undo()) {
      this.updateDisplay();
    }
  }

  handleRedo() {
    if (this.editor.redo()) {
      this.updateDisplay();
    }
  }

  handleRetry() {
    // Implement retry logic
  }

  updateDisplay() {
    document.getElementById('gametext').textContent = this.editor.getText();
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      document.body.removeChild(errorDiv);
    }, 5000);
  }

  showStatus(message, type = 'info') {
    const statusDiv = document.createElement('div');
    statusDiv.className = `status ${type}`;
    statusDiv.textContent = message;
    
    document.body.appendChild(statusDiv);
    
    setTimeout(() => {
      document.body.removeChild(statusDiv);
    }, 3000);
  }
}