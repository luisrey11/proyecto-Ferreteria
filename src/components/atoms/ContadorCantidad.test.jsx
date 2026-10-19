import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContadorCantidad from './ContadorCantidad';

describe('ContadorCantidad (Átomo)', () => {
  it('permite incrementar la cantidad con el botón + y agregarla', async () => {
    const onAddMock = vi.fn();
    render(<ContadorCantidad stock={5} initial={1} onAdd={onAddMock} />);

    const botonMas = screen.getByRole('button', { name: '+' });
    const botonAgregar = screen.getByRole('button', { name: /agregar al carrito/i });

    await userEvent.click(botonMas); // Incrementa de 1 a 2
    await userEvent.click(botonAgregar);

    expect(onAddMock).toHaveBeenCalledWith(2);
  });

  it('respeta los límites del stock', () => {
    render(<ContadorCantidad stock={3} initial={3} onAdd={() => {}} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});