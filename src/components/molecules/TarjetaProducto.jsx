// src/components/molecules/TarjetaProducto.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const TarjetaProducto = ({ producto, onAgregar }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={producto.imagen || "https://via.placeholder.com/150"} 
        className="card-img-top" 
        alt={producto.nombre} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{producto.nombre}</h5>
        <p className="card-text text-success fw-bold">${producto.precio?.toLocaleString()}</p>
        
        <div className="mt-auto d-flex gap-2">
          {/* Botón para agregar al carrito */}
          <button 
            className="btn btn-primary btn-sm w-50"
            onClick={() => onAgregar(producto)}
          >
            🛒 Añadir
          </button>
          
          <Link to={`/producto/${producto.id}`} className="btn btn-outline-secondary btn-sm w-50">
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;