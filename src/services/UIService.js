export class UIService {
  constructor() {
    this.loadingOverlay = document.querySelector('.loading-overlay');
    this.outputContent = document.getElementById('output-content');
    this.runButton = document.getElementById('run-btn');
    this.stopButton = document.getElementById('stop-btn');
  }

  showLoading() {
    this.loadingOverlay.classList.add('active');
    this.runButton.disabled = true;
    this.stopButton.disabled = false;
  }

  hideLoading() {
    this.loadingOverlay.classList.remove('active');
    this.runButton.disabled = false;
    this.stopButton.disabled = true;
  }

  async displayOutput(content) {
    await this.appendToOutput(content);
  }

  async displayError(error) {
    await this.appendToOutput(error.message, 'error');
  }

  async appendToOutput(content, type = 'normal') {
    const element = document.createElement('pre');
    element.className = type;
    element.textContent = content;
    this.outputContent.appendChild(element);
    this.outputContent.scrollTop = this.outputContent.scrollHeight;
  }

  clearOutput() {
    this.outputContent.innerHTML = '';
  }
}