export const createTutorialUI = () => {
  const container = document.createElement('div');
  container.className = 'tutorial-container';
  
  const tutorialList = document.createElement('div');
  tutorialList.className = 'tutorial-list';
  
  const tutorialContent = document.createElement('div');
  tutorialContent.className = 'tutorial-content';
  
  container.appendChild(tutorialList);
  container.appendChild(tutorialContent);
  
  return container;
};