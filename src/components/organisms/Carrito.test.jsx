// src/components/organisms/Carrito.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carrito } from './Carrito';

describe('Carrito (Organismo)', () => {
  const productosMock = [
    { id: 1, nombre: 'Martillo', precio: 5000, cantidad: 2 }
  ];

  it('muestra el mensaje de carrito vacío y activa la alerta si se intenta enviar vacío', async () => {
    const onConfirmarMock = vi.fn();
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Carrito productosCarrito={[]} onConfirmarPedido={onConfirmarMock} />);
    
    expect(screen.getByText(/tu carrito de ferretería está vacío/i)).toBeInTheDocument();

    const botonConfirmar = screen.getByRole('button', { name: /confirmar pedido y cotización/i });
    await userEvent.click(botonConfirmar);

    expect(alertMock).toHaveBeenCalledWith("El carrito está vacío.");
    expect(onConfirmarMock).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });

  it('renderiza los productos, calcula el total y permite actualizar cantidad o eliminar', async () => {
    const onActualizarMock = vi.fn();
    const onEliminarMock = vi.fn();
    const onConfirmarMock = vi.fn();

    render(
      <Carrito 
        productosCarrito={productosMock}
        onActualizarCantidad={onActualizarMock}
        onEliminarProducto={onEliminarMock}
        onConfirmarPedido={onConfirmarMock}
      />
    );

    expect(screen.getByText('Martillo')).toBeInTheDocument();

    const inputCantidad = screen.getByRole('spinbutton');
    await userEvent.clear(inputCantidad);
    await userEvent.type(inputCantidad, '3');
    expect(onActualizarMock).toHaveBeenCalled();

    await userEvent.clear(inputCantidad);
    expect(onActualizarMock).toHaveBeenCalled();

    const botonEliminar = screen.getByRole('button', { name: '❌' });
    await userEvent.click(botonEliminar);
    expect(onEliminarMock).toHaveBeenCalledWith(1);
  });

  it('confirma el pedido correctamente seleccionando retiro en tienda', async () => {
    const onConfirmarMock = vi.fn();

    render(
      <Carrito 
        productosCarrito={productosMock}
        onActualizarCantidad={vi.fn()}
        onEliminarProducto={vi.fn()}
        onConfirmarPedido={onConfirmarMock}
      />
    );

    const botonConfirmar = screen.getByRole('button', { name: /confirmar pedido y cotización/i });
    await userEvent.click(botonConfirmar);

    expect(onConfirmarMock).toHaveBeenCalledWith(
      expect.objectContaining({
        tipoEntrega: 'retiro',
        direccion: 'Retiro en tienda física',
        estadoPago: 'pago pendiente a fin de mes'
      })
    );
  });

  it('permite seleccionar despacho a domicilio, ingresar dirección y confirmar el pedido', async () => {
    const onConfirmarMock = vi.fn();

    render(
      <Carrito 
        productosCarrito={productosMock}
        onActualizarCantidad={vi.fn()}
        onEliminarProducto={vi.fn()}
        onConfirmarPedido={onConfirmarMock}
      />
    );

    const radioDespacho = screen.getByLabelText(/despacho a domicilio/i);
    await userEvent.click(radioDespacho);

    const inputDireccion = screen.getByPlaceholderText(/ingrese dirección de entrega/i);
    await userEvent.type(inputDireccion, 'Av. Las Condes 1234');

    const botonConfirmar = screen.getByRole('button', { name: /confirmar pedido y cotización/i });
    await userEvent.click(botonConfirmar);

    expect(onConfirmarMock).toHaveBeenCalledWith(
      expect.objectContaining({
        tipoEntrega: 'despacho',
        direccion: 'Av. Las Condes 1234',
        estadoPago: 'pago pendiente a fin de mes'
      })
    );
  });
});