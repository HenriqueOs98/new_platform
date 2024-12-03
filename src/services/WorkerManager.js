import { EDITOR_CONFIG } from '../config/constants.js';

export class WorkerManager {
  constructor() {
    this.currentWorker = null;
    this.timeoutId = null;
  }

  createWorker() {
    this.terminate();
    
    const blob = new Blob([this.getWorkerScript()], { 
      type: 'application/javascript' 
    });
    
    const worker = new Worker(URL.createObjectURL(blob));
    this.currentWorker = worker;
    
    this.startTimeout();
    return worker;
  }

  terminate() {
    if (this.currentWorker) {
      this.currentWorker.terminate();
      this.currentWorker = null;
    }
    this.clearTimeout();
  }

  startTimeout() {
    this.timeoutId = setTimeout(() => {
      this.terminate();
      throw new Error('Execution timed out');
    }, EDITOR_CONFIG.TIMEOUT_DURATION);
  }

  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  getWorkerScript() {
    return `
      self.onmessage = function(e) {
        try {
          const code = e.data;
          let result = eval(code);
          self.postMessage({ 
            type: 'success', 
            result: result?.toString() || 'undefined'
          });
        } catch (error) {
          self.postMessage({ 
            type: 'error', 
            error: error.toString() 
          });
        }
      };
    `;
  }
}