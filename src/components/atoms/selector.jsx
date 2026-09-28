import { useState } from 'react';
import Selector from './components/atoms/Selector';
import ContadorCantidad from './components/atoms/ContadorCantidad';

function App() {
  const [categoria, setCategoria] = useState('');
  const categoriasFerreteria = ['Herramientas', 'Pinturas', 'Plomería', 'Electricidad'];

  const handleAgregarAlCarrito = (cantidad) => {
    console.log(`Se agregaron ${cantidad} unidades al carrito`);
  };

  return (
    <div className="container mt-5">
      <h2>Prueba de Átomos</h2>
      
      {/* Usando el Selector */}
      <Selector 
        etiqueta="Categoría de productos:"
        opciones={categoriasFerreteria}
        valorSeleccionado={categoria}
        onChange={(val) => setCategoria(val)}
      />

      <ContadorCantidad stock={10} onAdd={handleAgregarAlCarrito} />
    </div>
  );
}

export default App;