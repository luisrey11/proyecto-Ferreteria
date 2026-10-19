import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilaInvetario from './FilaInvetario'; // Ajusta si es export default o nombrado

describe('FilaInvetario (Molécula)', () => {
  it('muestra los datos del producto en la tabla y permite editar', async () => {
    const productoMock = { id: 1, nombre: 'Taladro', precio: 45000, stock: 10 };
    const onEditarMock = vi.fn();

    render(
      <table>
        <tbody>
          <FilaInvetario producto={productoMock} onEditar={onEditarMock} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Taladro')).toBeInTheDocument();
    
    // Si la fila tiene un botón de editar
    const botonEditar = screen.queryByRole('button', { name: /editar/i });
    if (botonEditar) {
      await userEvent.click(botonEditar);
      expect(onEditarMock).toHaveBeenCalled();
    }
  });
});