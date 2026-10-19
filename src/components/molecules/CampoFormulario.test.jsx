// src/components/molecules/CampoFormulario.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CampoFormulario from './CampoFormulario';

describe('CampoFormulario (Molécula)', () => {
  it('permite escribir en el input', async () => {
    const onChangeMock = vi.fn();
    render(
      <CampoFormulario 
        label="Correo" 
        name="email" 
        value="" 
        onChange={onChangeMock} 
        error="" 
      />
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test@ferreteria.cl');

    expect(onChangeMock).toHaveBeenCalled();
  });
});