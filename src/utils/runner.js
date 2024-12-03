import { validateCode } from './safety.js';
import { showNotification } from './notifications.js';
import { appendOutputWithDelay, stopOutputExecution, resetExecutionState } from './output.js';
import { workerManager } from './worker/workerManager.js';

export const stopExecution = () => {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.classList.remove('active');
  stopOutputExecution();
  workerManager.terminate();
  document.getElementById('run-btn').disabled = false;
  document.getElementById('stop-btn').disabled = true;
};

export const runCode = async (editor) => {
  const code = editor.state.doc.toString();
  const outputContent = document.getElementById('output-content');
  const loadingOverlay = document.querySelector('.loading-overlay');
  
  try {
    validateCode(code);
    resetExecutionState();
    
    loadingOverlay.classList.add('active');
    document.getElementById('run-btn').disabled = true;
    document.getElementById('stop-btn').disabled = false;
    
    workerManager.terminate();
    const worker = workerManager.createWorker(code);
    workerManager.currentWorker = worker;
    
    workerManager.setTimeout(() => {
      if (workerManager.currentWorker === worker) {
        stopExecution();
        throw new Error('Execution timed out (10 seconds)');
      }
    });
    
    worker.postMessage(code);
    
    worker.onmessage = async (e) => {
      if (workerManager.currentWorker === worker) {
        workerManager.clearTimeout();
        
        if (e.data.type === 'error') {
          showNotification(e.data.error, 'error');
          await appendOutputWithDelay(outputContent, e.data.error, 'error');
        } else {
          const result = e.data.result;
          if (result && result !== 'undefined') {
            await appendOutputWithDelay(outputContent, result);
          }
        }
        
        stopExecution();
      }
    };
    
    worker.onerror = async (error) => {
      if (workerManager.currentWorker === worker) {
        workerManager.clearTimeout();
        showNotification(error.message, 'error');
        await appendOutputWithDelay(outputContent, error.message, 'error');
        stopExecution();
      }
    };
    
  } catch (error) {
    showNotification(error.message, 'error');
    await appendOutputWithDelay(outputContent, error.message, 'error');
    stopExecution();
  }
};