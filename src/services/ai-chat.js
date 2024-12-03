export class AIChat {
  constructor() {
    this.context = [];
    this.responses = {
      'help': 'How can I assist you with coding today?',
      'tutorial': 'Would you like to start with a beginner tutorial?',
      'error': "I see you're having an error. Can you share the error message?",
      'debug': "Let's debug your code together. What's not working as expected?"
    };
  }

  async sendMessage(message) {
    // Simulate AI response with pre-defined answers
    const response = this.getResponse(message);
    this.context.push({ role: 'user', content: message });
    this.context.push({ role: 'assistant', content: response });
    return response;
  }

  getResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('error')) {
      return this.responses.error;
    }
    if (lowerMessage.includes('help')) {
      return this.responses.help;
    }
    if (lowerMessage.includes('tutorial')) {
      return this.responses.tutorial;
    }
    if (lowerMessage.includes('debug')) {
      return this.responses.debug;
    }
    
    return "I'm here to help! Ask me about coding, tutorials, or debugging.";
  }

  clearContext() {
    this.context = [];
  }
}