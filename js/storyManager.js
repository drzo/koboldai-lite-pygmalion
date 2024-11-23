export class StoryManager {
  constructor(api) {
    this.api = api;
    this.context = '';
    this.memory = '';
    this.authorNote = '';
    this.worldInfo = new Map();
  }

  async generateContinuation(prompt, params = {}) {
    const fullContext = this.buildContext(prompt);
    
    const defaultParams = {
      temperature: 0.7,
      max_length: 80,
      top_p: 0.9,
      top_k: 40,
      repetition_penalty: 1.1
    };

    const finalParams = { ...defaultParams, ...params };

    try {
      const response = await this.api.generate(fullContext, finalParams);
      return this.cleanResponse(response);
    } catch (error) {
      throw new Error(`Failed to generate continuation: ${error.message}`);
    }
  }

  buildContext(prompt) {
    const contextParts = [];
    
    if (this.memory) {
      contextParts.push(`[Memory: ${this.memory}]\n`);
    }

    if (this.authorNote) {
      contextParts.push(`[Author's Note: ${this.authorNote}]\n`);
    }

    const relevantWorldInfo = this.getRelevantWorldInfo(prompt);
    if (relevantWorldInfo.length > 0) {
      contextParts.push(relevantWorldInfo.join('\n') + '\n');
    }

    contextParts.push(this.context);
    contextParts.push(prompt);

    return contextParts.join('\n');
  }

  getRelevantWorldInfo(prompt) {
    const relevant = [];
    const searchText = (this.context + '\n' + prompt).toLowerCase();

    for (const [key, info] of this.worldInfo) {
      if (searchText.includes(key.toLowerCase())) {
        relevant.push(info);
      }
    }

    return relevant;
  }

  cleanResponse(response) {
    let text = response.trim();
    
    // Remove any trailing incomplete sentences
    const lastSentenceEnd = Math.max(
      text.lastIndexOf('.'),
      text.lastIndexOf('!'),
      text.lastIndexOf('?')
    );

    if (lastSentenceEnd > 0) {
      text = text.substring(0, lastSentenceEnd + 1);
    }

    return text;
  }

  setMemory(memory) {
    this.memory = memory;
  }

  setAuthorNote(note) {
    this.authorNote = note;
  }

  addWorldInfo(key, info) {
    this.worldInfo.set(key.toLowerCase(), info);
  }

  clearWorldInfo() {
    this.worldInfo.clear();
  }

  updateContext(newContext) {
    this.context = newContext;
  }
}