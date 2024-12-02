import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

function App() {
  const navigate = useNavigate(); // Usamos el hook para navegar

  // Función para manejar el clic en el botón
  const handleClick = () => {
    navigate('/sesion'); // Redirige al componente SesionUsuario
  };

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores
  
  const fetchProductos = async () => {
    try {
      // Solicitar los productos a la API
      const response = await axios.get('/api/productos/');
      setProductos(response.data); // Almacenar los productos en el estado
    } catch (err) {
      setError('Error al obtener los productos');
      console.error('Error fetching productos:', err);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Filtrar los productos más nuevos
  const productosMasNuevos = productos.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)).slice(0, 16);

  return (
    <>
      <div>
        <div>
          <Navbar /> {/* Aquí se usa el Navbar */}
        </div>

        <div className="background"></div>
        
        <div className="main">
          <main>
            <div className="categorias">
              <h2>Categorías</h2>
              <ul>
                <li>
                  <h3>Tecnología</h3>
                  <img src="/images/tecnologia.jpg" alt="Tecnología" />
                </li>
                <li>
                  <h3>Auto</h3>
                  <img src="/images/auto.jpg" alt="Auto" />
                </li>
                <li>
                  <h3>Hogar e Inmuebles</h3>
                  <img src="/images/hogar.jpg" alt="Hogar e Inmuebles" />
                </li>
                <li>
                  <h3>Alimentos</h3>
                  <img src="/images/alimentos.jpg" alt="Alimentos" />
                </li>
                <li>
                  <h3>Ropa</h3>
                  <img src="/images/ropa.jpg" alt="Ropa" />
                </li>
                <li>
                  <h3>Deportes</h3>
                  <img src="/images/deportes.jpg" alt="Deportes" />
                </li>
                <li>
                  <h3>Otros</h3>
                  <img src="/images/otros.jpg" alt="Otros" />
                </li>
              </ul>
            </div>

            <div className="rectangles-container">
              {/* Pasamos los productos más nuevos como prop al rectángulo */}
              <Rectangle key={0} title="Mas nuevos" productos={productosMasNuevos} />
              <Rectangle key={1} title="Tecnologia" />
              <Rectangle key={2} title="Auto" />
              <Rectangle key={3} title="Hogar e Inmuebles" />
              <Rectangle key={4} title="Alimentos" />
              <Rectangle key={5} title="Ropa" />
              <Rectangle key={6} title="Deportes" />
              <Rectangle key={7} title="Otros" />
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}

function Rectangle({ title, productos }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="rectangle">
      {/* Título en la esquina superior izquierda */}
      <div className="rectangle-title">{title}</div>
      
      {/* Mostrar los productos dentro de los cuadros */}
      {productos && productos.length > 0 ? (
        <div className="products-container">
          <div className="square-container">
            <div className={`square-wrapper ${showMore ? 'move-right' : ''}`}>
              {productos.map((producto, index) => (
                <div key={producto.id} className="square">
                  <div className="square-content">
                    <img src={producto.imagen} alt={producto.titulo} className="product-image" />
                    <div className="product-details">
                      <h3>{producto.titulo}</h3>
                      <p>${producto.precio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No hay productos disponibles.</p>
      )}

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
