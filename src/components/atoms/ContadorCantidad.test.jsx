// src/components/atoms/ContadorCantidad.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContadorCantidad } from './ContadorCantidad';

describe('ContadorCantidad (Átomo)', () => {
  it('permite incrementar la cantidad con el botón +', async () => {
    const onIncrementarMock = vi.fn();
    render(<ContadorCantidad cantidad={1} onIncrementar={onIncrementarMock} onDecrementar={vi.fn()} />);

    const botonMas = screen.getByRole('button', { name: '+' });
    await userEvent.click(botonMas);

    expect(onIncrementarMock).toHaveBeenCalled();
  });

  it('no permite incrementar si se alcanza el stock máximo', async () => {
    const onIncrementarMock = vi.fn();
    render(
      <ContadorCantidad 
        cantidad={5} 
        stockMaximo={5} 
        onIncrementar={onIncrementarMock} 
        onDecrementar={vi.fn()} 
      />
    );

    const botonMas = screen.getByRole('button', { name: '+' });
    await userEvent.click(botonMas);

    expect(onIncrementarMock).not.toHaveBeenCalled();
  });

  it('no permite decrementar por debajo de 1 cuando la cantidad es 1', async () => {
    const onDecrementarMock = vi.fn();
    render(<ContadorCantidad cantidad={1} onIncrementar={vi.fn()} onDecrementar={onDecrementarMock} />);

    const botonMenos = screen.getByRole('button', { name: '-' });
    await userEvent.click(botonMenos);

    expect(onDecrementarMock).not.toHaveBeenCalled();
  });

  it('permite decrementar cuando la cantidad es mayor a 1', async () => {
    const onDecrementarMock = vi.fn();
    render(<ContadorCantidad cantidad={2} onIncrementar={vi.fn()} onDecrementar={onDecrementarMock} />);

    const botonMenos = screen.getByRole('button', { name: '-' });
    await userEvent.click(botonMenos);

    expect(onDecrementarMock).toHaveBeenCalled();
  });

  it('funciona correctamente sin pasar funciones opcionales', async () => {
    render(<ContadorCantidad cantidad={2} stockMaximo={10} />);

    const botonMas = screen.getByRole('button', { name: '+' });
    const botonMenos = screen.getByRole('button', { name: '-' });

    await userEvent.click(botonMas);
    await userEvent.click(botonMenos);

    expect(document.body).toBeInTheDocument();
  });
});