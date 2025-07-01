
import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.sim.xaxa.win/api' 
    : 'http://localhost:3002/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;
