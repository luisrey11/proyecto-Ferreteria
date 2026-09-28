import React from 'react';
export const Boton = ({ texto, variante = 'primary', onClick, disabled = false }) => {
  return (
    <button 
      type="button" 
      className={`btn btn-${variante}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {texto}
    </button>
  );
};