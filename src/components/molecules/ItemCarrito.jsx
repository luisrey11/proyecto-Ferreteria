import React from 'react';
import { Precio } from '../atoms/Precio';
import { Boton } from '../atoms/Boton';

export const ItemCarrito = ({ item, onCambiarCantidad, onEliminar }) => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-3">
      <div>
        <h6 className="mb-1 fw-bold">{item.nombre}</h6>
        <Precio valor={item.precio} />
      </div>
      
      <div className="d-flex align-items-center gap-3">
        <span className="badge bg-secondary">Cant: {item.cantidad}</span>
        <Boton 
          texto="Eliminar" 
          variante="danger" 
          onClick={() => onEliminar(item.id)} 
        />
      </div>
    </div>
  );
};
export default ItemCarrito;