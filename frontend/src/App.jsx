import './App.css';

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
              <div key={index} className="rectangle">
                {Array.from({ length: 20 }).map((_, circleIndex) => (
                  <div key={circleIndex} className="circle"></div>
                ))}
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
