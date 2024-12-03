import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

export const getLanguageExtension = (language) => {
  const extensions = {
    javascript: javascript(),
    html: html(),
    css: css()
  };
  
  return extensions[language] || javascript();
};