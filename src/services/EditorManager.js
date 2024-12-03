import { EditorView } from "codemirror";
import { getEditorConfig } from '../config/editor';

export class EditorManager {
  constructor() {
    this.editors = new Map();
    this.currentType = null;
    this.container = document.querySelector('.editor-container');
  }

  initialize(type) {
    this.currentType = type;
    this.container.innerHTML = '';
    
    if (type === 'javascript') {
      this.initializeJavaScriptEditor();
    } else if (type === 'web') {
      this.initializeWebEditor();
    }
  }

  initializeJavaScriptEditor() {
    const editor = new EditorView({
      extensions: getEditorConfig('javascript'),
      parent: this.container
    });
    this.editors.set('javascript', editor);
  }

  initializeWebEditor() {
    const tabs = document.createElement('div');
    tabs.className = 'editor-tabs';
    tabs.innerHTML = `
      <button class="tab-btn active" data-file="html">HTML</button>
      <button class="tab-btn" data-file="css">CSS</button>
      <button class="tab-btn" data-file="js">JavaScript</button>
    `;
    
    const editorContainer = document.createElement('div');
    editorContainer.className = 'multi-editor-container';
    
    this.container.appendChild(tabs);
    this.container.appendChild(editorContainer);

    ['html', 'css', 'javascript'].forEach(lang => {
      const editor = new EditorView({
        extensions: getEditorConfig(lang),
        parent: editorContainer
      });
      this.editors.set(lang, editor);
      editor.dom.style.display = lang === 'html' ? 'block' : 'none';
    });

    this.setupTabEvents();
  }

  setupTabEvents() {
    this.container.querySelector('.editor-tabs').addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-btn')) {
        const fileType = e.target.dataset.file;
        this.switchFile(fileType);
      }
    });
  }

  switchFile(fileType) {
    const langMap = { html: 'html', css: 'css', js: 'javascript' };
    const lang = langMap[fileType];
    
    this.editors.forEach((editor, key) => {
      editor.dom.style.display = key === lang ? 'block' : 'none';
    });
    
    const tabs = this.container.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.file === fileType);
    });
  }

  getContent() {
    if (this.currentType === 'javascript') {
      return {
        javascript: this.editors.get('javascript').state.doc.toString()
      };
    } else {
      return {
        html: this.editors.get('html').state.doc.toString(),
        css: this.editors.get('css').state.doc.toString(),
        javascript: this.editors.get('javascript').state.doc.toString()
      };
    }
  }
} 