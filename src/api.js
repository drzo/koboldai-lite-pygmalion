import axios from 'axios';

export class KoboldAPI {
    constructor() {
        this.endpoint = '';
        this.currentModel = null;
        this.axios = axios.create({
            timeout: 30000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Client-Agent': 'koboldai-lite:1.0.0'
            }
        });
        this.loadSavedEndpoint();
    }

    loadSavedEndpoint() {
        try {
            const saved = localStorage.getItem('apiEndpoint');
            if (saved) {
                this.endpoint = saved;
                this.currentModel = localStorage.getItem('currentModel');
                this.axios.defaults.baseURL = saved;
            }
        } catch (error) {
            console.error('Failed to load saved endpoint:', error);
        }
    }

    async setEndpoint(url) {
        if (!url) {
            throw new Error('API endpoint URL is required');
        }

        try {
            new URL(url);
        } catch {
            throw new Error('Invalid URL format');
        }

        try {
            const response = await this.axios.get(`${url}/api/v2/status/heartbeat`, {
                timeout: 5000
            });

            if (response.status !== 200) {
                throw new Error(`API returned ${response.status}`);
            }

            this.endpoint = url;
            this.axios.defaults.baseURL = url;
            localStorage.setItem('apiEndpoint', url);
            
            await this.updateModels();
            return true;
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('Connection timed out');
            }
            throw new Error(`Failed to connect to API: ${error.message}`);
        }
    }

    async generate(prompt, params = {}) {
        if (!this.endpoint) {
            throw new Error('API endpoint not configured');
        }

        if (!prompt) {
            throw new Error('Prompt is required');
        }

        const defaultParams = {
            max_length: 80,
            temperature: 0.7,
            top_p: 0.9,
            model: this.currentModel
        };

        const requestParams = { ...defaultParams, ...params };

        try {
            const response = await this.axios.post('/api/v2/generate/text/async', {
                prompt,
                params: requestParams
            });

            if (!response.data?.id) {
                throw new Error('Invalid response format');
            }

            return await this.pollGeneration(response.data.id);

        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('Generation request timed out');
            }
            throw new Error(`Generation failed: ${error.message}`);
        }
    }

    async pollGeneration(id, maxAttempts = 60) {
        let attempts = 0;
        
        while (attempts < maxAttempts) {
            try {
                const response = await this.axios.get(`/api/v2/generate/text/status/${id}`);
                
                if (response.data.done) {
                    return response.data.results[0].text;
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
                attempts++;
                
            } catch (error) {
                throw new Error(`Failed to check generation status: ${error.message}`);
            }
        }
        
        throw new Error('Generation timed out');
    }

    async getModels() {
        if (!this.endpoint) {
            return [];
        }

        try {
            const response = await this.axios.get('/api/v2/status/models', {
                params: { type: 'text' },
                timeout: 5000
            });

            if (!Array.isArray(response.data)) {
                throw new Error('Invalid models response format');
            }

            return response.data;

        } catch (error) {
            console.error('Failed to fetch models:', error);
            if (error.code === 'ECONNABORTED') {
                throw new Error('Models fetch timed out');
            }
            throw new Error(`Failed to fetch models: ${error.message}`);
        }
    }

    async updateModels() {
        const models = await this.getModels();
        if (models.length > 0) {
            this.currentModel = models[0].name;
            localStorage.setItem('currentModel', this.currentModel);
        }
        return models;
    }

    setModel(modelName) {
        this.currentModel = modelName;
        localStorage.setItem('currentModel', modelName);
    }
}