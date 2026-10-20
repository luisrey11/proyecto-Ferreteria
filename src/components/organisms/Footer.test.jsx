import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer (Organismo)', () => {
  it('se renderiza correctamente al pie de página', () => {
    render(<Footer />);
    expect(document.body).toBeInTheDocument();
  });
});