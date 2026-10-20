// src/pages/Catalogo.jsx
import React, { useState } from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import { useCarrito } from '../context/CarritoContext';
import { TarjetaProducto } from '../components/molecules/TarjetaProducto';

export const Catalogo = () => {
  const { agregarAlCarrito } = useCarrito();
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  // Inventario de productos asignados a sus categorías
  const productos = [
    {
      id: 1,
      nombre: 'Taladro Percutor 650W',
      descripcion: 'Ideal para trabajos pesados y hogar.',
      precioOriginal: 45990,
      precio: 34990,
      enOferta: true,
      categoria: 'Herramientas Eléctricas'
    },
    {
      id: 2,
      nombre: 'Juego de llaves y destornilladores',
      descripcion: 'Maletín completo de 48 piezas.',
      precioOriginal: 29990,
      precio: 21990,
      enOferta: true,
      categoria: 'Herramientas Manuales'
    },
    {
      id: 3,
      nombre: 'Martillo Profesional de Carpintero',
      descripcion: 'Mango ergonómico de alta resistencia.',
      precioOriginal: 15990,
      precio: 9990,
      enOferta: true,
      categoria: 'Herramientas Manuales'
    },
    {
      id: 4,
      nombre: 'Esmeril Angular 4.5" 800W',
      descripcion: 'Potente esmeril para corte y desbaste.',
      precio: 29990,
      enOferta: false,
      categoria: 'Herramientas Eléctricas'
    },
    {
      id: 5,
      nombre: 'Saco de Cemento 25kg',
      descripcion: 'Ideal para mezclas de alta resistencia y construcción.',
      precio: 5990,
      enOferta: false,
      categoria: 'Construcción'
    },
    {
      id: 6,
      nombre: 'Cortacésped Eléctrico 1200W',
      descripcion: 'Ligero y de fácil manejo para jardines medianos.',
      precio: 69990,
      enOferta: false,
      categoria: 'Jardinería'
    },
    {
      id: 7,
      nombre: 'Manguera Reforzada 1/2" 15m',
      descripcion: 'Resistente a la presión con conectores incluidos.',
      precio: 12990,
      enOferta: false,
      categoria: 'Jardinería'
    }
  ];

  // Lista única de categorías
  const categorias = ['Todas', 'Herramientas Eléctricas', 'Herramientas Manuales', 'Construcción', 'Jardinería'];

  // Filtrado de productos según la categoría seleccionada
  const productosFiltrados = categoriaActiva === 'Todas'
    ? productos
    : productos.filter((p) => p.categoria === categoriaActiva);

  return (
    <PlantillaPublica>
      <div className="container my-4" translate="no">
        <h2 className="mb-4 fw-bold text-secondary">Catálogo de Productos</h2>

        {/* --- BOTONES DE FILTRO DE CATEGORÍA --- */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn ${categoriaActiva === cat ? 'btn-primary' : 'btn-outline-primary'} btn-sm px-3 py-2 fw-semibold`}
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- GRILLA DE PRODUCTOS FILTRADOS --- */}
        <div className="row g-4">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div className="col-md-4" key={producto.id}>
                <TarjetaProducto 
                  producto={producto} 
                  onAgregar={() => {
                    agregarAlCarrito(producto);
                    alert(`¡"${producto.nombre}" agregado al carrito!`);
                  }} 
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">No se encontraron productos en la categoría <strong>"{categoriaActiva}"</strong>.</p>
            </div>
          )}
        </div>
      </div>
    </PlantillaPublica>
  );
};

export default Catalogo;