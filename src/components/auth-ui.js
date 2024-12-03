export const createAuthUI = () => {
  const container = document.createElement('div');
  container.className = 'auth-container';
  
  const loginBtn = document.createElement('button');
  loginBtn.id = 'login-btn';
  loginBtn.textContent = 'Log In';
  loginBtn.onclick = () => window.login();
  
  const logoutBtn = document.createElement('button');
  logoutBtn.id = 'logout-btn';
  logoutBtn.textContent = 'Log Out';
  logoutBtn.onclick = () => window.logout();
  logoutBtn.style.display = 'none';
  
  const userInfo = document.createElement('div');
  userInfo.id = 'user-info';
  userInfo.className = 'user-info';
  
  container.appendChild(loginBtn);
  container.appendChild(logoutBtn);
  container.appendChild(userInfo);
  
  return container;
};