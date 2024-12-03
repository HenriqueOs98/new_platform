export const saveCode = (editor) => {
  const code = editor.state.doc.toString();
  const language = document.getElementById('language-select').value;
  
  localStorage.setItem('savedCode', code);
  localStorage.setItem('savedLanguage', language);
};

export const loadLastSession = (editor) => {
  const savedCode = localStorage.getItem('savedCode');
  const savedLanguage = localStorage.getItem('savedLanguage');
  
  if (savedLanguage) {
    document.getElementById('language-select').value = savedLanguage;
  }
  
  if (savedCode) {
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: savedCode }
    });
  }
};