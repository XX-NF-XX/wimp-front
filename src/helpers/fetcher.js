import { getToken, storeToken, isRegistered } from './guardian';

const { API_URI } = process.env;
const GET_OPTIONS = { method: 'GET', mode: 'cors', credentials: 'same-origin' };
const POST_OPTIONS = { method: 'POST', mode: 'cors', credentials: 'same-origin' };

function throwOnError(response) {
  if (!response || !response.ok) {
    const error = new Error(response.json().message);
    error.status = response.status;
    throw error;
  }

  return response;
}

function saveToken(headers) {
  if (headers && headers.has('x-token') && headers.has('x-token-expire')) {
    storeToken({ token: headers.get('x-token'), expire: headers.get('x-token-expire') });
  }
}

function getTokenHeader() {
  return { headers: { 'x-token': getToken() } };
}

function getPosts({ days, radius, location }) {
  const query = `?d=${days}&r=${radius}&lon=${location.lon}&lat=${location.lat}`;
  const url = `${API_URI}/requests/list${query}`;

  return fetch(url, GET_OPTIONS)
    .then(throwOnError)
    .then(response => response.json());
}

function signin(telegramUser) {
  const query = Object.keys(telegramUser)
    .map(key => `${key}=${telegramUser[key]}`)
    .join('&');

  const url = `${API_URI}/signin?${query}`;

  return fetch(url, GET_OPTIONS)
    .then(throwOnError)
    .then(response => {
      saveToken(response.headers);
      return response.json();
    })
    .then(payload => {
      isRegistered(payload.registered);
      return payload;
    });
}

function signup(location) {
  const { lat, lon } = location;
  const url = `${API_URI}/signup?lat=${lat}&lon=${lon}`;

  try {
    return fetch(url, { ...GET_OPTIONS, ...getTokenHeader() })
      .then(throwOnError)
      .then(response => response.json())
      .then(payload => {
        isRegistered(payload.registered);
        return payload;
      });
  } catch (err) {
    return Promise.reject(err);
  }
}

function createPost(formData) {
  const url = `${API_URI}/request`;

  try {
    return fetch(url, { ...POST_OPTIONS, ...getTokenHeader(), body: formData })
      .then(throwOnError)
      .then(response => response.json());
  } catch (err) {
    return Promise.reject(err);
  }
}

export { getPosts, createPost, signin, signup };
