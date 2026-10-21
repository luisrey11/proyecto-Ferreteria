// src/pages/Catalogo.jsx
import React, { useState } from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useCarrito } from '../context/CarritoContext';

export const Catalogo = () => {
  const { agregarAlCarrito } = useCarrito();

  // Estado para la notificación flotante
  const [mensajeAlerta, setMensajeAlerta] = useState(null);

  // Lista de productos con imágenes y ofertas
  const productos = [
    {
      id: 1,
      nombre: 'Taladro Percutor 650W',
      descripcion: 'Ideal para trabajos pesados y hogar.',
      precio: 34990,
      precioOriginal: 45990,
      enOferta: true,
      imagen: 'https://media.falabella.com/sodimacCL/8739137_001/w=1500/h=1500/fit=cover'
    },
    {
      id: 2,
      nombre: 'Juego de llaves y destornilladores',
      descripcion: 'Maletín completo de 48 piezas.',
      precio: 21990,
      precioOriginal: 29990,
      enOferta: true,
      imagen: 'https://images.unsplash.com/photo-1581783342156-ed7b5b597c0f?w=500'
    },
    {
      id: 3,
      nombre: 'Martillo Profesional de Carpintero',
      descripcion: 'Mango ergonómico de alta resistencia.',
      precio: 9990,
      precioOriginal: 15990,
      enOferta: true,
      imagen: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500'
    },
    {
      id: 4,
      nombre: 'Esmeril Angular 4.5" 800W',
      descripcion: 'Potente motor para corte y desbaste.',
      precio: 29990,
      precioOriginal: 39990,
      enOferta: false,
      imagen: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500'
    },
    {
      id: 5,
      nombre: 'Saco de Cemento 25kg',
      descripcion: 'Alta resistencia para construcciones.',
      precio: 5990,
      precioOriginal: 7990,
      enOferta: false,
      imagen: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500'
    },
    {
      id: 6,
      nombre: 'Manguera Reforzada 1/2" 15m',
      descripcion: 'Resistente a la intemperie y alta presión.',
      precio: 12990,
      precioOriginal: 18990,
      enOferta: false,
      imagen: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=500'
    }
  ];

  // Función para agregar al carrito y mostrar notificación flotante
  const handleAgregar = (producto) => {
    if (agregarAlCarrito) {
      agregarAlCarrito(producto);
    }
    
    setMensajeAlerta(`¡"${producto.nombre}" se agregó al carrito!`);

    setTimeout(() => {
      setMensajeAlerta(null);
    }, 3000);
  };

  return (
    <PlantillaPublica>
      <div className="container my-5 position-relative" translate="no">
        
        {/* 🟢 ALERTA FLOTANTE (Sin ventanas emergentes alert) */}
        {mensajeAlerta && (
          <div 
            className="position-fixed top-0 end-0 p-3" 
            style={{ zIndex: 2000, marginTop: '80px' }}
          >
            <div className="toast show align-items-center text-white bg-success border-0 shadow-lg px-2 py-1" role="alert">
              <div className="d-flex align-items-center justify-content-between">
                <div className="toast-body fw-semibold">
                  🛒 {mensajeAlerta}
                </div>
                <button 
                  type="button" 
                  className="btn-close btn-close-white me-2" 
                  onClick={() => setMensajeAlerta(null)}
                ></button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">📦 Catálogo de Productos</h2>
          <p className="text-muted">Encuentra las mejores herramientas y materiales al mejor precio</p>
        </div>

        <div className="row g-4">
          {productos.map((producto) => (
            <div key={producto.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 position-relative p-3">
                
                {/* Etiqueta de oferta */}
                {producto.enOferta && (
                  <span className="badge bg-danger position-absolute top-0 start-0 m-3 fs-6">
                    ¡Oferta!
                  </span>
                )}

                {/* Imagen del producto */}
                <div className="text-center my-3" style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div className="card-body d-flex flex-column p-0">
                  <h5 className="card-title fw-bold text-dark">{producto.nombre}</h5>
                  <p className="card-text text-muted small flex-grow-1">{producto.descripcion}</p>
                  
                  <div className="my-3">
                    {producto.enOferta && (
                      <span className="text-decoration-line-through text-muted me-2 small">
                        ${producto.precioOriginal.toLocaleString('es-CL')}
                      </span>
                    )}
                    <span className="fs-4 fw-bold text-danger">
                      ${producto.precio.toLocaleString('es-CL')}
                    </span>
                  </div>

                  <button 
                    className="btn btn-primary w-100 fw-bold py-2 mt-auto"
                    onClick={() => handleAgregar(producto)}
                  >
                    Añadir al carrito
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </PlantillaPublica>
  );
};

export default Catalogo;