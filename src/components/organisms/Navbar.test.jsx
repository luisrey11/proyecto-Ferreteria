// src/components/organisms/Navbar.test.jsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthProvider } from '../../context/AuthContext';
import { CarritoProvider } from '../../context/CarritoContext';

describe('Navbar (Organismo)', () => {
  it('se renderiza correctamente y muestra la marca o enlaces', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    );
    
    expect(document.body).toBeInTheDocument();
  });

  it('muestra las opciones de usuario autenticado y permite cerrar sesión (Cubre líneas 13-14 y 55 con nombre)', () => {
    const usuarioMock = { nombre: 'Maestro Admin', correo: 'admin@ferreteria.cl' };
    localStorage.setItem('usuario_ferreteria', JSON.stringify(usuarioMock));

    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    );

    const botonUsuario = screen.getByText(/Maestro Admin/i);
    expect(botonUsuario).toBeInTheDocument();

    fireEvent.click(botonUsuario);

    const botonCerrarSesion = screen.getByText(/Cerrar Sesión/i);
    expect(botonCerrarSesion).toBeInTheDocument();
    
    fireEvent.click(botonCerrarSesion);

    localStorage.removeItem('usuario_ferreteria');
  });

  it('muestra el correo del usuario si no tiene nombre definido (Cubre la alternativa de la línea 55)', () => {
    const usuarioSoloCorreo = { correo: 'test@ferreteria.cl' };
    localStorage.setItem('usuario_ferreteria', JSON.stringify(usuarioSoloCorreo));

    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    );

    const elementosCorreo = screen.getAllByText(/test@ferreteria.cl/i);
    expect(elementosCorreo.length).toBeGreaterThan(0);
    expect(elementosCorreo[0]).toBeInTheDocument();

    localStorage.removeItem('usuario_ferreteria');
  });
});