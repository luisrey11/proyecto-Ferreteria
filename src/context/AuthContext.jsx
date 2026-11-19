import React, { createContext, useContext, useState, useEffect } from 'react';
import { iniciarSesion as iniciarSesionApi, cerrarSesion as cerrarSesionApi } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Al cargar o recargar la página (F5), recupera la sesión guardada en localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    const nombre = localStorage.getItem('nombre');

    if (token) {
      setUsuario({ token, rol, nombre });
    }
  }, []);

  const iniciarSesion = async (credenciales) => {
    const data = await iniciarSesionApi(credenciales);
    const sesion = {
      token: data.token,
      rol: data.rol,
      nombre: data.nombre,
    };
    setUsuario(sesion);
    return data;
  };

  const cerrarSesion = () => {
  cerrarSesionApi();
  setUsuario(null);
};

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);