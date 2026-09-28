import React, { useState } from 'react';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { Boton } from '../atoms/Boton';

export const FormularioPedido = ({ onSubmit }) => {
  const [form, setForm] = useState({ nombre: '', direccion: '', telefono: '' });

  const handleChange = (e, name) => {
    setForm({ ...form, [e.target.name || name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="card p-4 shadow-sm">
      <h4>Datos de Envío</h4>
      <CampoFormulario etiqueta="Nombre completo" placeholder="Ej. Juan Pérez" name="nombre" valor={form.nombre} onChange={handleChange} />
      <CampoFormulario etiqueta="Dirección" placeholder="Ej. Av. Vicuña Mackenna 123" name="direccion" valor={form.direccion} onChange={handleChange} />
      <CampoFormulario etiqueta="Teléfono" tipo="tel" placeholder="Ej. +56912345678" name="telefono" valor={form.telefono} onChange={handleChange} />
      <Boton texto="Confirmar Pedido" variante="primary" />
    </form>
  );
};

export default FormularioPedido;