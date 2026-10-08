import React from 'react';
import { EtiquetaStock } from '../atoms/EtiquetaStock';
import { Precio } from '../atoms/Precio';
import { Boton } from '../atoms/Boton';

export const TarjetaProducto = ({ producto, onAgregar }) => {
  return (
    <>
      <h5 className="card-title text-dark fw-bold">{producto.nombre}</h5>
      <p className="card-text text-muted small">{producto.descripcion}</p>
      <EtiquetaStock stock={producto.stock} />
      <Precio valor={producto.precio} />
      <Boton 
        texto="Comprar" 
        variante="outline-primary" 
        onClick={() => onAgregar(producto)} 
        disabled={producto.stock === 0}
      />
    </>
  );
};

export default TarjetaProducto;