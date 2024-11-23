import { KoboldAPI } from './api.js';

const api = new KoboldAPI();
let generating = false;

// UI Elements
const editor = document.getElementById('editor');
const generateBtn = document.getElementById('generateBtn');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const endpointInput = document.getElementById('endpoint');
const modelSelect = document.getElementById('model');
const status = document.getElementById('status');

// Initialize
async function initialize() {
    if (api.endpoint) {
        endpointInput.value = api.endpoint;
        try {
            await updateModels();
            showStatus('Connected to API', 'success');
        } catch (error) {
            showStatus('Failed to connect to API: ' + error.message, 'error');
        }
    }
}

// Event Listeners
generateBtn?.addEventListener('click', handleGenerate);
endpointInput?.addEventListener('change', handleEndpointChange);
modelSelect?.addEventListener('change', (e) => api.setModel(e.target.value));

async function handleGenerate() {
    if (generating) return;

    const prompt = editor.value.trim();
    if (!prompt) {
        showStatus('Please enter a prompt', 'error');
        return;
    }

    try {
        generating = true;
        generateBtn.disabled = true;
        showStatus('Generating...', 'info');

        const response = await api.generate(prompt);
        editor.value = editor.value + '\n\n' + response;
        showStatus('Generation complete!', 'success');
    } catch (error) {
        showStatus(error.message, 'error');
    } finally {
        generating = false;
        generateBtn.disabled = false;
    }
}

async function handleEndpointChange() {
    const endpoint = endpointInput.value.trim();
    
    try {
        showStatus('Connecting...', 'info');
        await api.setEndpoint(endpoint);
        await updateModels();
        showStatus('Connected to API endpoint', 'success');
    } catch (error) {
        showStatus(error.message, 'error');
        endpointInput.value = api.endpoint || '';
    }
}

async function updateModels() {
    try {
        const models = await api.getModels();
        if (!modelSelect) return;
        
        modelSelect.innerHTML = '';
        
        if (models.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No models available';
            modelSelect.appendChild(option);
            return;
        }

        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.name;
            option.textContent = model.name;
            if (model.name === api.currentModel) {
                option.selected = true;
            }
            modelSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to update models:', error);
        showStatus('Failed to fetch models: ' + error.message, 'error');
    }
}

function showStatus(message, type = 'info') {
    if (!status) return;
    
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
    
    setTimeout(() => {
        status.style.display = 'none';
    }, 3000);
}

// Start initialization
initialize().catch(error => {
    console.error('Initialization failed:', error);
    showStatus('Failed to initialize: ' + error.message, 'error');
});