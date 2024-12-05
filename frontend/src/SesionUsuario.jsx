// SesionUsuario.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SesionUsuario.css";
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios'; // Asegúrate de instalar axios

const SesionUsuario = () => {
  const navigate = useNavigate();

  // Estados para manejar las credenciales del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Manejar cambios en los inputs
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  const handleLoginClick = async (e) => {
    e.preventDefault();
  
    // Validaciones básicas
    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      // Enviar solicitud GET a la API y obtener todos los usuarios
      const response = await axios.get('http://127.0.0.1:8000/api/usuarios/');
      
      // Buscar coincidencia en la lista de usuarios
      const usuario = response.data.find(
        (user) => user.email === email && user.password === password
      );
  
      if (usuario) {
        // Guardar el username en el localStorage
        localStorage.setItem('username', usuario.username); // Guardar username
        navigate('/');
      } else {
        alert("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.");
    }
  };
  
  

  
  

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/registro');
  };

  return (
    <div className='cuerpo'>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Iniciar Sesión</h1>
          <form>
            <label htmlFor="email" className="login-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="Ingrese su correo"
              value={email}
              onChange={handleEmailChange}
            />

            <label htmlFor="password" className="login-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={handlePasswordChange}
            />

            <button type="submit" className="login-button" onClick={handleLoginClick}>
              Ingresar
            </button>
          </form>
          <p className="login-footer">
            ¿No tienes una cuenta? <a href="/registro" className="login-link" onClick={handleRegisterClick}>Regístrate</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SesionUsuario;

