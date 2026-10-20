import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlantillaPublica from './PlantillaPublica'; // Asegúrate de que coincida con su export

describe('PlantillaPublica (Template)', () => {
  it('renderiza correctamente el contenido y la estructura principal', () => {
    render(
      <MemoryRouter>
        <PlantillaPublica>
          <div data-testid="contenido-hijo">Contenido de prueba</div>
        </PlantillaPublica>
      </MemoryRouter>
    );

    const contenido = screen.getByTestId('contenido-hijo');
    expect(contenido).toBeInTheDocument();
    expect(contenido).toHaveTextContent('Contenido de prueba');
  });
});