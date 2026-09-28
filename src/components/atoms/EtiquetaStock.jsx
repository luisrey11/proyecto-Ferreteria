import React from 'react';

export const EtiquetaStock = ({ stock }) => {
  const enStock = stock > 0;
  return (
    <span className={`badge bg-${enStock ? 'success' : 'danger'}`}>
      {enStock ? `Stock: ${stock}` : 'Sin stock'}
    </span>
  );
};