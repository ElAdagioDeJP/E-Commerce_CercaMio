import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de tener los estilos correctos

function Navbar() {
  const navigate = useNavigate(); // Usamos el hook para navegar

  // Función para manejar el clic en el botón
  const handleClick = () => {
    navigate('/sesion'); // Redirige al componente SesionUsuario
  };
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <img src=".\image\logopsinf.webp" alt="Logo CercaMio" className="logo" />
      <ul className="nav-links">
        <li>
          <a href="#home" onClick={handleBackClick}>Inicio</a>
        </li>
        <li>
          <a href="#about">Sobre mí</a>
        </li>
        <li>
          <a href="#services">Servicios</a>
        </li>
        <li>
          <button className="btn-primary" onClick={handleClick}>
            Usuario
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
