// src/components/organisms/CatalogoProductos.jsx
import React from 'react';
import { TarjetaProducto } from '../molecules/TarjetaProducto';
import { useCarrito } from '../../context/CarritoContext'; // Importamos el hook del carrito

export const CatalogoProductos = ({ productos }) => {
  const { agregarAlCarrito } = useCarrito(); // Obtenemos la función global para agregar

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-secondary">Catálogo de Productos</h2>
      <div className="row g-4">
        {productos && productos.map((prod) => (
          <div className="col-md-4" key={prod.id}>
            {/* Pasamos agregarAlCarrito directamente como la función onAgregar */}
            <TarjetaProducto producto={prod} onAgregar={agregarAlCarrito} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogoProductos;