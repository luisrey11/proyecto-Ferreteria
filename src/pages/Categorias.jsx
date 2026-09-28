import React from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Categorias = () => {
  const categoriasEjemplo = [
    { id: 1, nombre: 'Herramientas Eléctricas', descripcion: 'Taladros, sierras, esmeriles y más.' },
    { id: 2, nombre: 'Construcción', descripcion: 'Cementos, fierros, adhesivos y materiales.' },
    { id: 3, nombre: 'Jardinería', descripcion: 'Cortacésped, mangueras y herramientas manuales.' }
  ];

  return (
    <PlantillaPublica>
      <div className="container my-4">
        <h2 className="mb-4 text-secondary fw-bold">Categorías de Productos</h2>
        
        {/* Tarjetas ordenadas de izquierda a derecha usando row y col-md-4 */}
        <div className="row g-4">
          {categoriasEjemplo.map((cat) => (
            <div key={cat.id} className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-3">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title text-dark">{cat.nombre}</h4>
                  <p className="card-text text-muted flex-grow-1">{cat.descripcion}</p>
                  <button className="btn btn-primary btn-sm mt-3 align-self-start">
                    Ver Categoría
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

export default Categorias;