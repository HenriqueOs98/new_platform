export const initializeEventListeners = (app) => {
  const runButton = document.getElementById('run-btn');
  const clearButton = document.getElementById('clear-console');
  const stopButton = document.getElementById('stop-btn');

  runButton?.addEventListener('click', async () => {
    const code = app.editorService.getContent();
    await app.executionService.executeCode(code);
  });

  clearButton?.addEventListener('click', () => {
    app.executionService.clearOutput();
  });

  stopButton?.addEventListener('click', () => {
    app.executionService.stopExecution();
  });
};