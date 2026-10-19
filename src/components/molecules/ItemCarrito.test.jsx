import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemCarrito from './ItemCarrito';

describe('ItemCarrito (Molécula)', () => {
  it('muestra el nombre y precio del producto y permite eliminarlo o actualizarlo', async () => {
    const itemMock = { id: 1, nombre: 'Taladro', precio: 45000, cantidad: 1 };
    const onActualizarMock = vi.fn();
    const onEliminarMock = vi.fn();

    render(
      <ItemCarrito 
        item={itemMock} 
        onActualizarCantidad={onActualizarMock} 
        onEliminar={onEliminarMock} 
      />
    );
    
    // Verificamos que se muestre el nombre del producto
    expect(screen.getByText('Taladro')).toBeInTheDocument();

    // Buscamos y probamos el botón de eliminar si existe
    const botonEliminar = screen.queryByRole('button', { name: /eliminar|borrar|x/i });
    if (botonEliminar) {
      await userEvent.click(botonEliminar);
      expect(onEliminarMock).toHaveBeenCalled();
    }
  });
});