export class KoboldAPI {
  constructor() {
    this.endpoint = '';
    this.currentModel = '';
    this.history = [];
    this.contextSize = 2048;
    this.loadSavedEndpoint();
  }

  loadSavedEndpoint() {
    const savedEndpoint = localStorage.getItem('apiEndpoint');
    if (savedEndpoint) {
      this.endpoint = savedEndpoint;
    }
  }

  async setEndpoint(endpoint) {
    if (!endpoint) {
      throw new Error('Endpoint URL is required');
    }

    // Validate URL format
    try {
      new URL(endpoint);
    } catch {
      throw new Error('Invalid URL format. Please enter a valid URL (e.g., https://example.com)');
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(`${endpoint}/api/v2/status/heartbeat`, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API endpoint returned error: ${response.status} ${response.statusText}`);
      }

      this.endpoint = endpoint;
      localStorage.setItem('apiEndpoint', endpoint);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Connection timed out. Please check the endpoint URL and try again.');
      } else if (error instanceof TypeError) {
        throw new Error('Network error. Please check your internet connection and the endpoint URL.');
      }
      throw error;
    }
  }

  async generate(prompt, params = {}) {
    if (!this.endpoint) {
      throw new Error('API endpoint not configured. Please set up the endpoint URL first.');
    }

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const defaultParams = {
      max_length: 80,
      temperature: 0.7,
      top_p: 0.9,
      top_k: 0,
      repetition_penalty: 1.1
    };

    const requestParams = { ...defaultParams, ...params };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${this.endpoint}/api/v2/generate/text/async`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Agent': 'koboldai-lite:1.0.0'
        },
        body: JSON.stringify({
          prompt,
          params: requestParams
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || 
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      
      if (!data || typeof data.results?.[0]?.text !== 'string') {
        throw new Error('Invalid response format from API');
      }

      return data.results[0].text;

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Generation request timed out. Please try again.');
      } else if (error instanceof TypeError) {
        throw new Error('Network error during generation. Please check your connection.');
      }
      throw error;
    }
  }

  async getModels() {
    if (!this.endpoint) {
      return [];
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${this.endpoint}/api/v2/status/models?type=text`, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }

      const models = await response.json();
      return Array.isArray(models) ? models : [];

    } catch (error) {
      console.error('Failed to fetch models:', error);
      return [];
    }
  }

  // Helper method to check API status
  async checkStatus() {
    if (!this.endpoint) {
      return {
        ok: false,
        message: 'No endpoint configured'
      };
    }

    try {
      const response = await fetch(`${this.endpoint}/api/v2/status/heartbeat`);
      
      if (!response.ok) {
        return {
          ok: false,
          message: `API returned error: ${response.status} ${response.statusText}`
        };
      }

      return {
        ok: true,
        message: 'Connected'
      };

    } catch (error) {
      return {
        ok: false,
        message: error.message
      };
    }
  }
}