// src/components/templates/PlantillaPublica.jsx
import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import { AuthProvider } from '../../context/AuthContext';
import { CarritoProvider } from '../../context/CarritoContext'; // 👈 Importamos el CarritoProvider

export const PlantillaPublica = ({ children }) => {
  return (
    <AuthProvider>
      <CarritoProvider> {/* 👈 Añadimos el CarritoProvider aquí */}
        <div className="d-flex flex-column min-vh-100" translate="no">
          <Navbar />
          <main className="flex-fill container-fluid my-4">
            {children}
          </main>
          <Footer />
        </div>
      </CarritoProvider>
    </AuthProvider>
  );
};

export default PlantillaPublica;