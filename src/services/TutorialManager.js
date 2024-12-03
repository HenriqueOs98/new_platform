import { marked } from 'marked';
import DOMPurify from 'dompurify';

export class TutorialManager {
  constructor() {
    this.tutorials = [];
    this.currentTutorial = null;
    this.tutorialSelect = document.getElementById('tutorial-select');
    this.tutorialContent = document.querySelector('.tutorial-content');
  }

  async initialize() {
    await this.loadTutorials();
    this.renderTutorialSelect();
    this.setupEventListeners();
  }

  async loadTutorials() {
    try {
      const response = await fetch('/tutorials/index.json');
      const data = await response.json();
      this.tutorials = data.tutorials;
      return this.tutorials;
    } catch (error) {
      console.error('Error loading tutorials:', error);
      return [];
    }
  }

  renderTutorialSelect() {
    const options = this.tutorials
      .sort((a, b) => a.order - b.order)
      .map(tutorial => `
        <option value="${tutorial.id}">
          ${tutorial.title} (${tutorial.difficulty})
        </option>
      `)
      .join('');
    
    this.tutorialSelect.innerHTML = `
      <option value="">Select a tutorial...</option>
      ${options}
    `;
  }

  setupEventListeners() {
    this.tutorialSelect.addEventListener('change', async (e) => {
      const tutorialId = e.target.value;
      if (tutorialId) {
        await this.loadTutorial(tutorialId);
      } else {
        this.tutorialContent.innerHTML = '<p>Select a tutorial to begin...</p>';
      }
    });
  }

  async loadTutorial(id) {
    try {
      const tutorial = this.tutorials.find(t => t.id === id);
      const response = await fetch(`/tutorials/${id}.md`);
      const markdown = await response.text();
      
      const cleanMarkdown = markdown.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      
      const html = DOMPurify.sanitize(marked(cleanMarkdown), {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 
          'li', 'code', 'pre', 'strong', 'em', 'blockquote', 'div', 'span'],
        ALLOWED_ATTR: ['href', 'class', 'id']
      });
      
      this.currentTutorial = {
        ...tutorial,
        content: html
      };

      this.tutorialContent.innerHTML = `
        <h2>${tutorial.title}</h2>
        <div class="tutorial-difficulty ${tutorial.difficulty}">
          ${tutorial.difficulty}
        </div>
        <div class="tutorial-text">${html}</div>
      `;

      window.dispatchEvent(new CustomEvent('tutorial-loaded', { 
        detail: { type: tutorial.type }
      }));
      
      return this.currentTutorial;
    } catch (error) {
      console.error('Error loading tutorial:', error);
      return null;
    }
  }
}