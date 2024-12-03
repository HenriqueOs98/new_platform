import createAuth0Client from '@auth0/auth0-spa-js';

let auth0Client;

export const initializeAuth = async () => {
  auth0Client = await createAuth0Client({
    domain: 'dev-codeeditor.auth0.com',
    clientId: 'your_client_id',
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  });

  // Handle callback
  if (window.location.search.includes('code=')) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

export const login = async () => {
  await auth0Client.loginWithRedirect();
};

export const logout = async () => {
  await auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
};

export const getUser = async () => {
  try {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) return null;
    return await auth0Client.getUser();
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};