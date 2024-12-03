import { THEME_COLORS } from '../config/theme.js';
import { THEMES } from '../config/constants.js';

export class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.themeToggle = document.getElementById('theme-toggle');
  }

  initialize() {
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('toggle-theme', () => {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    });
  }

  applyTheme(theme) {
    const root = document.documentElement;
    const colors = THEME_COLORS[theme];
    
    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    if (this.themeToggle) {
      this.themeToggle.innerHTML = THEMES[theme.toUpperCase()].icon;
      this.themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }
}