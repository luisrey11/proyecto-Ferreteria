import React from 'react';

export const Boton = ({ texto, variante = 'primary', onClick, disabled = false, type = 'button' }) => {
  return (
    <button 
      type={type} 
      className={`btn btn-${variante}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {texto}
    </button>
  );
};