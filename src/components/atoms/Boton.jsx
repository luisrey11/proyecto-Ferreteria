import React from 'react';
import { Button } from 'react-bootstrap';

const Boton = ({ children, type = 'submit', variant = 'primary', className }) => {
  return (
    <Button type={type} variant={variant} className={`btn-submit w-100 ${className || ''}`}>
      {children}
    </Button>
  );
};

export default Boton;