import React from "react";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { Precio } from "../components/atoms/Precio";

export const Ofertas = () => {
    const productosOferta = [
    { id: 101, nombre: 'Taladro Percutor Oferta', precio: 29990, precioAnterior: 39990, stock: 8, descripcion: '¡Descuento especial por tiempo limitado en herramientas eléctricas!' },
    { id: 102, nombre: 'Set de Brocas x10 Profesional', precio: 6990, precioAnterior: 9990, stock: 15, descripcion: 'Kit completo para concreto, metal y madera.' },
    { id: 103, nombre: 'Carretilla de Carga 50L', precio: 24990, precioAnterior: 32990, stock: 4, descripcion: 'Alta resistencia para trabajos de construcción pesados.' }
  ];

  return (<PlantillaPublica>
      <div className="container my-4">
        {/* Banner de ofertas */}
        <div className="alert alert-danger text-center py-4 shadow-sm" role="alert">
          <h2 className="fw-bold mb-1"> ¡Súper Ofertas de la Semana! </h2>)
    
}