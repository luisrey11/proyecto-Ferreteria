import React from 'react';

export const Precio = ({ valor }) => {
  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(valor);

  return (
    <span className="fw-bold text-primary fs-5">
      {precioFormateado}
    </span>
  );
};