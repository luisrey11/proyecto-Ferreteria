// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo) return;

    // Guarda la sesión sin mostrar alert
    iniciarSesion({
      correo: correo,
      nombre: correo.split('@')[0]
    });

    // Redirige directamente
    navigate('/');
  };

  return (
    <PlantillaPublica>
      <div className="container my-5" style={{ maxWidth: '400px' }} translate="no">
        <div className="card shadow-sm p-4 border-0">
          <h3 className="fw-bold text-center mb-4">Iniciar Sesión</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="ejemplo@ferreteria.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </PlantillaPublica>
  );
};

export default Login;