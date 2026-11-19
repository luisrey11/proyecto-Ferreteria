import React, { useState, useEffect } from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { obtenerProductos } from '../services/productoService';
import { obtenerPedidos, crearPedido, cambiarEstadoPedido } from '../services/pedidoService';

export default function PedidosPage() {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [tipoEntrega, setTipoEntrega] = useState('RETIRO_TIENDA');
  const [direccionDespacho, setDireccionDespacho] = useState('');
  const [metodoPago, setMetodoPago] = useState('CONTADO');
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  const rolActual = (localStorage.getItem('rol') || '').toUpperCase();
  const esStaff = rolActual === 'ADMIN' || rolActual === 'VENDEDOR';

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    setError('');
    try {
      const [listaProductos, listaPedidos] = await Promise.all([
        obtenerProductos(),
        obtenerPedidos(),
      ]);
      const prodArray = Array.isArray(listaProductos) ? listaProductos : [];
      setProductos(prodArray);
      if (prodArray.length > 0 && !productoId) {
        setProductoId(String(prodArray[0].id));
      }
      setPedidos(Array.isArray(listaPedidos) ? listaPedidos : []);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        setError('Debes iniciar sesión con un token válido para ver o crear pedidos.');
      } else {
        setError('No se pudo cargar la información de pedidos o productos.');
      }
    } finally {
      setCargando(false);
    }
  };

  const manejarCrearPedido = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    try {
      const payload = {
        productoId: Number(productoId),
        cantidad: Number(cantidad),
        tipoEntrega,
        direccionDespacho: tipoEntrega === 'DESPACHO_DOMICILIO' ? direccionDespacho.trim() : '',
        metodoPago,
      };

      const nuevoPedido = await crearPedido(payload);
      setPedidos((prev) => [nuevoPedido, ...prev]);
      setMensajeExito(`Pedido #${nuevoPedido.id} creado correctamente. Stock actualizado.`);
      setCantidad(1);

      const listaActualizada = await obtenerProductos();
      setProductos(Array.isArray(listaActualizada) ? listaActualizada : []);
    } catch (err) {
      const status = err?.response?.status;
      const data = err?.response?.data;

      if (status === 409) {
        const disponible = data?.stockDisponible ?? 'desconocido';
        const solicitada = data?.cantidadSolicitada ?? cantidad;
        setError(
          `Conflicto (409): ${data?.error || 'Stock insuficiente'}. Disponible: ${disponible}, Solicitado: ${solicitada}.`
        );
      } else if (status === 401 || status === 403) {
        setError('No tienes permisos para realizar esta acción.');
      } else {
        setError(data?.error || 'Error al crear el pedido.');
      }
    }
  };

  const manejarCambioEstado = async (id, nuevoEstado) => {
    setError('');
    setMensajeExito('');
    try {
      const actualizado = await cambiarEstadoPedido(id, nuevoEstado);
      setPedidos((prev) => prev.map((p) => (p.id === id ? actualizado : p)));
      setMensajeExito(`Estado del pedido #${id} actualizado a ${actualizado.estado}.`);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 403) {
        setError('Solo ADMIN o VENDEDOR pueden cambiar el estado de los pedidos.');
      } else {
        setError(err?.response?.data?.error || 'No se pudo cambiar el estado del pedido.');
      }
    }
  };

  return (
    <PlantillaPublica>
      <div className="container my-5" translate="no">
        <h2 className="fw-bold mb-4">Ferretería Los Maestros - Pedidos y Solicitudes</h2>

        {mensajeExito && (
          <div className="alert alert-success" role="alert">
            {mensajeExito}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={manejarCrearPedido} className="card p-4 shadow-sm mb-4">
          <h5 className="fw-bold mb-3">Nueva Solicitud / Pedido</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Producto</label>
              <select
                className="form-select"
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
                required
              >
                {productos.length === 0 ? (
                  <option value="">Sin productos disponibles</option>
                ) : (
                  productos.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.nombre} (${prod.precio} - Stock: {prod.stock})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Tipo de Entrega</label>
              <select
                className="form-select"
                value={tipoEntrega}
                onChange={(e) => setTipoEntrega(e.target.value)}
              >
                <option value="RETIRO_TIENDA">Retiro en Tienda</option>
                <option value="DESPACHO_DOMICILIO">Despacho a Domicilio</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Método de Pago</label>
              <select
                className="form-select"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
              >
                <option value="CONTADO">Contado</option>
                <option value="CUENTA_CORRIENTE">Cuenta Corriente</option>
              </select>
            </div>

            {tipoEntrega === 'DESPACHO_DOMICILIO' && (
              <div className="col-md-8">
                <label className="form-label">Dirección de Despacho</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Calle Los Carrera 450, La Serena"
                  value={direccionDespacho}
                  onChange={(e) => setDireccionDespacho(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="col-md-4 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={productos.length === 0}
              >
                Crear Pedido
              </button>
            </div>
          </div>
        </form>

        <button
          type="button"
          className="btn btn-outline-secondary mb-4"
          onClick={cargarDatos}
        >
          Actualizar pedidos
        </button>

        {cargando ? (
          <p className="text-muted">Cargando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <div className="alert alert-info">No hay pedidos registrados todavía.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle bg-white">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Entrega / Pago</th>
                  <th>Usuario</th>
                  <th>Estado</th>
                  {esStaff && <th>Cambiar Estado</th>}
                </tr>
              </thead>
              <tbody>
                {pedidos.map((ped) => (
                  <tr key={ped.id}>
                    <td>{ped.id}</td>
                    <td>{ped.nombreProducto || `Producto #${ped.productoId}`}</td>
                    <td>{ped.cantidad}</td>
                    <td>${ped.total}</td>
                    <td>
                      {ped.tipoEntrega} / {ped.metodoPago}
                    </td>
                    <td>{ped.emailUsuario}</td>
                    <td>
                      <span className="badge bg-secondary">{ped.estado}</span>
                    </td>
                    {esStaff && (
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={ped.estado}
                          onChange={(e) => manejarCambioEstado(ped.id, e.target.value)}
                        >
                          <option value="PENDIENTE">PENDIENTE</option>
                          <option value="CONFIRMADO">CONFIRMADO</option>
                          <option value="DESPACHADO">DESPACHADO</option>
                          <option value="ENTREGADO">ENTREGADO</option>
                          <option value="CANCELADO">CANCELADO</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PlantillaPublica>
  );
}