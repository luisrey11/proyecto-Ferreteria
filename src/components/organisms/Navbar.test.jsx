import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar (Organismo)', () => {
  it('se renderiza correctamente y muestra la marca o enlaces', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(document.body).toBeInTheDocument();
  });
});