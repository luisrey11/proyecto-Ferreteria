import React from 'react';
import { CampoTexto } from '../atoms/CampoTexto';

export const CampoFormulario = ({ etiqueta, tipo = 'text', placeholder, valor, onChange, name }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{etiqueta}</label>
      <CampoTexto 
        tipo={tipo}
        placeholder={placeholder}
        valor={valor}
        onChange={(e) => onChange(e, name)}
      />
    </div>
  );
};
export default CampoFormulario;