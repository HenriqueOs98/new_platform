import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from '@codemirror/theme-one-dark';

let editor;

export const getLanguageExtension = (language) => {
  switch (language) {
    case 'javascript':
      return javascript();
    case 'html':
      return html();
    case 'css':
      return css();
    default:
      return javascript();
  }
};

export const initializeEditor = () => {
  const languageSelect = document.getElementById('language-select');
  const language = languageSelect.value;

  editor = new EditorView({
    extensions: [
      basicSetup,
      oneDark,
      getLanguageExtension(language)
    ],
    parent: document.getElementById('editor')
  });

  return editor;
};

export const getEditor = () => editor;