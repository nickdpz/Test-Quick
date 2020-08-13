const BASE_URL = 'http://localhost:8000';
const base64 = require('base-64');

async function callApi(endpoint, options = {}) {
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json; charset=UTF-8',
  };
  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

const api = {
  createUser(data) {
    const { name, phone, email, password } = data;
    return callApi('/user/', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        password: password,
        phone: phone,
        email: email,
      })
    })
  },
  createPost(data, token) {
    return callApi('/post/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Authorization': `Bearer ${token}` }
    })
  },
  getCategories(token) {
    return callApi('/category/', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
  },
  getPost(user, token) {
    return callApi(`/post/?user=${user}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
  },
  singIn(data) {
    const { email, password } = data;
    const username = email;
    return callApi('/auth/sign-in', {
      method: 'POST',
      headers: { 'Authorization': `Basic ${base64.encode(username + ":" + password)}` }
    })
  }
};

export default api;