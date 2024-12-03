let isExecutionStopped = false;
let currentOutputTimeout = null;

export const resetExecutionState = () => {
  isExecutionStopped = false;
  if (currentOutputTimeout) {
    clearTimeout(currentOutputTimeout);
    currentOutputTimeout = null;
  }
};

export const stopOutputExecution = () => {
  isExecutionStopped = true;
  if (currentOutputTimeout) {
    clearTimeout(currentOutputTimeout);
    currentOutputTimeout = null;
  }
};

export const appendOutputWithDelay = async (outputContent, lines, type = 'normal') => {
  const delay = ms => new Promise(resolve => {
    if (isExecutionStopped) return;
    currentOutputTimeout = setTimeout(resolve, ms);
  });
  
  // Clear existing content if starting fresh
  if (!outputContent.innerHTML.includes('[Execution stopped by user]')) {
    outputContent.innerHTML = '';
  }
  
  if (!Array.isArray(lines)) {
    lines = lines.split('\n');
  }
  
  const className = type === 'error' ? 'error' : '';
  
  for (const line of lines) {
    if (isExecutionStopped) {
      const stopMessage = document.createElement('pre');
      stopMessage.className = 'error';
      stopMessage.textContent = '\n[Execution stopped by user]';
      outputContent.appendChild(stopMessage);
      outputContent.scrollTop = outputContent.scrollHeight;
      break;
    }
    
    // Create a new pre element for each line
    const pre = document.createElement('pre');
    pre.className = className;
    pre.textContent = line;
    outputContent.appendChild(pre);
    
    // Auto-scroll after each line
    outputContent.scrollTop = outputContent.scrollHeight;
    
    // Add a small delay between lines
    await delay(50);
  }
};