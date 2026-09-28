import React from 'react';
import { Link } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Inicio = () => {
  return (
    <PlantillaPublica>
      <div className="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-dark">Bienvenido a Ferretería Los Maestros</h1>
          <p className="col-md-8 fs-4 mx-auto text-muted mb-4">
            Encuentra las mejores herramientas, materiales y accesorios para tus proyectos de construcción y hogar.
          </p>
          
          {/* Botones uno al lado del otro usando d-flex y gap */}
          <div className="d-flex justify-content-center gap-3">
            <Link to="/catalogo" className="btn btn-primary btn-lg">
              Ver Catálogo
            </Link>
            <Link to="/categorias" className="btn btn-outline-secondary btn-lg">
              Ver Categorías
            </Link>
          </div>

        </div>
      </div>
    </PlantillaPublica>
  );
};

export default Inicio;