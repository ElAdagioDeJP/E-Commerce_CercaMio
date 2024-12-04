import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Registro.css";
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios'; // Asegúrate de instalar axios

const RegistroUsuario = () => {
  const navigate = useNavigate();

  // Estados para manejar los datos del formulario
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    direccion: '',
    fecha_nacimiento: '',
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
  const handleRegisterClick = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.first_name || !formData.last_name || !formData.username ||
        !formData.email || !formData.telefono || !formData.direccion ||
        !formData.fecha_nacimiento || !formData.password || !formData.confirmPassword) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Crear el payload con el formato adecuado
    const payload = {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      telefono: formData.telefono,
      direccion: formData.direccion,
      fecha_nacimiento: formData.fecha_nacimiento,
      password: formData.password,
    };

    try {
      // Realiza el POST al backend
      const response = await axios.post('/api/usuarios/', payload);

      if (response.status === 201) {
        alert("Usuario registrado con éxito.");
        navigate('/'); // Redirigir al inicio de sesión
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error.response?.data || error.message);
      alert("Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <div className='cuerpo'>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Registro de Usuario</h1>
          <form>
            <label htmlFor="first_name" className="login-label">Nombre</label>
            <input
              type="text"
              id="first_name"
              className="login-input"
              placeholder="Ingrese su nombre"
              value={formData.first_name}
              onChange={handleInputChange}
            />

            <label htmlFor="last_name" className="login-label">Apellido</label>
            <input
              type="text"
              id="last_name"
              className="login-input"
              placeholder="Ingrese su apellido"
              value={formData.last_name}
              onChange={handleInputChange}
            />

            <label htmlFor="username" className="login-label">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              className="login-input"
              placeholder="Ingrese su nombre de usuario"
              value={formData.username}
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

            <label htmlFor="telefono" className="login-label">Teléfono</label>
            <input
              type="text"
              id="telefono"
              className="login-input"
              placeholder="Ingrese su número de teléfono"
              value={formData.telefono}
              onChange={handleInputChange}
            />

            <label htmlFor="direccion" className="login-label">Dirección</label>
            <input
              type="text"
              id="direccion"
              className="login-input"
              placeholder="Ingrese su dirección"
              value={formData.direccion}
              onChange={handleInputChange}
            />

            <label htmlFor="fecha_nacimiento" className="login-label">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fecha_nacimiento"
              className="login-input"
              placeholder="Ingrese su fecha de nacimiento"
              value={formData.fecha_nacimiento}
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
      <Footer />
    </div>
  );
};

export default RegistroUsuario;

