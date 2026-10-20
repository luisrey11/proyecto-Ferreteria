import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TablaInventario } from './TablaInventario';

describe('TablaInventario (Organismo)', () => {
  it('renderiza la tabla con los productos del inventario', () => {
    const productos = [{ id: 1, nombre: 'Martillo', precio: 5000, stock: 10 }];
    render(
      <table>
        <TablaInventario productos={productos} onEditar={() => {}} />
      </table>
    );
    expect(screen.getByText('Martillo')).toBeInTheDocument();
  });
});