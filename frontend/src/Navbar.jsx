import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de tener los estilos correctos

function Navbar() {
  const navigate = useNavigate(); // Usamos el hook para navegar
  const [username, setUsername] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false); // Controla si el menú está visible

  // Verificar si hay un username en el localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Establecer el username si existe
    }
  }, []);

  // Función para manejar el clic en el botón
  const handleClick = () => {
    navigate('/sesion'); // Redirige al componente SesionUsuario
  };

  const handleBackClick = () => {
    navigate('/'); // Redirige al inicio
  };

  const handleRegisterProductClick = () => {
    navigate('/CrearProductos'); // Redirige a la página de crear productos
  };

  // Función para manejar el clic en el círculo con la primera letra del username
  const handleUserCircleClick = () => {
    setMenuVisible(!menuVisible); // Alternar la visibilidad del menú
  };

  // Función para manejar la opción de salir
  const handleLogout = () => {
    localStorage.removeItem('username'); // Eliminar username del localStorage
    setUsername(null); // Restablecer el estado de username
    setMenuVisible(false); // Ocultar el menú
  };

  return (
    <nav className="navbar">
      <img src="/image/logopsinf.webp" alt="Logo CercaMio" className="logo" onClick={handleBackClick} />
      <ul className="nav-links">
        <li>
          <a href="#about" onClick={handleRegisterProductClick}>Sobre mí</a>
        </li>
        <li>
          <a href="#services">Servicios</a>
        </li>
        <li>
          {username ? (
            <div className="user-container">
              {/* Círculo con la primera letra del username */}
              <div className="user-circle" onClick={handleUserCircleClick}>
                {username[0].toUpperCase()}
              </div>
              {/* Menú desplegable */}
              {menuVisible && (
                <div className="dropdown-menu">
                  <ul>
                    <li onClick={() => navigate('/perfil')}>Perfil</li>
                    <li onClick={handleRegisterProductClick}>Añadir Producto</li>
                    <li onClick={handleLogout}>Salir</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button className="btn-primary" onClick={handleClick}>
              Usuario
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
