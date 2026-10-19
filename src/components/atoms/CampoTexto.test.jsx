import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CampoTexto } from './CampoTexto'; // 👈 Con llaves

describe('CampoTexto (Átomo)', () => {
  it('renderiza correctamente el texto recibido', () => {
    render(<CampoTexto />);
    expect(document.body).toBeInTheDocument();
  });
});