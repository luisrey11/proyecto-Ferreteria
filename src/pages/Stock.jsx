// src/pages/Stock.jsx
import React, { useState } from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useAuth } from '../context/AuthContext'; // 👈 Importamos el contexto de autenticación

export const Stock = () => {
  // Obtenemos el usuario actual desde el AuthContext
  const { usuario } = useAuth();

  // Definimos qué correos tienen permisos de administrador
  const correosAdministradores = ['admin@ferreteria.cl', 'gerencia@ferreteria.cl', 'soporte@ferreteria.cl', 'admin@gmail.com'];

  // Verificamos si hay usuario y si su correo está en la lista de administradores
  const esAdmin = usuario && usuario.correo && correosAdministradores.includes(usuario.correo.toLowerCase());

  // Lista inicial de inventario
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

  // Modificar la cantidad de stock (Solo si es administrador)
  const cambiarStock = (id, delta) => {
    if (!esAdmin) {
      return; // Si no es admin, no hace nada al hacer clic
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
          
          {/* Cabecera */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
              <h3 className="fw-bold text-dark mb-1">
                <span>📦 Control de Inventario y Stock</span>
              </h3>
              <p className="text-muted small mb-0">
                <span>
                  {usuario 
                    ? `Sesión activa: ${usuario.correo} (${esAdmin ? '👑 Administrador' : '👤 Cliente'})`
                    : 'Modo visualización: Sin iniciar sesión'}
                </span>
              </p>
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

          {/* Aviso si no es administrador o no ha iniciado sesión */}
          {!esAdmin && (
            <div className="alert alert-warning py-2 mb-3">
              <small>ℹ️ Debes iniciar sesión con una cuenta de administrador (ej: <code>admin@ferreteria.cl</code>) para modificar el stock.</small>
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
                              className={`btn ${esAdmin ? 'btn-outline-danger' : 'btn-outline-secondary disabled opacity-50'}`}
                              onClick={() => cambiarStock(item.id, -1)}
                              disabled={!esAdmin} // 👈 Desactiva físicamente el botón HTML
                              title={esAdmin ? "Disminuir stock" : "Acceso restringido a administradores"}
                            >
                              ➖
                            </button>
                            <button
                              type="button"
                              className={`btn ${esAdmin ? 'btn-outline-success' : 'btn-outline-secondary disabled opacity-50'}`}
                              onClick={() => cambiarStock(item.id, 1)}
                              disabled={!esAdmin} // 👈 Desactiva físicamente el botón HTML
                              title={esAdmin ? "Aumentar stock" : "Acceso restringido a administradores"}
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