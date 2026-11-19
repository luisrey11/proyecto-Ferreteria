import React, { useState, useEffect } from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { obtenerProductos, crearProducto, eliminarProducto } from '../services/productoService';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Herramientas');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerProductos();
      setProductos(Array.isArray(datos) ? datos : []);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setError('No tienes permisos con tu rol actual para realizar esta acción.');
      } else {
        setError('No se pudo conectar con el servidor o cargar los productos.');
      }
    } finally {
      setCargando(false);
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const nuevo = {
        nombre: nombre.trim(),
        categoria: categoria.trim() || 'General',
        precio: Number(precio),
        stock: Number(stock),
      };
      const productoGuardado = await crearProducto(nuevo);
      setProductos((prev) => [...prev, productoGuardado]);
      setNombre('');
      setPrecio('');
      setStock('');
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setError('No tienes permisos con tu rol actual para guardar productos.');
      } else {
        setError('Error al guardar el producto.');
      }
    }
  };

  const eliminar = async (id) => {
    setError('');
    try {
      await eliminarProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setError('No tienes permisos con tu rol actual para eliminar productos.');
      } else {
        setError('No se pudo eliminar el producto.');
      }
    }
  };

  return (
    <PlantillaPublica>
      <div className="container my-5" translate="no">
        <h2 className="fw-bold mb-4">Ferretería Los Maestros - Gestión de Productos</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={manejarSubmit} className="row g-3 mb-4">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-primary">
              Guardar Producto
            </button>
          </div>
        </form>

        <button
          type="button"
          className="btn btn-outline-secondary mb-4"
          onClick={cargarProductos}
        >
          Actualizar lista
        </button>

        {cargando ? (
          <p className="text-muted">Cargando productos...</p>
        ) : productos.length === 0 ? (
          <div className="alert alert-info">
            Aún no hay productos registrados. Crea uno con el formulario de arriba.
          </div>
        ) : (
          <div className="row g-3">
            {productos.map((prod) => (
              <div className="col-md-4" key={prod.id}>
                <div className="card h-100 shadow-sm p-3">
                  <h5 className="fw-bold">{prod.nombre}</h5>
                  {prod.categoria && <p className="text-muted small mb-1">{prod.categoria}</p>}
                  <p className="mb-1">Precio: ${prod.precio}</p>
                  <p className="mb-3">Stock: {prod.stock}</p>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm mt-auto"
                    onClick={() => eliminar(prod.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PlantillaPublica>
  );
}