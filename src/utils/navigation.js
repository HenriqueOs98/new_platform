import { createNavControls } from '../components/nav-controls.js';

export const initializeNavigation = () => {
  const navControls = document.querySelector('.nav-controls');
  const controls = createNavControls();
  navControls.appendChild(controls);
};