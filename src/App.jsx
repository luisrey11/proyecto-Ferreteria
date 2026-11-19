// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Ofertas } from './pages/Ofertas';
import { Categorias } from './pages/Categorias';
import { DetalleProducto } from './pages/DetalleProducto';
import { Login } from './pages/Login';
import CarritoPage from './pages/Carrito';
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import { Stock } from './pages/Stock';
import ProductosPage from './pages/ProductosPage';
import PedidosPage from './pages/PedidosPage';

function RutaProtegida({ children, rolesPermitidos }) {
  const token = localStorage.getItem('token');
  const rol = (localStorage.getItem('rol') || '').toUpperCase();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
    return <Navigate to="/catalogo" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/login" element={<Login />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route
              path="/pedidos"
              element={
                <RutaProtegida>
                  <PedidosPage />
                </RutaProtegida>
              }
            />
            <Route
              path="/stock"
              element={
                <RutaProtegida rolesPermitidos={['ADMIN', 'VENDEDOR']}>
                  <Stock />
                </RutaProtegida>
              }
            />
            <Route
              path="/pageProducto"
              element={
                <RutaProtegida rolesPermitidos={['ADMIN', 'VENDEDOR']}>
                  <ProductosPage />
                </RutaProtegida>
              }
            />
          </Routes>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;