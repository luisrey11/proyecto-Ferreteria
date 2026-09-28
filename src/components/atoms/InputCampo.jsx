import React from 'react';
import { Form } from 'react-bootstrap';

const InputCampo = ({ id, label, type = 'text', name, value, onChange, autoComplete }) => {
  return (
    <Form.Group className="input-group mb-3" controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </Form.Group>
  );
};

export default InputCampo;
