import { EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { basicSetup } from "codemirror";
import { oneDark } from '@codemirror/theme-one-dark';

export class EditorService {
  constructor() {
    this.editor = null;
    this.language = 'javascript'; // Hardcoded for now
  }

  initialize(parentElement) {
    // Hardcoded JavaScript configuration
    const javascriptConfig = {
      extensions: [
        basicSetup,
        oneDark,
        javascript()
      ]
    };

    this.editor = new EditorView({
      ...javascriptConfig,
      parent: parentElement
    });

    return this.editor;
  }

  getContent() {
    if (!this.editor) {
      console.warn('Editor is not initialized');
      return '';
    }
    const content = this.editor.state.doc.toString();
    console.log('EditorService content:', content);
    return content;
  }

  setContent(content) {
    if (!this.editor) return;
    this.editor.dispatch({
      changes: {
        from: 0,
        to: this.editor.state.doc.length,
        insert: content || ''
      }
    });
  }

  destroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  }
}