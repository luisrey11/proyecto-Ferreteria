import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Precio } from './Precio';

describe('Precio (Átomo)', () => {
  it('muestra el valor formateado', () => {
    render(<Precio valor={45000} />);
    expect(screen.getByText(/45\.000|45000/)).toBeInTheDocument();
  });
});