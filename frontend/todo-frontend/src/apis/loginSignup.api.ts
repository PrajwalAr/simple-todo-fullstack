import axios from 'axios';

export async function login(request: { email: string; password: string }) {
  const { email, password } = request;
  const response = await axios.post('http://localhost:3000/api/login', {
    email,
    password,
  });
  axios.defaults.headers.common['token'] = response.data.token;
  return response.data;
}

export async function signup(request: {
  email: string;
  password: string;
  username: string;
}) {
  const { email, password, username } = request;
  const response = await axios.post('http://localhost:3000/api/signup', {
    email,
    password,
    name: username,
  });
  return response.data;
}
