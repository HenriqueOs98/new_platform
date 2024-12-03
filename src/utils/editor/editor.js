import { EditorView } from "codemirror";
import { getEditorConfig } from './config.js';

let editor;

export const initializeEditor = () => {
  const languageSelect = document.getElementById('language-select');
  const language = languageSelect.value;

  editor = new EditorView({
    ...getEditorConfig(language),
    parent: document.getElementById('editor')
  });

  return editor;
};

export const getEditor = () => editor;