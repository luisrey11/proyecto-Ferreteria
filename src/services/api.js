import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://52.54.141.236:8080';

const api = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Envía automáticamente el token JWT en cada petición si existe en localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;