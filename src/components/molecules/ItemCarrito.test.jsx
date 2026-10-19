// src/components/molecules/ItemCarrito.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemCarrito from './ItemCarrito';

describe('ItemCarrito (Molécula)', () => {
  it('muestra el nombre y precio del producto en el carrito', () => {
    const itemMock = { id: 1, nombre: 'Taladro', precio: 45000, cantidad: 1 };
    render(<ItemCarrito item={itemMock} onActualizarCantidad={() => {}} onEliminar={() => {}} />);
    
    expect(screen.getByText('Taladro')).toBeInTheDocument();
  });
});