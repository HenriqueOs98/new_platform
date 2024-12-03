export const EDITOR_CONFIG = {
  TIMEOUT_DURATION: 10000,
  MAX_OUTPUT_LINES: 3000,
  MAX_OUTPUT_LENGTH: 100000,
  MAX_ITERATIONS: 1000000
};

export const THEMES = {
  LIGHT: {
    name: 'light',
    icon: '🌙'
  },
  DARK: {
    name: 'dark',
    icon: '☀️'
  }
};

export const DANGEROUS_PATTERNS = [
  'window.', 'document.', 'localStorage',
  'sessionStorage', 'indexedDB', 'fetch(',
  'XMLHttpRequest', 'WebSocket', 'eval(',
  'Function(', 'setTimeout', 'setInterval'
];