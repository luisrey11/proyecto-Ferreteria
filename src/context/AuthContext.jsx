// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Intentamos recuperar la sesión guardada en localStorage
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario_ferreteria');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  // Función para Iniciar Sesión
  const iniciarSesion = (datosUsuario) => {
    // datosUsuario puede ser p.ej: { nombre: 'Luis Reyes', correo: 'admin@ferreteria.cl' }
    setUsuario(datosUsuario);
    localStorage.setItem('usuario_ferreteria', JSON.stringify(datosUsuario));
  };

  // Función para Cerrar Sesión
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario_ferreteria');
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};