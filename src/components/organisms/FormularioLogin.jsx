import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import GrupoInput from '../molecules/GrupoInput';
import Boton from '../atoms/Boton';

const FormularioLogin = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario de inicio de sesión
  };

  return (
    <Form id="form-login" onSubmit={handleSubmit} noValidate>
      <fieldset className="border-0 p-0 m-0">
        <legend className="visually-hidden">Datos de acceso</legend>

        <GrupoInput
          id="correo"
          label="Correo electrónico, teléfono o usuario"
          type="text"
          name="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          autoComplete="off"
          errorId="error-correo"
        />

        <GrupoInput
          id="password"
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorId="error-password"
        />

        <div className="recuperar-link mb-3">
          <a href="#">¿No puede acceder a su cuenta?</a>
        </div>

        <Boton type="submit">Siguiente</Boton>
      </fieldset>
    </Form>
  );
};

export default FormularioLogin;