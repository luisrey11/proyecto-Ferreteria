// src/components/organisms/CatalogoProductos.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CatalogoProductos from './CatalogoProductos';

const agregarAlCarritoMock = vi.fn();

// Mockeamos el hook useCarrito
vi.mock('../../context/CarritoContext', () => ({
  useCarrito: () => ({
    agregarAlCarrito: agregarAlCarritoMock,
    productosCarrito: []
  })
}));

describe('CatalogoProductos (Organismo)', () => {
  it('muestra el catálogo con productos por defecto cuando no se reciben props (cubre líneas por defecto)', () => {
    render(
      <MemoryRouter>
        <CatalogoProductos />
      </MemoryRouter>
    );
    // Verifica que aparezca un producto por defecto de la lista de respaldo
    expect(screen.getByText('Taladro Percutor Profesional')).toBeInTheDocument();
  });

  it('muestra el catálogo de productos correctamente cuando está vacío', () => {
    render(
      <MemoryRouter>
        <CatalogoProductos productos={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText('Catálogo de Productos')).toBeInTheDocument();
  });

  it('renderiza la lista de productos cuando se proporcionan elementos', () => {
    const productosMock = [
      { id: 1, nombre: 'Taladro Percutor', precio: 45000, stock: 10 }
    ];

    render(
      <MemoryRouter>
        <CatalogoProductos productos={productosMock} />
      </MemoryRouter>
    );

    expect(screen.getByText('Taladro Percutor')).toBeInTheDocument();
  });

  it('permite agregar un producto al carrito y cerrar la alerta flotante (cubre alerta y cierre)', async () => {
    const productosMock = [
      { id: 1, nombre: 'Taladro Percutor', precio: 45000, stock: 10 }
    ];

    render(
      <MemoryRouter>
        <CatalogoProductos productos={productosMock} />
      </MemoryRouter>
    );

    // Hacemos clic en el botón de añadir al carrito
    const botonAgregar = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(botonAgregar);

    // Verificamos que se muestre la alerta flotante
    expect(screen.getByText(/¡"Taladro Percutor" se añadió al carrito!/i)).toBeInTheDocument();

    // Hacemos clic en el botón (X) para cerrar la alerta (Cubre la línea del botón de cierre)
    const botonCerrarAlerta = screen.getByRole('button', { name: '' }); 
    fireEvent.click(botonCerrarAlerta);

    // Verificamos que la alerta desaparezca
    expect(screen.queryByText(/se añadió al carrito!/i)).not.toBeInTheDocument();
  });
});