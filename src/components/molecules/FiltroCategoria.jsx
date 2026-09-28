import React from 'react';

export const FiltroCategoria = ({ categorias, categoriaSeleccionada, onChange }) => {
  return (
    <div className="mb-4 p-3 bg-light rounded shadow-sm">
      <label htmlFor="filtroCategoria" className="form-label fw-semibold text-secondary">
        Filtrar por Categoría
      </label>
      <select 
        id="filtroCategoria"
        className="form-select"
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
    </div>
  );
};

export default FiltroCategoria;