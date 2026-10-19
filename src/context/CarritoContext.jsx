// src/context/CarritoContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    const cantidadValida = nuevaCantidad < 1 ? 1 : nuevaCantidad;
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: cantidadValida } : item
      )
    );
  };

  const eliminarProducto = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const totalPedido = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, actualizarCantidad, eliminarProducto, totalPedido }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);