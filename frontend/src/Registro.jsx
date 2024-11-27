import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SesionUsuario.css";
import Navbar from './Navbar'; // Aquí se importa el Navbar

const RegistroUsuario = () => {
  const navigate = useNavigate();

  // Estados para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    email: '',
    direccion: '',
    fechanacimiento: '',
    password: '',
    confirmPassword: '',
    telefono: ''
  });

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Manejar el envío del formulario
  const handleRegisterClick = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword 
      || !formData.apellido || !formData.usuario || !formData.telefono || !formData.direccion 
      || !formData.fechanacimiento) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Aquí podrías realizar una llamada al backend para registrar al usuario
    console.log("Usuario registrado:", formData);

    // Redirigir al inicio de sesión
    navigate('/');
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className='cuerpo'>

      <Navbar /> {/* Aquí debe aparecer el Navbar */}

      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Registro de Usuario</h1>
          <form>
            <label htmlFor="nombre" className="login-label">Nombre</label>
            <input
              type="text"
              id="nombre"
              className="login-input"
              placeholder="Ingrese su nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />

            <label htmlFor="apellido" className='login-label'>Apellido</label>
            <input 
            type="text"
            id='apellido'
            className='login-input'
            placeholder='Ingrese su apellido'
            value={formData.apellido}
            onChange={handleInputChange}
             />

            <label htmlFor="email" className="login-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="Ingrese su correo"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="usuario" className='login-label'>Nombre del usuario</label>
            <input
            type='text'
            id='usuario'
            className='login-input'
            placeholder='Ingrese su usuario'
            value={formData.usuario}
            onChange={handleInputChange}
            />

            <label htmlFor="telefono" className='login-label'>Telefono</label>
            <input
            type='tel'
            id='telefono'
            className='login-input'
            placeholder='Ingrese su numero de telefono'
            value={formData.telefono}
            onChange={handleInputChange}
            />
            <label htmlFor="direccion" className='login-label'>Direccion</label>
            <input
            type='text'
            id='direccion'
            className='login-input'
            placeholder='Ingrese su direccion: estado, municipio, parroquia'
            value={formData.direccion}
            onChange={handleInputChange}
            />

            <label htmlFor="fechanacimiento" className='login-label'>Fecha de nacimiento</label>
            <input
            type='date'
            id='fechanacimiento'
            className='login-input'
            placeholder='Ingrese su fecha de nacimiento'
            value={formData.fechanacimiento}
            onChange={handleInputChange}
            />

            <label htmlFor="password" className="login-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={handleInputChange}
            />

            <label htmlFor="confirmPassword" className="login-label">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className="login-input"
              placeholder="Confirme su contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />

            <button type="submit" className="login-button" onClick={handleRegisterClick}>
              Registrarse
            </button>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
