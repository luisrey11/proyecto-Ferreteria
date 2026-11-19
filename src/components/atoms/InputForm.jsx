import React from 'react';

export const InputForm = (props) => {
  const label = props.label;
  const type = props.type ?? 'text';
  const name = props.name;
  const value = props.value;
  const onChange = props.onChange;
  const placeholder = props.placeholder;
  const error = props.error;

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type={type}
        name={name}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputForm;