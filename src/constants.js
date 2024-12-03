export const TIMEOUT_DURATION = 10000;
export const MAX_OUTPUT_LINES = 3000;
export const MAX_OUTPUT_LENGTH = 100000;
export const MAX_ITERATIONS = 1000000;

export const DANGEROUS_PATTERNS = [
  'window.', 'document.', 'localStorage',
  'sessionStorage', 'indexedDB', 'fetch(',
  'XMLHttpRequest', 'WebSocket', 'eval(',
  'Function(', 'setTimeout', 'setInterval'
];