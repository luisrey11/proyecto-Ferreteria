import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FormularioLogin from '../components/organisms/FormularioLogin';

const Login = () => {
  return (
    <div className="body-login d-flex align-items-center min-vh-100">
      <Container className="login-wrapper">
        <Row className="justify-content-center align-items-center">
          
          {/* Columna izquierda con la tarjeta de login */}
          <Col xs={12} md={6} lg={5} className="login-left-column mb-4 mb-md-0">
            <Card className="login-card p-4 shadow-sm border-0">
              <div className="mb-4">
                <h1 className="h3 mb-2">Iniciar sesión</h1>
                <span className="logo-texto">Ferretería <strong>Los Maestros</strong></span>
              </div>

              {/* Renderizamos el organismo */}
              <FormularioLogin />
            </Card>

            {/* Franja inferior */}
            <div className="login-footer-strip text-center mt-3">
              <a href="#" className="text-decoration-none">🔍 Opciones de inicio de sesión</a>
            </div>
          </Col>

          {/* Columna derecha informativa */}
          <Col xs={12} md={6} lg={5} className="login-info p-4">
            <span className="badge-recuerda badge bg-warning text-dark mb-2">¿Sabías que?</span>
            <h2 className="h4 mb-3">Gestión eficiente para tu negocio</h2>
            <p className="text-muted">
              Accede al sistema para controlar el stock de tu ferretería, revisar cuentas corrientes y coordinar tus operaciones diarias de manera rápida y segura.
            </p>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Login;