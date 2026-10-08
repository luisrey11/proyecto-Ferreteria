import React from 'react';
import { Precio } from '../atoms/Precio';
import { Boton } from '../atoms/Boton';

export const ItemCarrito = ({ item, onCambiarCantidad, onEliminar }) => {
  return (
    <>
      <h6 className="mb-1 fw-bold">{item.nombre}</h6>
      <Precio valor={item.precio} />
      <span className="badge bg-secondary">Cant: {item.cantidad}</span>
      <Boton 
        texto="Eliminar" 
        variante="danger" 
        onClick={() => onEliminar(item.id)} 
      />
    </>
  );
};

export default ItemCarrito;