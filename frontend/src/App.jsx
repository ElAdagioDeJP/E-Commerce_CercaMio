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

  console.log(productos);

  return (
    <>
      <div>
        <div>
          <Navbar /> {/* Aquí se usa el Navbar */}
        </div>


        <div className="background">

        </div>
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
              {Array.from({ length: 10 }).map((_, index) => (
                <Rectangle key={index} title={getTitle(index)} />
              ))}
            </div>
          </main>
        </div>
        <div>
          <h1>Productos</h1>
          {error && <p>{error}</p>} {/* Muestra el error si existe */}
          <div className="productos-lista">
            {productos.length > 0 ? (
              productos.map((producto) => (
                <div key={producto.id} className="producto-item">
                  <img src={producto.imagen} alt={producto.titulo} width="100" />
                  <h3>{producto.titulo}</h3>
                  <p>{producto.descripcion}</p>
                  <p>Precio: ${producto.precio}</p>
                  <p>Stock: {producto.stock}</p>
                  <p>Categoría: {producto.categoria_id}</p>
                  <p>Marca: {producto.marca}</p>
                  <p>Disponibilidad: {producto.estado_disponibilidad}</p>
                  <p>Dimensiones: {`Ancho: ${producto.dimensiones.ancho} | Alto: ${producto.dimensiones.alto} | Profundidad: ${producto.dimensiones.profundidad} | Peso: ${producto.dimensiones.peso}`}</p>
                  <p>Política de devolución: {producto.politica_devolucion}</p>
                  <p>SKU: {producto.sku}</p>
                  <p>Fecha de creación: {producto.fecha_creacion}</p>
                  <p>Fecha de actualización: {producto.fecha_actualizacion}</p>
                  <div>
                    <h4>Reseñas</h4>
                    {producto.reseñas.length === 0 ? (
                      <p>No hay reseñas</p>
                    ) : (
                      producto.reseñas.map((reseña, index) => (
                        <p key={index}>{reseña}</p>
                      ))
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles</p>
            )}
          </div>
        </div>
        <Footer />
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
