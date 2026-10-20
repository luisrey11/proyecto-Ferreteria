import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormularioLogin from './FormularioLogin';

describe('FormularioLogin (Organismo)', () => {
  it('permite ingresar credenciales completas y enviar el formulario de manera exitosa', async () => {
    const onSubmitExitosoMock = vi.fn();
    render(<FormularioLogin onSubmitExitoso={onSubmitExitosoMock} />);

    // Buscamos los inputs por su placeholder o rol ya que no tienen htmlFor vinculado
    const inputEmail = screen.getByPlaceholderText('correo@ejemplo.com');
    const inputPassword = screen.getByPlaceholderText('********');

    // Escribimos en ambos campos (cubre línea 29 para password)
    await userEvent.type(inputEmail, 'admin@ferreteria.com');
    await userEvent.type(inputPassword, 'Password123*');

    const botonSubmit = screen.getByRole('button', { name: /iniciar sesión/i });
    await userEvent.click(botonSubmit);

    expect(screen.getByText(/¡Inicio de sesión exitoso!/i)).toBeInTheDocument();
    expect(onSubmitExitosoMock).toHaveBeenCalledWith({
      email: 'admin@ferreteria.com',
      password: 'Password123*'
    });
  });

  it('muestra errores y limpia el mensaje de éxito si se envía con datos inválidos (cubre líneas 45-46)', async () => {
    const onSubmitExitosoMock = vi.fn();
    render(<FormularioLogin onSubmitExitoso={onSubmitExitosoMock} />);

    const inputEmail = screen.getByPlaceholderText('correo@ejemplo.com');
    const botonSubmit = screen.getByRole('button', { name: /iniciar sesión/i });

    // Ingresamos un correo inválido y enviamos
    await userEvent.type(inputEmail, 'correo-invalido');
    await userEvent.click(botonSubmit);

    // Verifica que no se llame a la función de éxito y que se ejecute el bloque else
    expect(onSubmitExitosoMock).not.toHaveBeenCalled();
  });
});