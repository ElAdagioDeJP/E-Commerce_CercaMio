import './App.css';
import { useState } from 'react';

function App() {
  return (
    <>
      <div>
        <nav className="navbar">
          <div className="logo">CercaMio</div>
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
              <button className="btn-primary">Iniciar</button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main">
        <main>
          <h1>Bienvenido a mi sitio</h1>
          <div className="rectangles-container">
            {Array.from({ length: 8 }).map((_, index) => (
              <Rectangle key={index} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

function Rectangle() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="rectangle">
      <div className="circle-container">
        <div className={`circle-wrapper ${showMore ? 'move-right' : ''}`}>
          {Array.from({ length: 20 }).map((_, circleIndex) => (
            <div key={circleIndex} className="circle"></div>
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
