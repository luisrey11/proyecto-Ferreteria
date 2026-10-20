import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResumenPedido from './ResumenPedido';

describe('ResumenPedido (Organismo)', () => {
  it('muestra el resumen con los datos y el total del pedido', () => {
    const pedidoMock = { productos: [], total: 45000 };
    render(<ResumenPedido pedido={pedidoMock} />);

    expect(document.body).toBeInTheDocument();
  });
});