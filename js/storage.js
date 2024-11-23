import localforage from 'localforage';

export class StorageManager {
  constructor() {
    this.store = localforage.createInstance({
      name: 'koboldai-lite'
    });
  }

  async saveStory(id, content) {
    try {
      const story = {
        id,
        content,
        timestamp: Date.now(),
        lastModified: Date.now()
      };
      await this.store.setItem(`story:${id}`, story);
      return true;
    } catch (error) {
      console.error('Failed to save story:', error);
      return false;
    }
  }

  async loadStory(id) {
    try {
      return await this.store.getItem(`story:${id}`);
    } catch (error) {
      console.error('Failed to load story:', error);
      return null;
    }
  }

  async listStories() {
    const stories = [];
    try {
      await this.store.iterate((value, key) => {
        if (key.startsWith('story:')) {
          stories.push(value);
        }
      });
      return stories.sort((a, b) => b.lastModified - a.lastModified);
    } catch (error) {
      console.error('Failed to list stories:', error);
      return [];
    }
  }

  async deleteStory(id) {
    try {
      await this.store.removeItem(`story:${id}`);
      return true;
    } catch (error) {
      console.error('Failed to delete story:', error);
      return false;
    }
  }

  async saveSettings(settings) {
    try {
      await this.store.setItem('settings', settings);
      return true;
    } catch (error) {
      console.error('Failed to save settings:', error);
      return false;
    }
  }

  async loadSettings() {
    try {
      return await this.store.getItem('settings') || {};
    } catch (error) {
      console.error('Failed to load settings:', error);
      return {};
    }
  }
}