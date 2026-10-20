// src/pages/Categorias.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Categorias = () => {
  const navigate = useNavigate();

  const listaCategorias = [
    {
      id: 1,
      nombre: 'Herramientas Eléctricas',
      descripcion: 'Taladros, sierras, esmeriles y más.'
    },
    {
      id: 2,
      nombre: 'Construcción',
      descripcion: 'Cementos, fierros, adhesivos y materiales.'
    },
    {
      id: 3,
      nombre: 'Jardinería',
      descripcion: 'Cortacésped, mangueras y herramientas manuales.'
    }
  ];

  const handleIrACategoria = (nombreCategoria) => {
    navigate(`/catalogo?categoria=${encodeURIComponent(nombreCategoria)}`);
  };

  return (
    <PlantillaPublica>
      <div className="container my-5" translate="no">
        <h3 className="fw-bold text-dark mb-4"><span>Categorías de Productos</span></h3>
        
        <div className="row g-4">
          {listaCategorias.map((cat) => (
            <div className="col-md-4" key={cat.id}>
              <div className="card h-100 shadow-sm p-4 border-0 rounded-3">
                <h5 className="fw-bold text-dark"><span>{cat.nombre}</span></h5>
                <p className="text-muted small mb-4"><span>{cat.descripcion}</span></p>
                <div className="mt-auto">
                  <button 
                    type="button"
                    className="btn btn-primary px-3 py-2 fw-semibold"
                    onClick={() => handleIrACategoria(cat.nombre)}
                  >
                    Ver categoría
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