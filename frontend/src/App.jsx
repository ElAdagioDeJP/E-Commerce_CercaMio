import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
function App() {
  const navigate = useNavigate(); // Usamos el hook para navegar

  // Función para manejar el clic en el botón
  const handleClick = () => {
    navigate('/sesion'); // Redirige al componente SesionUsuario
  };
  return (
    <>
      <div>
        <nav className="navbar">
          <img src=".\image\logopsinf.webp" alt="Logo CercaMio" className="logo" />
          <ul className="nav-links">
            <li>
              <a href="#home">Inicio</a>
            </li>
            <li>
              <a href="#about">Sobre mí</a>
            </li>
            <li>
              <a href="#services">Servicios</a>
            </li>
            <li>
            <button className="btn-primary" onClick={handleClick}>
              Iniciar Sesión
            </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main">
        <main>
          <h1>Bienvenido a mi sitio</h1>
          <div className="rectangles-container">
            {Array.from({ length: 10 }).map((_, index) => (
              <Rectangle key={index} title={getTitle(index)} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

// Función para obtener los títulos
function getTitle(index) {
  switch (index) {
    case 0:
      return "Más valorado";
    case 1:
      return "Más visto";
    case 2:
      return "Más vendido";
    case 3:
      return "Más buscado";
    case 4:
      return "Más compartido";
    case 5:
      return "Más comentado";
    case 6:
      return "Más reciente";
    case 7:
      return "Más antiguo";
    case 8:
      return "Más barato";
    case 9:
      return "Más caro";
    case 10:
      return "Más grande";
    default:
      return `Título ${index + 1}`; // Títulos por defecto para los demás rectángulos
  }
}

function Rectangle({ title }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="rectangle">
      {/* Título en la esquina superior izquierda */}
      <div className="rectangle-title">{title}</div>
      <div className="square-container">
        <div className={`square-wrapper ${showMore ? 'move-right' : ''}`}>
          {Array.from({ length: 16 }).map((_, squareIndex) => (
            <div key={squareIndex} className="square">
              <div className="square-content">
                
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Flecha horizontal */}
      <button
        className="toggle-btn"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? '←' : '→'}
      </button>
    </div>
  );
}

export default App;