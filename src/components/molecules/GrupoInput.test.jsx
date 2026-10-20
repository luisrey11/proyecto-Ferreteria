import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GrupoInput from './GrupoInput';

describe('GrupoInput (Molécula)', () => {
  it('renderiza la etiqueta y permite escribir en el input', async () => {
    const onChangeMock = vi.fn();
    render(<GrupoInput label="Nombre del producto" value="" onChange={onChangeMock} />);

    expect(screen.getByText('Nombre del producto')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Martillo');

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('muestra el texto de error cuando se le pasa la prop errorText (cubre línea 19)', () => {
    render(
      <GrupoInput 
        label="Correo" 
        value="" 
        onChange={vi.fn()} 
        errorText="El correo es inválido" 
        errorId="error-correo"
      />
    );

    // Verifica que el mensaje de error aparezca en el documento
    const mensajeError = screen.getByText('El correo es inválido');
    expect(mensajeError).toBeInTheDocument();
    expect(mensajeError).toHaveStyle({ display: 'block' });
  });
});