import React from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Catalogo = () => {
  return (
    <PlantillaPublica>
      <div className="container my-4">
        <h2 className="mb-4 text-secondary fw-bold">Catálogo de Productos</h2>
        <div className="row g-4">
          {/* Aquí puedes listar los productos o llamar a un organismo de catálogo */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Taladro Percutor</h5>
              <p className="text-muted">$34.990</p>
              <button className="btn btn-outline-primary btn-sm">Añadir al Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </PlantillaPublica>
  );
};

export default Catalogo;