// src/components/organisms/Carrito.jsx
import React, { useState } from 'react';

export const Carrito = ({ productosCarrito = [], onActualizarCantidad, onEliminarProducto, onConfirmarPedido }) => {
  const [tipoEntrega, setTipoEntrega] = useState('retiro'); // 'retiro' o 'despacho'
  const [direccion, setDireccion] = useState('');

  // Calcular el total de la compra
  const total = productosCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const handleSubmitPedido = (e) => {
    e.preventDefault();
    if (productosCarrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const detallePedido = {
      productos: productosCarrito,
      tipoEntrega,
      direccion: tipoEntrega === 'despacho' ? direccion : 'Retiro en tienda física',
      total,
      estadoPago: 'pago pendiente a fin de mes' // Requisito del negocio
    };

    onConfirmarPedido(detallePedido);
  };

  return (
    <div className="card shadow-sm p-4 bg-white">
      <h3 className="mb-4 fw-bold text-dark">🛒 Cotización y Carrito de Pedidos</h3>

      {productosCarrito.length === 0 && (
        <div className="alert alert-info text-center">Tu carrito de ferretería está vacío.</div>
      )}

      {productosCarrito.length > 0 && (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {productosCarrito.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>${item.precio.toLocaleString()}</td>
                    <td>
                      <input 
                        type="number" 
                        min="1" 
                        value={item.cantidad} 
                        onChange={(e) => onActualizarCantidad(item.id, parseInt(e.target.value) || 1)}
                        className="form-control form-control-sm"
                        style={{ width: '70px' }}
                      />
                    </td>
                    <td>${(item.precio * item.cantidad).toLocaleString()}</td>
                    <td>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onEliminarProducto(item.id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center my-3 p-3 bg-light rounded">
            <h4 className="fw-bold mb-0">Total del Pedido:</h4>
            <h4 className="fw-bold text-success mb-0">${total.toLocaleString()}</h4>
          </div>
        </>
      )}

      <form onSubmit={handleSubmitPedido} className="mt-4 border-top pt-3">
        {productosCarrito.length > 0 && (
          <>
            <h5 className="fw-bold mb-3">Opciones de Entrega</h5>
            <div className="mb-3">
              <div className="form-check form-check-inline">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipoEntrega" 
                  id="retiro" 
                  value="retiro"
                  checked={tipoEntrega === 'retiro'}
                  onChange={() => setTipoEntrega('retiro')}
                />
                <label className="form-check-label" htmlFor="retiro">Retiro en Tienda</label>
              </div>
              <div className="form-check form-check-inline">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipoEntrega" 
                  id="despacho" 
                  value="despacho"
                  checked={tipoEntrega === 'despacho'}
                  onChange={() => setTipoEntrega('despacho')}
                />
                <label className="form-check-label" htmlFor="despacho">Despacho a Domicilio</label>
              </div>
            </div>

            {tipoEntrega === 'despacho' && (
              <div className="mb-3">
                <label className="form-label fw-semibold">Dirección de Despacho</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Ingrese dirección de entrega..."
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="alert alert-warning py-2 mb-3">
              <small>ℹ️ Condición de cuenta corriente: El pago quedará registrado como <strong>"pago pendiente a fin de mes"</strong>.</small>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-success w-100 py-2 fw-bold shadow-sm">
          Confirmar Pedido y Cotización
        </button>
      </form>
    </div>
  );
};

export default Carrito;