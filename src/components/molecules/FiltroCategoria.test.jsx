import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FiltroCategoria from './FiltroCategoria';

describe('FiltroCategoria (Molécula)', () => {
  it('permite seleccionar una categoría de herramientas', async () => {
    const onChangeMock = vi.fn();
    const categoriasMock = ['Herramientas manuales', 'Eléctricas'];

    render(<FiltroCategoria categorias={categoriasMock} onChange={onChangeMock} />);

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'Eléctricas');

    expect(onChangeMock).toHaveBeenCalled();
  });
});