import React from 'react';
import { TarjetaProducto } from '../molecules/TarjetaProducto';

export const CatalogoProductos = ({ productos, onAgregar }) => {
  return (
    <div className="container my-4">
      <h2 className="mb-4 text-secondary">Catálogo de Productos</h2>
      <div className="row g-4">
        {productos.map((prod) => (
          <div className="col-md-4" key={prod.id}>
            <TarjetaProducto producto={prod} onAgregar={onAgregar} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default CatalogoProductos;