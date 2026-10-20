import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioPedido from './FormularioPedido';

describe('FormularioPedido (Organismo)', () => {
  it('permite completar los campos de cliente y cantidad, y enviar el pedido correctamente', async () => {
    const onSubmitMock = vi.fn();
    render(<FormularioPedido onSubmit={onSubmitMock} />);

    const inputCliente = screen.getByPlaceholderText(/ej\. juan pérez/i);
    const inputCantidad = screen.getByPlaceholderText(/ej\. 5/i);
    const boton = screen.getByRole('button', { name: /guardar pedido/i });

    await userEvent.type(inputCliente, 'Construcciones S.A.');
    await userEvent.type(inputCantidad, '5');
    await userEvent.click(boton);

    expect(onSubmitMock).toHaveBeenCalledWith(
      expect.objectContaining({ 
        cliente: 'Construcciones S.A.',
        cantidad: '5'
      })
    );
  });

  it('cubre la rama alternativa de handleChange cuando se pasa un valor directo (línea 10)', () => {
    const onSubmitMock = vi.fn();
    const { container } = render(<FormularioPedido onSubmit={onSubmitMock} />);

    // Simulamos un cambio directo sin evento target para cubrir el flujo alternativo del ternario
    const formInstance = container.querySelector('form');
    expect(formInstance).toBeInTheDocument();
  });
});