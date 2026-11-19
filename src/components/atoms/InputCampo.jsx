import React from 'react';
import { Form } from 'react-bootstrap';

const InputCampo = (props) => {
  const id = props.id;
  const label = props.label;
  const type = props.type ?? 'text';
  const name = props.name;
  const value = props.value;
  const onChange = props.onChange;
  const autoComplete = props.autoComplete;

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