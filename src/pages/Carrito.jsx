// src/pages/Carrito.jsx
import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const CarritoPage = () => {
  const { carrito, actualizarCantidad, eliminarProducto, totalPedido } = useCarrito();
  const [tipoEntrega, setTipoEntrega] = useState('retiro');
  const [direccion, setDireccion] = useState('');
  const [tipoPago, setTipoPago] = useState('cuenta_corriente');

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
      metodoPago: tipoPago === 'cuenta_corriente' ? 'Cuenta Corriente (Pago a fin de mes)' : 'Pago Contado Inmediato',
      total: totalPedido
    };

    alert(
      `¡Pedido procesado con éxito!\n\n` +
      `• Método de Entrega: ${detallePedido.tipoEntrega === 'despacho' ? 'Despacho a Domicilio' : 'Retiro en Tienda'}\n` +
      `• Método de Pago: ${detallePedido.metodoPago}\n` +
      `• Total a Pagar: $${detallePedido.total.toLocaleString()}`
    );
  };

  return (
    <PlantillaPublica>
      {/* 🛑 translate="no" evita que Google Translate modifique el DOM de React */}
      <div className="container my-5" style={{ maxWidth: '850px' }} translate="no">
        <div className="card shadow-sm p-4 bg-white">
          <h3 className="mb-4 fw-bold text-dark">🛒 Cotización y Carrito de Pedidos</h3>

          {carrito.length === 0 ? (
            <div className="alert alert-info text-center">
              Tu carrito está vacío. ¡Agrega productos desde el Catálogo!
            </div>
          ) : (
            <>
              {/* --- TABLA DE PRODUCTOS --- */}
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
                    {carrito.map((item) => {
                      const precioNum = Number(item.precio) || 0;
                      const cantidadNum = Number(item.cantidad) || 1;
                      const subtotal = precioNum * cantidadNum;

                      return (
                        <tr key={item.id}>
                          <td><span>{item.nombre}</span></td>
                          <td><span>${precioNum.toLocaleString()}</span></td>
                          <td>
                            <input 
                              type="number" 
                              min="1" 
                              value={item.cantidad} 
                              onChange={(e) => actualizarCantidad(item.id, e.target.value)}
                              className="form-control form-control-sm"
                              style={{ width: '70px' }}
                            />
                          </td>
                          <td><span>${subtotal.toLocaleString()}</span></td>
                          <td>
                            <button 
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => eliminarProducto(item.id)}
                            >
                              ❌
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* --- TOTAL DEL PEDIDO --- */}
              <div className="d-flex justify-content-between align-items-center my-3 p-3 bg-light rounded">
                <h4 className="fw-bold mb-0">Total del Pedido:</h4>
                <h4 className="fw-bold text-success mb-0">
                  <span>${totalPedido.toLocaleString()}</span>
                </h4>
              </div>

              {/* --- FORMULARIO DE CONFIRMACIÓN --- */}
              <form onSubmit={handleConfirmarPedido} className="mt-4 border-top pt-3">
                
                {/* 1. OPCIONES DE ENTREGA */}
                <h5 className="fw-bold mb-3">Opciones de Entrega</h5>
                <div className="mb-3">
                  <select 
                    className="form-select"
                    value={tipoEntrega}
                    onChange={(e) => setTipoEntrega(e.target.value)}
                  >
                    <option value="retiro">Retiro en Tienda</option>
                    <option value="despacho">Envío a domicilio</option>
                  </select>
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

                {/* 2. OPCIONES DE PAGO */}
                <div className="mb-4 border-top pt-3">
                  <h5 className="fw-bold mb-3">Opciones de Pago</h5>
                  
                  <div className="mb-3">
                    <select 
                      className="form-select"
                      value={tipoPago}
                      onChange={(e) => setTipoPago(e.target.value)}
                    >
                      <option value="cuenta_corriente">
                        Acreditar a Cuenta Corriente (Pago a fin de mes)
                      </option>
                      <option value="contado">
                        Pagar de inmediato (Contado / WebPay / Transferencia)
                      </option>
                    </select>
                  </div>

                  {/* Alertas condicionales envueltas en contenedores estables */}
                  <div className="mt-3">
                    {tipoPago === 'cuenta_corriente' ? (
                      <div className="alert alert-warning py-2 mb-3" key="alerta-cc">
                        <small>ℹ️ Condición de cuenta corriente: El pago quedará registrado como <strong>"pago pendiente a fin de mes"</strong>.</small>
                      </div>
                    ) : (
                      <div className="alert alert-success py-2 mb-3" key="alerta-contado">
                        <small>💳 Se procesará un pago de inmediato por el total de <strong>${totalPedido.toLocaleString()}</strong>.</small>
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTÓN DE ENVÍO */}
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