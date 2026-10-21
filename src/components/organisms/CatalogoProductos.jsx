// src/components/organisms/CatalogoProductos.jsx
import React, { useState } from 'react';
import { useCarrito } from '../../context/CarritoContext';
import { TarjetaProducto } from '../molecules/TarjetaProducto';

export const CatalogoProductos = ({ productos }) => {
  const { agregarAlCarrito } = useCarrito();

  // Estado para la alerta flotante moderna
  const [mensajeAlerta, setMensajeAlerta] = useState(null);

  // 🛠️ Productos de respaldo con sus respectivas imágenes
  const productosPorDefecto = [
    { 
      id: 1, 
      nombre: 'Taladro Percutor Profesional', 
      descripcion: 'Potente motor para perforación y trabajos pesados.',
      precio: 34990, 
      stock: 5,
      imagen: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80' 
    },
    { 
      id: 2, 
      nombre: 'Llave Inglesa Ajustable', 
      descripcion: 'Herramienta de acero de alta resistencia.',
      precio: 8990, 
      stock: 12,
      imagen: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80' 
    },
    { 
      id: 3, 
      nombre: 'Set de Brocas para Concreto', 
      descripcion: 'Variedad de medidas para diferentes superficies.',
      precio: 14990, 
      stock: 8,
      imagen: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=80' 
    }
  ];

  const listaFinal = productos && productos.length > 0 ? productos : productosPorDefecto;

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
    setMensajeAlerta(`¡"${producto.nombre}" se añadió al carrito!`);

    setTimeout(() => {
      setMensajeAlerta(null);
    }, 3000);
  };

  return (
    <div className="container my-4 position-relative">
      
      {/* 🟢 ALERTA FLOTANTE (Toast) */}
      {mensajeAlerta && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000, marginTop: '70px' }}>
          <div className="toast show align-items-center text-white bg-success border-0 shadow-lg" role="alert">
            <div className="d-flex">
              <div className="toast-body fw-semibold">
                🛒 {mensajeAlerta}
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white me-2 m-auto" 
                onClick={() => setMensajeAlerta(null)}
              ></button>
            </div>
          </div>
        </div>
      )}

      <h3 className="mb-4 fw-bold">Catálogo de Productos</h3>
      
      <div className="row">
        {listaFinal.map((producto) => (
          <div className="col-md-4 mb-3" key={producto.id || producto.nombre}>
            <TarjetaProducto 
              producto={producto} 
              onAgregar={() => handleAgregar(producto)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogoProductos;