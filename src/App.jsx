// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Ofertas } from './pages/Ofertas';
import { Categorias } from './pages/Categorias';
import { DetalleProducto } from './pages/DetalleProducto';
import { Login } from './pages/Login';
import CarritoPage from './pages/Carrito';
import { CarritoProvider } from './context/CarritoContext';
import { Stock } from './pages/Stock';

function App() {
  return (
    <CarritoProvider> {/* 👈 El Provider envuelve todo incluyendo el Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/login" element={<Login />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;