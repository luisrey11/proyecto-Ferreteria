import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

export const PlantillaPublica = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill container-fluid my-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PlantillaPublica;