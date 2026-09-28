import React from 'react';
import { FilaInventario } from '../molecules/FilaInventario';

export const TablaInventario = ({ productos, onEditar }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <FilaInventario key={prod.id} producto={prod} onEditar={onEditar} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaInventario;