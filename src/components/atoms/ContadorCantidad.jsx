// src/components/atoms/ContadorCantidad.jsx
import React from 'react';

export const ContadorCantidad = (props) => {
  const cantidad = props.cantidad ?? 1;
  const onIncrementar = props.onIncrementar;
  const onDecrementar = props.onDecrementar;
  const stockMaximo = props.stockMaximo ?? 99;

  const handleIncrementar = () => {
    if (cantidad < stockMaximo && typeof onIncrementar === 'function') {
      onIncrementar();
    }
  };

  const handleDecrementar = () => {
    if (cantidad > 1 && typeof onDecrementar === 'function') {
      onDecrementar();
    }
  };

  const puedeDecrementar = cantidad > 1;
  const puedeIncrementar = cantidad < stockMaximo;

  return (
    <div className="input-group input-group-sm" style={{ width: '120px' }}>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={handleDecrementar}
        disabled={!puedeDecrementar}
      >
        -
      </button>
      <input
        type="text"
        className="form-control text-center bg-white"
        value={cantidad}
        readOnly
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={handleIncrementar}
        disabled={!puedeIncrementar}
      >
        +
      </button>
    </div>
  );
};

export default ContadorCantidad;