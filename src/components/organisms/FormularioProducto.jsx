import React, { useState } from 'react';
import { CampoFormulario } from '../molecules/CampoFormulario';
import { Boton } from '../atoms/Boton';

export const FormularioProducto = ({ onSubmit }) => {
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '' });

  const handleChange = (e, name) => {
    const fieldName = e?.target?.name || name;
    const fieldValue = e?.target ? e.target.value : e;

    if (fieldName) {
      setForm((prev) => ({ ...prev, [fieldName]: fieldValue }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h4>Registrar Producto</h4>
      <CampoFormulario 
        etiqueta="Nombre del producto" 
        placeholder="Ej. Taladro Percutor" 
        name="nombre" 
        valor={form.nombre} 
        onChange={(e) => handleChange(e, 'nombre')} 
      />
      <CampoFormulario 
        etiqueta="Precio" 
        tipo="number" 
        placeholder="Ej. 29990" 
        name="precio" 
        valor={form.precio} 
        onChange={(e) => handleChange(e, 'precio')} 
      />
      <CampoFormulario 
        etiqueta="Stock inicial" 
        tipo="number" 
        placeholder="Ej. 15" 
        name="stock" 
        valor={form.stock} 
        onChange={(e) => handleChange(e, 'stock')} 
      />
      <Boton texto="Guardar Producto" variante="success" type="submit" />
    </form>
  );
};

export default FormularioProducto;