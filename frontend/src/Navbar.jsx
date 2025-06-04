import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de tener los estilos correctos
import './Form.css';

function Navbar() {
  const navigate = useNavigate(); // Usamos el hook para navegar
  const [user, setUser] = useState(null); // Estado para almacenar el objeto del usuario
  const [menuVisible, setMenuVisible] = useState(false); // Controla si el menú está visible

  // Verificar si hay un usuario almacenado en el localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Obtiene el objeto completo del localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parsea y establece el objeto del usuario
    }
  }, []);

  // Función para manejar el clic en el botón de iniciar sesión
  const handleClick = () => {
    navigate('/sesion'); // Redirige al componente SesionUsuario
  };

  // Función para manejar el clic en el logo (regresar al inicio)
  const handleBackClick = () => {
    navigate('/'); // Redirige al inicio
  };

  // Función para manejar el clic en "Añadir Producto"
  const handleRegisterProductClick = () => {
    navigate('/CrearProductos'); // Redirige a la página de crear productos
  };
  const handlePersolizacion = () => {
    navigate('/form#services'); // Redirige a la página de crear productos
  };
  const handlePerfilClick = () => {
    navigate('/perfil'); // Redirige a la página de crear productos
  };
  const handleFormClick = () => {
    navigate('/form'); // Redirige a la página de crear productos
  }	
  // Función para alternar la visibilidad del menú desplegable
  const handleUserCircleClick = () => {
    setMenuVisible(!menuVisible); // Alterna la visibilidad del menú
  };

  // Función para manejar la opción de salir
  const handleLogout = () => {
    localStorage.clear(); // Elimina todo el contenido del localStorage
    setUser(null); // Restablece el estado del usuario
    setMenuVisible(false); // Oculta el menú
    navigate('/'); // Opcional: Redirige al inicio después de cerrar sesión
  };

  return (
    <nav className="navbar">
      <img
        src="/image/logopsinf.webp"
        alt="Logo CercaMio"
        className="logo"
        onClick={handleBackClick}
      />
      <ul className="nav-links">
        <li>
          {user ? (
            <div className="user-container">
              {/* Círculo con la primera letra del username */}
              <div className="user-circle" onClick={handleUserCircleClick}>
                {user.username[0].toUpperCase()}
              </div>
              {/* Menú desplegable */}
              {menuVisible && (
                <div className="dropdown-menu">
                  <ul>
                    <li onClick={handlePerfilClick}>Perfil</li>
                    <li onClick={handleRegisterProductClick}>Añadir Producto</li>
                    <li onClick={handlePersolizacion}>Personalizacion</li>
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

