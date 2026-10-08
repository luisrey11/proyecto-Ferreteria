import React from 'react';
import { Link } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Inicio = () => {
  return (
    <PlantillaPublica>
      <div className="container my-5">
        <div className="p-4 p-md-5 mb-4 bg-light rounded-3 text-center shadow-sm">
          <div className="container-fluid py-2">
            <h1 className="display-5 fw-bold text-dark mb-3">Bienvenido a Ferretería Los Maestros</h1>
            <p className="col-md-8 fs-4 mx-auto text-muted mb-4">
              Encuentra las mejores herramientas, materiales y accesorios para tus proyectos de construcción y hogar.
            </p>
            
            {/* --- SECCIÓN DE PRODUCTOS EN OFERTA --- */}
            <div className="mb-5 border-top border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                <h3 className="fw-bold text-dark m-0">🔥 Ofertas Destacadas</h3>
                <Link to="/ofertas" className="text-decoration-none fw-semibold text-primary">
                  Ver todas &rarr;
                </Link>
              </div>

              <div className="row g-3">
                
                {/* Producto 1: Taladro Percutor */}
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0">
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2 p-2">¡Oferta!</span>
                    <img 
                      src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80" 
                      alt="Taladro Percutor" 
                      className="card-img-top"
                      style={{ height: '140px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-start p-3">
                      <h6 className="card-title fw-bold text-dark mb-1">Taladro Percutor 650W</h6>
                      <p className="text-muted small mb-2">Ideal para trabajos pesados y hogar.</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted text-decoration-line-through small me-2">$45.990</span>
                          <span className="fw-bold text-danger fs-5">$34.990</span>
                        </div>
                        <Link to="/catalogo" className="btn btn-sm btn-primary">Añadir al carrito</Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Producto 2: Set de Herramientas */}
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0">
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2 p-2">¡Oferta!</span>
                    <img 
                      src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=400&q=80" 
                      alt="Set de Herramientas Manuales" 
                      className="card-img-top"
                      style={{ height: '140px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-start p-3">
                      <h6 className="card-title fw-bold text-dark mb-1">Set de Llaves y Destornilladores</h6>
                      <p className="text-muted small mb-2">Maletín completo de 48 piezas.</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted text-decoration-line-through small me-2">$29.990</span>
                          <span className="fw-bold text-danger fs-5">$21.990</span>
                        </div>
                        <Link to="/catalogo" className="btn btn-sm btn-primary">Añadir al carrito</Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Producto 3: Martillo Profesional (Cambiado) */}
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0">
                    <span className="badge bg-danger position-absolute top-0 start-0 m-2 p-2">¡Oferta!</span>
                    <img 
                      src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=400&q=80" 
                      alt="Martillo Profesional" 
                      className="card-img-top"
                      style={{ height: '140px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-start p-3">
                      <h6 className="card-title fw-bold text-dark mb-1">Martillo Profesional de Carpintero</h6>
                      <p className="text-muted small mb-2">Mango ergonómico de alta resistencia.</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted text-decoration-line-through small me-2">$15.990</span>
                          <span className="fw-bold text-danger fs-5">$9.990</span>
                        </div>
                        <Link to="/catalogo" className="btn btn-sm btn-primary">Añadir al carrito</Link>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* --- FIN SECCIÓN DE OFERTAS --- */}

            {/* Contenedor de las tarjetas principales (Catálogo y Stock) */}
            <div className="row justify-content-center g-4 mt-2">
              
              {/* Tarjeta para Ver Catálogo */}
              <div className="col-md-4">
                <Link to="/catalogo" className="text-decoration-none">
                  <div className="card shadow-sm border-0 h-100 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" 
                      alt="Catálogo de Herramientas" 
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body bg-primary text-white py-3">
                      <h5 className="card-title fw-bold m-0">Ver Catálogo</h5>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Tarjeta para Ver Stock */}
              <div className="col-md-4">
                <Link to="/stock" className="text-decoration-none">
                  <div className="card shadow-sm border-0 h-100 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=600&q=80" 
                      alt="Control de Stock" 
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body bg-success text-white py-3">
                      <h5 className="card-title fw-bold m-0">Ver Stock</h5>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

            {/* Fila inferior para el botón de Ver Categorías más pequeño */}
            <div className="row justify-content-center mt-4">
              <div className="col-md-4">
                <Link to="/categorias" className="btn btn-outline-secondary btn-sm w-100 py-2">
                  Ver Categorías
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PlantillaPublica>
  );
};

export default Inicio;