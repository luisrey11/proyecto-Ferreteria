import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion as iniciarSesionApi } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!correo.trim() || !password) {
      setError('Ingresa tu correo y contraseña.');
      return;
    }

    setCargando(true);
    try {
      const data = await iniciarSesionApi({
        email: correo.trim(),
        password,
      });

      // Si tu AuthContext expone una función para actualizar el estado en memoria, la sincronizamos
      if (auth?.setUsuario) {
        auth.setUsuario({
          correo: correo.trim(),
          nombre: data.nombre || correo.split('@')[0],
          rol: data.rol,
          token: data.token,
        });
      }

      navigate('/');
    } catch (err) {
      const mensajeBackend =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'No se pudo iniciar sesión. Verifica tus credenciales o conexión.';
      setError(mensajeBackend);
    } finally {
      setCargando(false);
    }
  };

  return (
    <PlantillaPublica>
      <div className="container my-5" style={{ maxWidth: '400px' }} translate="no">
        <div className="card shadow-sm p-4 border-0">
          <h3 className="fw-bold text-center mb-4">Iniciar Sesión</h3>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="ejemplo@ferreteria.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={cargando}
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
                disabled={cargando}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold py-2"
              disabled={cargando}
            >
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </PlantillaPublica>
  );
};

export default Login;