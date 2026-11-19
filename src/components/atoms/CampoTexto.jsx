import React from 'react';

export const CampoTexto = (props) => {
  const placeholder = props.placeholder;
  const valor = props.valor;
  const onChange = props.onChange;
  const tipo = props.tipo ?? 'text';

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