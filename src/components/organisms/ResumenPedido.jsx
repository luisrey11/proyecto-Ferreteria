import React from 'react';
import { Precio } from '../atoms/Precio';

export const ResumenPedido = ({ pedido }) => {
  return (
    <div className="card p-4 bg-light shadow-sm">
      <h4 className="mb-3">Resumen de tu Pedido</h4>
      <p><strong>Destinatario:</strong> {pedido.nombre}</p>
      <p><strong>Dirección:</strong> {pedido.direccion}</p>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-bold">Monto Total:</span>
        <Precio valor={pedido.total || 0} />
      </div>
    </div>
  );
};

export default ResumenPedido;