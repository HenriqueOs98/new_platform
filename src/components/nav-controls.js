export const createNavControls = () => {
  const controls = [
    {
      id: 'theme-toggle',
      icon: '🌙',
      label: 'Switch theme',
      action: () => window.dispatchEvent(new CustomEvent('toggle-theme'))
    },
    {
      id: 'profile-btn',
      icon: '👤',
      label: 'Profile menu',
      action: () => window.dispatchEvent(new CustomEvent('toggle-profile'))
    },
    {
      id: 'settings-btn',
      icon: '⚙️',
      label: 'Settings',
      action: () => window.dispatchEvent(new CustomEvent('toggle-settings'))
    }
  ];

  const container = document.createElement('div');
  container.className = 'nav-controls';

  controls.forEach(({ id, icon, label, action }) => {
    const button = document.createElement('button');
    button.id = id;
    button.innerHTML = icon;
    button.setAttribute('aria-label', label);
    button.addEventListener('click', action);
    container.appendChild(button);
  });

  return container;
}