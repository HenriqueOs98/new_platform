import { TIMEOUT_DURATION } from '../../constants.js';

class WorkerManager {
  constructor() {
    this.currentWorker = null;
    this.timeoutId = null;
  }

  createWorker(code) {
    const blob = new Blob([`
      self.onmessage = function(e) {
        try {
          const code = e.data;
          let lineCount = 0;
          const MAX_LINES = 10000;
          
          const result = (function() {
            let result;
            const logs = [];
            
            const originalConsole = console.log;
            console.log = (...args) => {
              if (lineCount >= MAX_LINES) {
                throw new Error('Maximum output limit reached (10,000 lines)');
              }
              lineCount++;
              logs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
              ).join(' '));
            };
            
            try {
              let iterations = 0;
              const MAX_ITERATIONS = 1000000;
              
              const wrappedCode = \`
                let __iterations = 0;
                const __result = (function() {
                  \${code}
                })();
                __result;
              \`;
              
              result = eval(wrappedCode);
            } catch (error) {
              throw error;
            } finally {
              console.log = originalConsole;
            }
            
            return logs.length > 0 ? logs.join('\\n') : result;
          })();
          
          self.postMessage({ 
            type: 'success', 
            result: result !== undefined ? result.toString() : 'undefined'
          });
        } catch (error) {
          self.postMessage({ 
            type: 'error', 
            error: error.toString() 
          });
        }
      };
    `], { type: 'application/javascript' });

    const worker = new Worker(URL.createObjectURL(blob));
    worker.objectURL = blob;
    return worker;
  }

  terminate() {
    if (this.currentWorker) {
      this.currentWorker.terminate();
      URL.revokeObjectURL(this.currentWorker.objectURL);
      this.currentWorker = null;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  setTimeout(callback) {
    this.timeoutId = setTimeout(callback, TIMEOUT_DURATION);
  }

  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

export const workerManager = new WorkerManager();