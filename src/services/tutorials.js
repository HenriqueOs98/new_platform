export class TutorialManager {
  constructor() {
    this.tutorials = [];
    this.currentTutorial = null;
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

  getTutorials() {
    return this.tutorials;
  }

  async loadTutorial(id) {
    try {
      const response = await fetch(`/tutorials/${id}.md`);
      const markdown = await response.text();
      this.currentTutorial = {
        id,
        content: markdown,
        ...this.tutorials.find(t => t.id === id)
      };
      
      const tutorialContent = document.querySelector('.tutorial-content');
      tutorialContent.innerHTML = `
        <h2>${this.currentTutorial.title}</h2>
        <div class="tutorial-difficulty ${this.currentTutorial.difficulty}">
          ${this.currentTutorial.difficulty}
        </div>
        <div class="tutorial-text">${markdown}</div>
      `;
      
      return this.currentTutorial;
    } catch (error) {
      console.error('Error loading tutorial:', error);
      return null;
    }
  }
}