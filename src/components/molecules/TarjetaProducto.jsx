import React from 'react';
import { EtiquetaStock } from '../atoms/EtiquetaStock';
import { Precio } from '../atoms/Precio';
import { Boton } from '../atoms/Boton';

export const TarjetaProducto = ({ producto, onAgregar }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title text-dark fw-bold">{producto.nombre}</h5>
          <p className="card-text text-muted small">{producto.descripcion}</p>
          <EtiquetaStock stock={producto.stock} />
        </div>

        <div className="my-3">
          <Precio valor={producto.precio} />
        </div>

        <Boton 
          texto="Comprar" 
          variante="outline-primary" 
          onClick={() => onAgregar(producto)} 
          disabled={producto.stock === 0}
        />
      </div>
    </div>
  );
};

export default TarjetaProducto;