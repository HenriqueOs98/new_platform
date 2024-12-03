export const themes = {
  light: {
    '--editor-bg': '#ffffff',
    '--toolbar-bg': '#f5f5f5',
    '--text-color': '#333333',
    '--border-color': '#e0e0e0',
    '--hover-color': '#eeeeee',
    '--accent-color': '#666666',
    '--error-color': '#d32f2f',
    '--success-color': '#388e3c'
  },
  dark: {
    '--editor-bg': '#1a1a1a',
    '--toolbar-bg': '#242424',
    '--text-color': '#e0e0e0',
    '--border-color': '#333333',
    '--hover-color': '#2a2a2a',
    '--accent-color': '#999999',
    '--error-color': '#f44336',
    '--success-color': '#4caf50'
  }
};

export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
};

export const applyTheme = (theme) => {
  const root = document.documentElement;
  const themeVars = themes[theme];
  
  Object.entries(themeVars).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
};