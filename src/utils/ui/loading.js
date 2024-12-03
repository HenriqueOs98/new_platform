export const showLoading = () => {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.classList.add('active');
};

export const hideLoading = () => {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.classList.remove('active');
};

export const toggleButtons = (isRunning) => {
  const runButton = document.getElementById('run-btn');
  const stopButton = document.getElementById('stop-btn');
  
  runButton.disabled = isRunning;
  stopButton.disabled = !isRunning;
};