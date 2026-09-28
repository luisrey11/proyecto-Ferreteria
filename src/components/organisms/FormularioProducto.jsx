import React, { useState } from 'react';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { Boton } from '../atoms/Boton';

export const FormularioProducto = ({ onSubmit }) => {
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '' });

  const handleChange = (e, name) => {
    setForm({ ...form, [e.target.name || name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="card p-4 shadow-sm">
      <h4>Registrar Producto</h4>
      <CampoFormulario etiqueta="Nombre del producto" placeholder="Ej. Taladro Percutor" name="nombre" valor={form.nombre} onChange={handleChange} />
      <CampoFormulario etiqueta="Precio" tipo="number" placeholder="Ej. 29990" name="precio" valor={form.precio} onChange={handleChange} />
      <CampoFormulario etiqueta="Stock inicial" tipo="number" placeholder="Ej. 15" name="stock" valor={form.stock} onChange={handleChange} />
      <Boton texto="Guardar Producto" variante="success" />
    </form>
  );
};

export default FormularioProducto;