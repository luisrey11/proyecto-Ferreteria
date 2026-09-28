import React from 'react';
import { ItemCarrito } from '../molecules/ItemCarrito';
import { Boton } from '../atoms/Boton';
import { Precio } from '../atoms/Precio';

export const Carrito = ({ items, onEliminar, onVaciar }) => {
  const total = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-3">Tu Carrito de Compras</h3>
      {items.length === 0 ? (
        <p className="text-muted">El carrito está vacío.</p>
      ) : (
        <>
          {items.map((item) => (
            <ItemCarrito key={item.id} item={item} onEliminar={onEliminar} />
          ))}
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            <h5>Total:</h5>
            <Precio valor={total} />
          </div>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Boton texto="Vaciar Carrito" variante="outline-danger" onClick={onVaciar} />
            <Boton texto="Proceder al Pago" variante="success" onClick={() => alert('Compra iniciada')} />
          </div>
        </>
      )}
    </div>
  );
};
export default Carrito;