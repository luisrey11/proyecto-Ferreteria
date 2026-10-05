import React from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Ofertas = () => {
  // Productos en oferta de ejemplo
  const productosOferta = [
    { id: 101, nombre: 'Taladro Percutor Oferta', precio: 29990, precioAnterior: 39990, stock: 8, descripcion: '¡Descuento especial por tiempo limitado en herramientas eléctricas!' },
    { id: 102, nombre: 'Set de Brocas x10 Profesional', precio: 6990, precioAnterior: 9990, stock: 15, descripcion: 'Kit completo para concreto, metal y madera.' },
    { id: 103, nombre: 'Carretilla de Carga 50L', precio: 24990, precioAnterior: 32990, stock: 4, descripcion: 'Alta resistencia para trabajos de construcción pesados.' }
  ];

  return (
    <PlantillaPublica>
      <div className="container my-4">
        {/* Banner de ofertas */}
        <div className="alert alert-danger text-center py-4 shadow-sm" role="alert">
          <h2 className="fw-bold mb-1">🔥 ¡Súper Ofertas de la Semana! 🔥</h2>
          <p className="mb-0 text-muted">Aprovecha los descuentos exclusivos en Ferretería Los Maestros.</p>
        </div>

        {/* Listado de productos en oferta */}
        <div className="row g-4 mt-2">
          {productosOferta.map((prod) => (
            <div className="col-md-4" key={prod.id}>
              <div className="card h-100 shadow-sm border-danger">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <span className="badge bg-danger mb-2">¡Descuento!</span>
                    <h5 className="card-title text-dark fw-bold">{prod.nombre}</h5>
                    <p className="card-text text-muted small">{prod.descripcion}</p>
                  </div>

                  <div className="my-3">
                    <span className="text-muted text-decoration-line-through me-2">${prod.precioAnterior}</span>
                    <span className="fw-bold text-danger fs-5">${prod.precio}</span>
                  </div>

                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => alert(`¡Oferta añadida: ${prod.nombre}!`)}
                  >
                    Aprovechar Oferta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PlantillaPublica>
  );
};

export default Ofertas;
