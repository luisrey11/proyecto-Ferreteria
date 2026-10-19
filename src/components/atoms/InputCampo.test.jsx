import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import InputCampo from './InputCampo';

describe('InputCampo (Átomo)', () => {
  it('se renderiza correctamente', () => {
    render(<InputCampo value="" onChange={() => {}} />);
    expect(document.body).toBeInTheDocument();
  });
});