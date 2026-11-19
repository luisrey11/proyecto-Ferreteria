import { useState } from 'react';
import Selector from './components/atoms/Selector';
import ContadorCantidad from './components/atoms/ContadorCantidad';

function App(props) {
  const categoriasIniciales = props.categorias ?? [
    'Herramientas',
    'Pinturas',
    'Plomería',
    'Electricidad',
  ];
  const stockInicial = props.stockInicial ?? 10;

  const [categoria, setCategoria] = useState('');

  const handleAgregarAlCarrito = (cantidad) => {
    console.log(`Se agregaron ${cantidad} unidades al carrito`);
  };

  return (
    <div className="container mt-5">
      <h2>Prueba de Átomos</h2>

      {/* Usando el Selector */}
      <Selector
        etiqueta="Categoría de productos:"
        opciones={categoriasIniciales}
        valorSeleccionado={categoria}
        onChange={(val) => setCategoria(val)}
      />

      {/* Usando el ContadorCantidad */}
      <ContadorCantidad stock={stockInicial} onAdd={handleAgregarAlCarrito} />
    </div>
  );
}

export default App;