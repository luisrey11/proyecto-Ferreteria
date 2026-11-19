import api from './api';

export const iniciarSesion = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data?.token) {
    localStorage.setItem('token', response.data.token);
    if (response.data.rol) localStorage.setItem('rol', response.data.rol);
    if (response.data.nombre) localStorage.setItem('nombre', response.data.nombre);
  }
  return response.data;
};

export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('nombre');
  localStorage.removeItem('usuario_ferreteria');
};