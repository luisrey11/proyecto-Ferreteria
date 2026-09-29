import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { EtiquetaStock } from '../components/atoms/EtiquetaStock';
import { Precio } from '../components/atoms/Precio';
import ContadorCantidad from '../components/atoms/ContadorCantidad';
import { Boton } from '../components/atoms/Boton';

export const DetalleProducto = () =>{
    const {id} = useParams();

   const producto = {
    id: id || 1,
    nombre: 'Taladro Percutor Profesional',
    precio: 34990,
    stock: 5,
    descripcion: 'Taladro percutor de alta potencia con velocidad variable, mango ergonómico y maletín de transporte incluido. Ideal for trabajos exigentes de construcción y hogar.'
  };

  const handleAgregarAlCarrito = (cantidad) => {
    alert(`Se agregaron ${cantidad} unidad(es) de "${producto.nombre}" al carrito.`);
  };

  return (
    <PlantillaPublica>
      <div className="container my-5">
        <div className="row g-5 align-items-center">
          
          {/* Columna de Imagen */}
          <div className="col-md-6">
            <div className="bg-light border rounded-3 p-5 text-center d-flex align-items-center justify-content-center" style={{ minHeight: '350px' }}>
              <span className="text-muted fs-5">[ {/*Imagen del Producto*/} ]</span>
            </div>
          </div>

          {/* Columna de Información y Acciones */}
          <div className="col-md-6">
            <h2 className="fw-bold text-dark mb-3">{producto.nombre}</h2>
            
            <div className="mb-3">
              <Precio valor={producto.precio} />
            </div>

            <div className="mb-3">
              <EtiquetaStock stock={producto.stock} />
            </div>

            <p className="text-muted mb-4">{producto.descripcion}</p>

            <hr className="mb-4" />

        
            {producto.stock > 0 ? (
              <div className="d-flex flex-column gap-3">
                <label className="fw-semibold text-secondary">Cantidad a llevar:</label>
                <div style={{ maxWidth: '200px' }}>
                  <ContadorCantidad stock={producto.stock} onAdd={handleAgregarAlCarrito} />
                </div>
              </div>
            ) : (
              <div className="alert alert-danger" role="alert">
                Este producto se encuentra agotado temporalmente.
              </div>
            )}
          </div>

        </div>
      </div>
    </PlantillaPublica>
  );
};

export default DetalleProducto;