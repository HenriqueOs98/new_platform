import { EditorService } from './services/EditorService.js';
import { ExecutionService } from './services/ExecutionService.js';
import { TutorialManager } from './services/TutorialManager.js';
import { ThemeManager } from './services/ThemeManager.js';
import { initializeNavigation } from './utils/navigation.js';
import { initializeEventListeners } from './utils/events.js';
import './style.css';

class App {
  constructor() {
    this.editorService = new EditorService();
    this.executionService = new ExecutionService();
    this.tutorialManager = new TutorialManager();
    this.themeManager = new ThemeManager();
  }

  async initialize() {
    this.themeManager.initialize();
    
    this.editorService.initialize(
      document.getElementById('editor')
    );
    
    initializeNavigation();
    initializeEventListeners(this);
    
    await this.tutorialManager.initialize();
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => app.initialize());