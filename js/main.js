import { KoboldAPI } from './api.js';
import { StoryManager } from './storyManager.js';
import { StoryUI } from './storyUI.js';

// Initialize components
const api = new KoboldAPI();
const storyManager = new StoryManager(api);
const ui = new StoryUI(storyManager);

// Set up initial story context
storyManager.setMemory("You are a creative storyteller who writes engaging and imaginative stories.");
storyManager.setAuthorNote("Focus on descriptive language and character development.");

// Example world info
storyManager.addWorldInfo("magic", "In this world, magic is a natural force that anyone can learn to harness through study and practice.");
storyManager.addWorldInfo("dragons", "Dragons are intelligent creatures that can communicate telepathically with humans.");

// Load any saved content
const savedContent = localStorage.getItem('storyContent');
if (savedContent) {
  storyManager.updateContext(savedContent);
  document.getElementById('gametext').textContent = savedContent;
}

// Save content before unloading
window.addEventListener('beforeunload', () => {
  const content = document.getElementById('gametext').textContent;
  localStorage.setItem('storyContent', content);
});