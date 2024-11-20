// SesionUsuario.jsx
import React from 'react';
import "./SesionUsuario.css";

function SesionUsuario() {
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
        </form>
        <p className="login-footer">
          ¿No tienes una cuenta? <a href="/register" className="login-link">Regístrate</a>
        </p>
      </div>
    </div>
  );
}


export default SesionUsuario;
