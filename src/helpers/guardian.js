function storeToken({ token, expire }) {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('token-expire', expire);
}

function getToken() {
  const token = sessionStorage.getItem('token');

  if (!token) return token;

  const expire = Number.parseInt(sessionStorage.getItem('token-expire'), 10);
  if (Number.isNaN(expire) || expire < Date.now()) {
    throw new Error('Token expired');
  }

  return token;
}

function isLoggedIn() {
  let token = null;
  try {
    token = getToken();
  } catch (err) {
    return false;
  }

  return !!token;
}

function logOut() {
  sessionStorage.clear();
}

function isRegistered(registered) {
  if (registered != null) sessionStorage.setItem('registered', registered);

  return sessionStorage.getItem('registered') != null ? sessionStorage.getItem('registered') === 'true' : false;
}

export { getToken, storeToken, isLoggedIn, logOut, isRegistered };
