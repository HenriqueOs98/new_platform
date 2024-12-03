import { basicSetup } from "codemirror";
import { oneDark } from '@codemirror/theme-one-dark';
import { getLanguageExtension } from './languages.js';

export const getEditorConfig = (language) => ({
  extensions: [
    basicSetup,
    oneDark,
    getLanguageExtension(language)
  ]
});