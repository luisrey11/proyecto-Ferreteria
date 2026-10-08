import React from 'react';
import InputCampo from '../atoms/InputCampo';

const GrupoInput = ({ id, label, type, name, value, onChange, autoComplete, errorId, errorText }) => {
  return (
    <>
      <InputCampo
        id={id}
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
      <small
        id={errorId}
        className="mensaje-error"
        style={{ color: '#e60000', fontSize: '11px', display: errorText ? 'block' : 'none', marginTop: '2px' }}
      >
        {errorText}
      </small>
    </>
  );
};

export default GrupoInput;