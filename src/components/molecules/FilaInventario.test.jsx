import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilaInventario from './FilaInventario';

describe('FilaInventario (Molécula)', () => {
  it('muestra los datos del producto en la tabla y permite editar', async () => {
    const productoMock = { id: 1, nombre: 'Taladro', precio: 45000, stock: 10 };
    const onEditarMock = vi.fn();

    render(
      <table>
        <tbody>
          <FilaInventario producto={productoMock} onEditar={onEditarMock} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Taladro')).toBeInTheDocument();

    // Daytoy a paset ti mang-tignay iti linia 16 (onClick / onEditar)
    const botonEditar = screen.getByRole('button', { name: /editar/i });
    await userEvent.click(botonEditar);

    expect(onEditarMock).toHaveBeenCalledWith(1);
  });
});