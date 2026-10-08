import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/">Ferretería Los Maestros</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/catalogo">Catálogo</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-warning fw-semibold" to="/ofertas">🔥 Ofertas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categorias">Categorías</Link>
          </li>
          {/* Botón de Inicio de Sesión agregado */}
          <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
            <Link className="btn btn-outline-light btn-sm px-3 py-2" to="/login">
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;