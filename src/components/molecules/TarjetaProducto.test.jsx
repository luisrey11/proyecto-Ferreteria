// src/components/molecules/TarjetaProducto.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import TarjetaProducto from './TarjetaProducto';

describe('TarjetaProducto (Molécula)', () => {
  const productoMock = { id: 1, nombre: 'Taladro Percutor', precio: 45000 };

  it('muestra el nombre del producto y permite agregarlo', async () => {
    const onAgregarMock = vi.fn();
    render(
      <MemoryRouter>
        <TarjetaProducto producto={productoMock} onAgregar={onAgregarMock} />
      </MemoryRouter>
    );

    expect(screen.getByText('Taladro Percutor')).toBeInTheDocument();

    const boton = screen.getByRole('button', { name: /añadir|agregar/i });
    await userEvent.click(boton);

    expect(onAgregarMock).toHaveBeenCalledWith(productoMock);
  });
});