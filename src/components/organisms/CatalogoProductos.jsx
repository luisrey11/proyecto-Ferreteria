import React from 'react';
import { useCarrito } from '../../context/CarritoContext';
import { TarjetaProducto } from '../molecules/TarjetaProducto';

export const CatalogoProductos = ({ productos }) => {
  const { agregarAlCarrito } = useCarrito();

  // 🛠️ Productos de respaldo por si el componente padre no los pasa
  const productosPorDefecto = [
    { id: 1, nombre: 'Taladro Percutor Profesional', precio: 34990, stock: 5 },
    { id: 2, nombre: 'Llave Inglesa Ajustable', precio: 8990, stock: 12 },
    { id: 3, nombre: 'Set de Brocas para Concreto', precio: 14990, stock: 8 }
  ];

  const listaFinal = productos && productos.length > 0 ? productos : productosPorDefecto;

  return (
    <div className="container my-4">
      <h3 className="mb-4 fw-bold">Catálogo de Herramientas</h3>
      <div className="row">
        {listaFinal.map((producto) => (
          <div className="col-md-4 mb-3" key={producto.id || producto.nombre}>
            <TarjetaProducto 
              producto={producto} 
              onAgregar={() => {
                agregarAlCarrito(producto);
                alert(`¡"${producto.nombre}" se añadió al carrito!`); // Alerta visual temporal para confirmar el clic
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogoProductos;