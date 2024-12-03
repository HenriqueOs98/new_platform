import { DANGEROUS_PATTERNS } from '../constants.js';

export const validateCode = (code) => {
  for (const pattern of DANGEROUS_PATTERNS) {
    if (code.includes(pattern)) {
      throw new Error(`Forbidden code pattern detected: ${pattern}`);
    }
  }
  return true;
};

export const createSafeWorker = (code) => {
  const blob = new Blob([`
    self.onmessage = function(e) {
      try {
        const code = e.data;
        let lineCount = 0;
        const MAX_LINES = 10000;
        
        const result = (function() {
          let result;
          const logs = [];
          
          // Override console.log with line counting
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
            // Add line counter to prevent infinite loops
            let iterations = 0;
            const MAX_ITERATIONS = 1000000;
            
            // Wrap code in a function that checks iterations
            const wrappedCode = \`
              let __iterations = 0;
              const __result = (function() {
                \${code}
              })();
              __result;
            \`;
            
            // Create a proxy to intercept operations
            const handler = {
              get: function(target, prop) {
                __iterations++;
                if (__iterations > MAX_ITERATIONS) {
                  throw new Error('Maximum iteration limit reached');
                }
                return target[prop];
              }
            };
            
            // Create global proxy
            self.__proxy = new Proxy({}, handler);
            
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
};

export const terminateWorker = (worker) => {
  if (worker) {
    worker.terminate();
    URL.revokeObjectURL(worker.objectURL);
  }
};