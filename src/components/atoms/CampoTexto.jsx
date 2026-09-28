import React from 'react';

export const CampoTexto = ({ placeholder, valor, onChange, tipo = 'text' }) => {
  return (
    <input 
      type={tipo} 
      className="form-control" 
      placeholder={placeholder} 
      value={valor} 
      onChange={onChange} 
    />
  );
};