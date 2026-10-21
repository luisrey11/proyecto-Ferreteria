// src/components/organisms/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';

export const Navbar = () => {
  const { usuario, cerrarSesion } = useAuth();
  const { carrito } = useCarrito();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm" translate="no">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-warning" to="/">
          🛠️ Ferretería Los Maestros
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>

            {/* 🛒 Dejamos únicamente el enlace a Catálogo */}
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">Catálogo</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/stock">Control de Stock</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Botón Carrito */}
            <Link to="/carrito" className="btn btn-outline-light position-relative">
              🛒 Carrito
              {carrito && carrito.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {carrito.reduce((acc, item) => acc + (Number(item.cantidad) || 1), 0)}
                </span>
              )}
            </Link>

            {/* Menú de Usuario / Iniciar Sesión */}
            {usuario ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle fw-semibold"
                  type="button"
                  id="dropdownUsuario"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  👤 {usuario.nombre || usuario.correo}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownUsuario">
                  <li className="dropdown-header text-muted small">
                    Sesión activa:<br />
                    <strong className="text-dark">{usuario.correo}</strong>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      type="button" 
                      className="dropdown-item text-danger fw-semibold"
                      onClick={handleCerrarSesion}
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary fw-semibold">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;