import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Boton } from './Boton'; // Usar llaves si es export nombrado

describe('Boton (Átomo)', () => {
  it('renderiza el texto correctamente y responde al clic', async () => {
    const onClickMock = vi.fn();
    render(<Boton onClick={onClickMock}>Comprar</Boton>);

    const boton = screen.getByRole('button');
    expect(boton).toBeInTheDocument();

    await userEvent.click(boton);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});