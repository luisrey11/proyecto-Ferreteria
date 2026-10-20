import React, { useState } from 'react';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { Boton } from '../atoms/Boton';

export const FormularioPedido = ({ onSubmit }) => {
  const [form, setForm] = useState({ cliente: '', cantidad: '' });

  const handleChange = (e, name) => {
    const fieldName = e?.target?.name || name;
    const fieldValue = e?.target ? e.target.value : e;

    setForm((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h4>Registrar Pedido</h4>
      <CampoFormulario 
        etiqueta="Cliente" 
        placeholder="Ej. Juan Pérez" 
        name="cliente" 
        valor={form.cliente} 
        onChange={(e) => handleChange(e, 'cliente')} 
      />
      <CampoFormulario 
        etiqueta="Cantidad" 
        tipo="number" 
        placeholder="Ej. 5" 
        name="cantidad" 
        valor={form.cantidad} 
        onChange={(e) => handleChange(e, 'cantidad')} 
      />
      <Boton texto="Guardar Pedido" variante="success" type="submit" />
    </form>
  );
};

export default FormularioPedido;