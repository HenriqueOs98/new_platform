import { validateCode } from '../utils/safety.js';
import { WorkerManager } from './WorkerManager.js';
import { UIService } from './UIService.js';

export class ExecutionService {
  constructor() {
    this.workerManager = new WorkerManager();
    this.ui = new UIService();
    this.outputContent = document.getElementById('output-content');
    this.loadingOverlay = document.querySelector('.loading-overlay');
    this.abortController = null;
    this.setupConsoleOverride();
  }

  setupConsoleOverride() {
    const originalConsole = { ...console };
    const outputContent = this.outputContent;

    console.log = function(...args) {
      originalConsole.log(...args);
      const output = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      
      outputContent.innerHTML += `<div>${output}</div>`;
    };

    console.error = function(...args) {
      originalConsole.error(...args);
      const output = args.map(arg => String(arg)).join(' ');
      outputContent.innerHTML += `<div class="error">${output}</div>`;
    };
  }

  async executeCode(code) {
    try {
      this.abortController = new AbortController();
      this.ui.showLoading();
      this.ui.clearOutput();

      await Promise.race([
        this.executeJavaScript(code),
        new Promise((_, reject) => {
          this.abortController.signal.addEventListener('abort', () => {
            reject(new Error('Execution stopped by user'));
          });
        })
      ]);
    } catch (error) {
      if (error.message === 'Execution stopped by user') {
        console.log('Execution stopped');
      } else {
        console.error('Execution error:', error);
      }
    } finally {
      this.ui.hideLoading();
      this.abortController = null;
    }
  }

  stopExecution() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  async executeInWorker(worker, code) {
    return new Promise((resolve, reject) => {
      worker.postMessage(code);
      
      worker.onmessage = (e) => {
        if (e.data.type === 'error') {
          reject(new Error(e.data.error));
        } else {
          resolve(e.data.result);
        }
      };
      
      worker.onerror = (error) => reject(error);
    });
  }
}