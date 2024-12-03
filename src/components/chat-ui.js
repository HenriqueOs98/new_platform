export const createChatUI = () => {
  const container = document.createElement('div');
  container.className = 'chat-container';
  
  const messages = document.createElement('div');
  messages.className = 'chat-messages';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Ask for help...';
  
  const sendBtn = document.createElement('button');
  sendBtn.textContent = 'Send';
  
  container.appendChild(messages);
  container.appendChild(input);
  container.appendChild(sendBtn);
  
  return container;
};