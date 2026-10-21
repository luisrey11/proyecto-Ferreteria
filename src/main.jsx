// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 👈 Importante para que funcionen los menús desplegables (dropdowns) de Bootstrap
import './index.css';
import App from './App.jsx';

// Importamos los contextos para la sesión y el carrito
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>,
);