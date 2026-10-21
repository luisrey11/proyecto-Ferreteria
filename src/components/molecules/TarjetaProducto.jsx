// src/components/molecules/TarjetaProducto.jsx
import React from 'react';

export const TarjetaProducto = ({ producto, onAgregar }) => {
  return (
    <div className="card h-100 shadow-sm p-3 position-relative">
      {/* 🏷️ Etiqueta de Oferta si el producto la tiene */}
      {producto.enOferta && (
        <span 
          className="badge bg-danger position-absolute top-0 start-0 m-3 px-2 py-1 shadow-sm" 
          style={{ fontSize: '0.75rem', zIndex: 2 }}
        >
          ¡Oferta!
        </span>
      )}

      {/* Imagen del producto */}
      <img 
        src={producto.imagen || 'https://via.placeholder.com/200?text=Sin+Imagen'} 
        className="card-img-top mb-2" 
        alt={producto.nombre}
        style={{ height: '160px', objectFit: 'contain' }}
      />

      <div className="card-body d-flex flex-column justify-content-between p-0 mt-2">
        <div>
          <h5 className="card-title fw-bold text-dark fs-6 mb-1">{producto.nombre}</h5>
          <p className="card-text text-muted small mb-3">{producto.descripcion}</p>
        </div>

        <div>
          {/* 💵 Precios: Original tachado + Precio de oferta en rojo */}
          <div className="d-flex align-items-center gap-2 mb-3">
            {producto.precioOriginal && (
              <span className="text-muted text-decoration-line-through small">
                ${producto.precioOriginal.toLocaleString()}
              </span>
            )}
            <span className="text-danger fw-bold fs-5">
              ${producto.precio.toLocaleString()}
            </span>
          </div>

          <button 
            className="btn btn-primary w-100 py-1.5 fw-semibold shadow-sm"
            onClick={() => onAgregar(producto)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaProducto;