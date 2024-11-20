// SesionUsuario.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SesionUsuario.css";

const SesionUsuario = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/registro');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar Sesión</h1>
        <form>
          <label htmlFor="email" className="login-label">Correo Electrónico</label>
          <input type="email" id="email" className="login-input" placeholder="Ingrese su correo" />

          <label htmlFor="password" className="login-label">Contraseña</label>
          <input type="password" id="password" className="login-input" placeholder="Ingrese su contraseña" />

          <button type="submit" className="login-button">Ingresar</button>
          <button type="button" className="login-button" onClick={handleBackClick}>Regresar</button>
        </form>
        <p className="login-footer">
          ¿No tienes una cuenta? <a href="/registro" className="login-link" onClick={handleRegisterClick}>Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default SesionUsuario;
