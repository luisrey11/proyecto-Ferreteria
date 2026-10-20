// src/pages/Stock.jsx
import React, { useState } from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Stock = () => {
  // Estado para simular si el usuario actual es Administrador o Cliente
  const [esAdmin, setEsAdmin] = useState(true);

  // Lista inicial de inventario con control de unidades
  const [inventario, setInventario] = useState([
    { id: 1, nombre: 'Taladro Percutor 650W', categoria: 'Herramientas Eléctricas', precio: 34990, stock: 12 },
    { id: 2, nombre: 'Juego de llaves y destornilladores', categoria: 'Herramientas Manuales', precio: 21990, stock: 8 },
    { id: 3, nombre: 'Martillo Profesional de Carpintero', categoria: 'Herramientas Manuales', precio: 9990, stock: 15 },
    { id: 4, nombre: 'Esmeril Angular 4.5" 800W', categoria: 'Herramientas Eléctricas', precio: 29990, stock: 3 },
    { id: 5, nombre: 'Saco de Cemento 25kg', categoria: 'Construcción', precio: 5990, stock: 25 },
    { id: 6, nombre: 'Cortacésped Eléctrico 1200W', categoria: 'Jardinería', precio: 69990, stock: 0 },
    { id: 7, nombre: 'Manguera Reforzada 1/2" 15m', categoria: 'Jardinería', precio: 12990, stock: 5 }
  ]);

  const [busqueda, setBusqueda] = useState('');

  // Modificar la cantidad de stock (Solo si es Administrador)
  const cambiarStock = (id, delta) => {
    if (!esAdmin) {
      alert("⚠️ Acceso denegado: Solo los administradores pueden modificar el stock.");
      return;
    }

    setInventario(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nuevoStock = Math.max(0, item.stock + delta);
          return { ...item, stock: nuevoStock };
        }
        return item;
      })
    );
  };

  // Filtrado por buscador
  const inventarioFiltrado = inventario.filter(item =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <PlantillaPublica>
      <div className="container my-5" translate="no">
        <div className="card shadow-sm p-4 bg-white border-0">
          
          {/* Cabecera y Selector de Rol */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h3 className="fw-bold text-dark mb-1">
                <span>📦 Control de Inventario y Stock</span>
              </h3>
              <p className="text-muted small mb-0">
                <span>Gestión en tiempo real de los productos disponibles en tienda.</span>
              </p>
            </div>

            {/* Selector de Rol simulado */}
            <div className="d-flex align-items-center gap-2 bg-light p-2 rounded border">
              <span className="small fw-semibold text-secondary">Rol actual:</span>
              <div className="form-check form-switch mb-0">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="switchAdmin"
                  checked={esAdmin}
                  onChange={() => setEsAdmin(!esAdmin)}
                />
                <label className="form-check-label small fw-bold text-dark" htmlFor="switchAdmin">
                  {esAdmin ? '👑 Administrador' : '👤 Cliente / Usuario'}
                </label>
              </div>
            </div>
          </div>

          {/* Buscador */}
          <div className="mb-4" style={{ maxWidth: '350px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar producto o categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Aviso si es cliente */}
          {!esAdmin && (
            <div className="alert alert-info py-2 mb-3">
              <small>ℹ️ Estás viendo el stock como cliente. Los botones de modificación de inventario están deshabilitados.</small>
            </div>
          )}

          {/* Tabla de Stock */}
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio Unitario</th>
                  <th className="text-center">Stock Disponible</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventarioFiltrado.length > 0 ? (
                  inventarioFiltrado.map((item) => {
                    let badgeColor = 'bg-success';
                    let estadoTexto = 'En Stock';

                    if (item.stock === 0) {
                      badgeColor = 'bg-danger';
                      estadoTexto = 'Agotado';
                    } else if (item.stock <= 5) {
                      badgeColor = 'bg-warning text-dark';
                      estadoTexto = 'Bajo Stock';
                    }

                    return (
                      <tr key={item.id}>
                        <td className="fw-semibold">
                          <span>{item.nombre}</span>
                        </td>
                        <td>
                          <span className="badge bg-secondary">{item.categoria}</span>
                        </td>
                        <td>
                          <span>${item.precio.toLocaleString()}</span>
                        </td>
                        <td className="text-center fw-bold fs-5">
                          <span>{item.stock}</span>
                        </td>
                        <td className="text-center">
                          <span className={`badge ${badgeColor} px-3 py-2`}>
                            <span>{estadoTexto}</span>
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="btn-group btn-group-sm">
                            <button
                              type="button"
                              className={`btn ${esAdmin ? 'btn-outline-danger' : 'btn-outline-secondary opacity-50'}`}
                              onClick={() => cambiarStock(item.id, -1)}
                              title={esAdmin ? "Disminuir stock" : "Solo administradores"}
                            >
                              ➖
                            </button>
                            <button
                              type="button"
                              className={`btn ${esAdmin ? 'btn-outline-success' : 'btn-outline-secondary opacity-50'}`}
                              onClick={() => cambiarStock(item.id, 1)}
                              title={esAdmin ? "Aumentar stock" : "Solo administradores"}
                            >
                              ➕
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      <span>No se encontraron productos que coincidan con la búsqueda.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PlantillaPublica>
  );
};

export default Stock;