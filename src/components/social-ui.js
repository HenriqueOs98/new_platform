export const createSocialUI = () => {
  const container = document.createElement('div');
  container.className = 'social-container';
  
  const shareBtn = document.createElement('button');
  shareBtn.id = 'share-btn';
  shareBtn.textContent = 'Share Code';
  
  const codeList = document.createElement('div');
  codeList.className = 'shared-codes';
  
  container.appendChild(shareBtn);
  container.appendChild(codeList);
  
  return container;
};