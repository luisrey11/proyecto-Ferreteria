import React from 'react';

export const FiltroCategoria = ({ categorias, categoriaSeleccionada, onChange }) => {
  return (
    <>
      <label htmlFor="filtroCategoria" className="form-label fw-semibold text-secondary">
        Filtrar por Categoría
      </label>
      <select 
        id="filtroCategoria"
        className="form-select mb-3"
        value={categoriaSeleccionada}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categorias.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </>
  );
};

export default FiltroCategoria;