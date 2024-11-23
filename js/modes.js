export const modes = {
  story: {
    name: 'Story Mode',
    description: 'For creative fiction and novel writing',
    template: '',
    settings: {
      max_length: 120,
      temperature: 0.8,
      top_p: 0.9,
      top_k: 40,
      repetition_penalty: 1.1
    }
  },
  adventure: {
    name: 'Adventure Mode',
    description: 'Interactive fiction, choose-your-own-adventure style',
    template: '[ You are on an adventure. Your actions and choices will determine the story. ]\n\n',
    settings: {
      max_length: 80,
      temperature: 0.9,
      top_p: 0.95,
      top_k: 50,
      repetition_penalty: 1.05
    }
  },
  chat: {
    name: 'Chat Mode',
    description: 'Character-based interactive chatbot',
    template: '[ A conversation between Human and Assistant. Assistant is helpful and friendly. ]\n\nHuman: Hello!\nAssistant: ',
    settings: {
      max_length: 60,
      temperature: 0.7,
      top_p: 0.9,
      top_k: 30,
      repetition_penalty: 1.2
    }
  },
  instruct: {
    name: 'Instruct Mode',
    description: 'ChatGPT-style instruction-response format',
    template: '### Instruction:\n\n### Response:\n',
    settings: {
      max_length: 100,
      temperature: 0.6,
      top_p: 0.85,
      top_k: 20,
      repetition_penalty: 1.15
    }
  }
};