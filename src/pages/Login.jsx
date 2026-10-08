import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormularioLogin } from '../components/organisms/FormularioLogin';
import PlantillaPublica from '../components/templates/PlantillaPublica';

export const Login = () => {
  const navigate = useNavigate();

  const manejarExitoLogin = (datosValidados) => {
    console.log("Datos enviados al backend/página:", datosValidados);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <PlantillaPublica>
      <div className="container my-5" style={{ maxWidth: '450px' }}>
        <FormularioLogin onSubmitExitoso={manejarExitoLogin} />
      </div>
    </PlantillaPublica>
  );
};

export default Login;