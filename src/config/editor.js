import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from '@codemirror/theme-one-dark';

const getLanguageExtension = (language) => {
  const extensions = {
    javascript: javascript(),
    html: html(),
    css: css()
  };
  
  return extensions[language] || javascript();
};

export const getEditorConfig = (language) => ({
  extensions: [
    basicSetup,
    oneDark,
    getLanguageExtension(language)
  ]
});