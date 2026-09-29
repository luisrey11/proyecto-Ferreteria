import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Categorias } from './pages/Categorias';
import { DetalleProducto } from './pages/DetalleProducto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/categorias" element={<Categorias />} />

        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>
    </Router>
  );
}

export default App;