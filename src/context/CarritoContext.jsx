import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: Number(item.cantidad) + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    // Convertimos siempre a número entero válido
    const num = parseInt(nuevaCantidad, 10);
    const cantidadValida = isNaN(num) || num < 1 ? 1 : num;

    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad: cantidadValida } : item
      )
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // Recalculamos el total convirtiendo siempre a número
  const totalPedido = carrito.reduce((acc, item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.cantidad) || 0;
    return acc + precio * cantidad;
  }, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarProducto,
        totalPedido,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);