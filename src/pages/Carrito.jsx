// src/pages/Carrito.jsx
import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const CarritoPage = () => {
  const { carrito, actualizarCantidad, eliminarProducto, totalPedido } = useCarrito();
  const [tipoEntrega, setTipoEntrega] = useState('retiro');
  const [direccion, setDireccion] = useState('');

  const handleConfirmarPedido = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const detallePedido = {
      productos: carrito,
      tipoEntrega,
      direccion: tipoEntrega === 'despacho' ? direccion : 'Retiro en tienda física',
      total: totalPedido,
      estadoPago: 'pago pendiente a fin de mes' // Requisito de cuenta corriente
    };

    console.log("Pedido confirmado:", detallePedido);
    alert(`¡Pedido procesado con éxito!\nMétodo: ${detallePedido.tipoEntrega}\nTotal a pagar: $${detallePedido.total.toLocaleString()}\nCondición: ${detallePedido.estadoPago}`);
  };

  return (
    <PlantillaPublica>
      <div className="container my-5" style={{ maxWidth: '850px' }}>
        <div className="card shadow-sm p-4 bg-white">
          <h3 className="mb-4 fw-bold text-dark">🛒 Cotización y Carrito de Pedidos</h3>

          {carrito.length === 0 ? (
            <div className="alert alert-info text-center">
              Tu carrito está vacío. ¡Agrega productos desde el Catálogo!
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Producto</th>
                      <th>Precio Unitario</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>${item.precio.toLocaleString()}</td>
                        <td>
                          <input 
                            type="number" 
                            min="1" 
                            value={item.cantidad} 
                            onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value) || 1)}
                            className="form-control form-control-sm"
                            style={{ width: '70px' }}
                          />
                        </td>
                        <td>${(item.precio * item.cantidad).toLocaleString()}</td>
                        <td>
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => eliminarProducto(item.id)}
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
                <h4 className="fw-bold text-success mb-0">${totalPedido.toLocaleString()}$</h4>
              </div>

              <form onSubmit={handleConfirmarPedido} className="mt-4 border-top pt-3">
                <h5 className="fw-bold mb-3">Opciones de Entrega</h5>
                <div className="mb-3">
                  <div className="form-check form-check-inline">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="tipoEntrega" 
                      id="retiro" 
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

                <button type="submit" className="btn btn-success w-100 py-2 fw-bold shadow-sm">
                  Confirmar Pedido y Cotización
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </PlantillaPublica>
  );
};

export default CarritoPage;