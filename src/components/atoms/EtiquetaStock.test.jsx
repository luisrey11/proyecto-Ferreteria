import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EtiquetaStock } from './EtiquetaStock';

describe('EtiquetaStock (Átomo)', () => {
  it('muestra stock disponible cuando hay unidades', () => {
    render(<EtiquetaStock stock={10} />);
    expect(screen.getByText(/10|disponible/i)).toBeInTheDocument();
  });

  it('muestra agotado cuando el stock es 0', () => {
    render(<EtiquetaStock stock={0} />);
    expect(screen.getByText(/agotado|sin stock/i)).toBeInTheDocument();
  });
});