import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioProducto from './FormularioProducto';

describe('FormularioProducto (Organismo)', () => {
  it('permite registrar un producto completando todos los campos y enviando los datos', async () => {
    const onSubmitMock = vi.fn();
    render(<FormularioProducto onSubmit={onSubmitMock} />);

    const inputNombre = screen.getByPlaceholderText(/ej\. taladro percutor/i);
    const inputPrecio = screen.getByPlaceholderText(/ej\. 29990/i);
    const inputStock = screen.getByPlaceholderText(/ej\. 15/i);
    const botonGuardar = screen.getByRole('button', { name: /guardar producto/i });

    await userEvent.type(inputNombre, 'Llave inglesa');
    await userEvent.type(inputPrecio, '15000');
    await userEvent.type(inputStock, '10');

    await userEvent.click(botonGuardar);

    expect(onSubmitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre: 'Llave inglesa',
        precio: '15000',
        stock: '10',
      })
    );
  });
});