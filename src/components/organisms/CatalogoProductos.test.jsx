import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CatalogoProductos from './CatalogoProductos';

// Mockeamos el hook useCarrito para que devuelva la función requerida sin fallar
vi.mock('../../context/CarritoContext', () => ({
  useCarrito: () => ({
    agregarAlCarrito: vi.fn(),
    productosCarrito: []
  })
}));

describe('CatalogoProductos (Organismo)', () => {
  it('muestra el catálogo de productos correctamente cuando está vacío', () => {
    render(
      <MemoryRouter>
        <CatalogoProductos productos={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText('Catálogo de Productos')).toBeInTheDocument();
  });

  it('renderiza la lista de productos cuando se proporcionan elementos (cubre línea 14)', () => {
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
});