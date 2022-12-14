const BASE_URL = 'https://pre-onboarding-selection-task.shop';
const AUTH_URL = `${BASE_URL}/auth`;

const headers = new Headers();
headers.set('Content-Type', 'application/json');
headers.set('Access-Control-Allow-Origin', '*');
headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
headers.set('Access-Control-Allow-Credentials', 'true');

export const authAPI = {
  signUp: (data) => {
    return fetch(`${AUTH_URL}/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  },
  signIn: (data) => {
    return fetch(`${AUTH_URL}/signin`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  },
};
