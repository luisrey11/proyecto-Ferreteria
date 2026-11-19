import api from './api';

export const obtenerPedidos = async () => {
  const response = await api.get('/pedidos');
  return response.data;
};

export const obtenerPedidoPorId = async (id) => {
  const response = await api.get(`/pedidos/${id}`);
  return response.data;
};

export const crearPedido = async (pedidoData) => {
  const response = await api.post('/pedidos', pedidoData);
  return response.data;
};

export const cambiarEstadoPedido = async (id, estado) => {
  const response = await api.put(`/pedidos/${id}/estado`, { estado });
  return response.data;
};