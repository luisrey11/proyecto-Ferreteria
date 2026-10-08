import React, { useState } from 'react';
import { InputForm } from '../atoms/InputForm';
import { validarEmail, validarPassword } from '../../utils/validaciones';

export const FormularioLogin = ({ onSubmitExitoso }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [errores, setErrores] = useState({
    email: '',
    password: ''
  });

  const [exitoMensaje, setExitoMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });

    if (name === 'email') {
      setErrores(prev => ({ ...prev, email: validarEmail(value) }));
    }
    if (name === 'password') {
      setErrores(prev => ({ ...prev, password: validarPassword(value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorEmail = validarEmail(form.email);
    const errorPassword = validarPassword(form.password);

    setErrores({
      email: errorEmail,
      password: errorPassword
    });

    if (!errorEmail && !errorPassword) {
      setExitoMensaje('¡Inicio de sesión exitoso!');
      onSubmitExitoso(form);
    } else {
      setExitoMensaje('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-sm" noValidate>
      <h3 className="mb-3 text-center fw-bold text-dark">Iniciar Sesión</h3>

      {exitoMensaje && (
        <div className="alert alert-success text-center" role="alert">
          {exitoMensaje}
        </div>
      )}

      <InputForm
        label="Correo Electrónico"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="correo@ejemplo.com"
        error={errores.email}
      />

      <InputForm
        label="Contraseña"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="********"
        error={errores.password}
      />

      <button type="submit" className="btn btn-primary w-100 mt-2 py-2 fw-semibold">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default FormularioLogin;