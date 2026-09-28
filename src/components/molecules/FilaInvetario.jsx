import React from 'react';
import { EtiquetaStock } from '../atoms/EtiquetaStock';
import { Boton } from '../atoms/Boton';

export const FilaInventario = ({ producto, onEditar }) => {
  return (
    <tr>
      <td>{producto.id}</td>
      <td>{producto.nombre}</td>
      <td>${producto.precio}</td>
      <td><EtiquetaStock stock={producto.stock} /></td>
      <td>
        <Boton 
          texto="Editar" 
          variante="warning" 
          onClick={() => onEditar(producto.id)} 
        />
      </td>
    </tr>
  );
};
export default FilaInventario;