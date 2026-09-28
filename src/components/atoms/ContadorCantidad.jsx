import { useState } from 'react';

const ContadorCantidad = ({ stock, initial = 1, onAdd }) => {
  const [cantidad, setCantidad] = useState(initial);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={decrementar}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
        >
          -
        </button>
        <span className="text-xl font-semibold">{cantidad}</span>
        <button 
          onClick={incrementar}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
        >
          +
        </button>
      </div>

      <button 
        onClick={() => onAdd(cantidad)}
        disabled={stock === 0}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ContadorCantidad;