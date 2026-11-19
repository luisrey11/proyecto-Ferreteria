import React from 'react';

export const EtiquetaStock = (props) => {
  const stock = props.stock;
  const enStock = stock > 0;

  return (
    <span className={`badge bg-${enStock ? 'success' : 'danger'}`}>
      {enStock ? `Stock: ${stock}` : 'Sin stock'}
    </span>
  );
};

export default EtiquetaStock;