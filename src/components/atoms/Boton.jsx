import React from 'react';

export const Boton = (props) => {
  const texto = props.texto;
  const variante = props.variante ?? 'primary';
  const onClick = props.onClick;
  const disabled = props.disabled ?? false;
  const type = props.type ?? 'button';

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