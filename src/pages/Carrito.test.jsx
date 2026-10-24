// src/pages/Carrito.test.jsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CarritoPage from './Carrito';

// Mock parcial del contexto para mantener CarritoProvider real y mockear el hook
vi.mock('../context/CarritoContext', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useCarrito: () => ({
      carrito: mockCarritoState,
      totalPedido: mockTotalPedido,
      actualizarCantidad: actualizarCantidadMock,
      eliminarProducto: eliminarProductoMock,
      agregarAlCarrito: agregarAlCarritoMock,
    })
  };
});

// Variables controladas para simular el estado
let mockCarritoState = [];
let mockTotalPedido = 0;
const actualizarCantidadMock = vi.fn();
const eliminarProductoMock = vi.fn();
const agregarAlCarritoMock = vi.fn();

describe('CarritoPage (Página)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCarritoState = [];
    mockTotalPedido = 0;
  });

  it('muestra el mensaje de carrito vacío cuando no hay productos', () => {
    render(
      <MemoryRouter>
        <CarritoPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  it('renderiza los productos del carrito, calcula subtotales y permite actualizar cantidad o eliminar', () => {
    mockCarritoState = [
      { id: 1, nombre: 'Taladro Percutor', precio: 30000, cantidad: 2 }
    ];
    mockTotalPedido = 60000;

    render(
      <MemoryRouter>
        <CarritoPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Taladro Percutor')).toBeInTheDocument();
    
    // Como el subtotal y el total suman $60,000, usamos getAllByText para comprobar ambos
    const precios60k = screen.getAllByText('$60,000');
    expect(precios60k.length).toBeGreaterThan(0);
    expect(precios60k[0]).toBeInTheDocument();

    const inputCantidad = screen.getByRole('spinbutton');
    fireEvent.change(inputCantidad, { target: { value: '3' } });
    expect(actualizarCantidadMock).toHaveBeenCalledWith(1, '3');

    const botonEliminar = screen.getByRole('button', { name: '❌' });
    fireEvent.click(botonEliminar);
    expect(eliminarProductoMock).toHaveBeenCalledWith(1);
  });

  it('permite seleccionar despacho a domicilio, ingresar dirección y confirmar el pedido', () => {
    mockCarritoState = [
      { id: 1, nombre: 'Taladro Percutor', precio: 30000, cantidad: 1 }
    ];
    mockTotalPedido = 30000;

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <CarritoPage />
      </MemoryRouter>
    );

    const selectEntrega = screen.getByDisplayValue('Retiro en Tienda');
    fireEvent.change(selectEntrega, { target: { value: 'despacho' } });

    const inputDireccion = screen.getByPlaceholderText('Ingrese dirección de entrega...');
    expect(inputDireccion).toBeInTheDocument();

    fireEvent.change(inputDireccion, { target: { value: 'Av. Principal 123' } });

    const selectPago = screen.getByDisplayValue(/Acreditar a Cuenta Corriente/i);
    fireEvent.change(selectPago, { target: { value: 'contado' } });

    const botonConfirmar = screen.getByRole('button', { name: /Confirmar Pedido y Cotización/i });
    fireEvent.click(botonConfirmar);

    expect(alertSpy).toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('muestra una alerta si se intenta confirmar el pedido con el carrito vacío', () => {
    mockCarritoState = [];
    mockTotalPedido = 0;

    render(
      <MemoryRouter>
        <CarritoPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });
});