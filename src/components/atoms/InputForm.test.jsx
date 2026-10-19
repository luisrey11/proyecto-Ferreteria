import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputForm } from './InputForm';

describe('InputForm (Átomo)', () => {
  it('permite escribir valores y dispara el evento onChange', async () => {
    const onChangeMock = vi.fn();
    render(<InputForm name="codigo" value="" onChange={onChangeMock} placeholder="Ingrese código" />);

    const input = screen.getByPlaceholderText('Ingrese código');
    await userEvent.type(input, 'FER-123');

    expect(onChangeMock).toHaveBeenCalled();
  });
});