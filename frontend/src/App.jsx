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
  const productosMasNuevos = productos
    .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
    .slice(0, 16);
  console.log(productosMasNuevos);

  // Filtrar los productos de la categoría "Otros"
  const productosOtros = productos.filter(producto => producto.categoria_id === 2).slice(0, 16);
  console.log(productosOtros);

  const productosalimentos = productos.filter(producto => producto.categoria_id === 1).slice(0, 16);
  console.log(productosOtros);

  const productohogar = productos.filter(producto => producto.categoria_id === 5).slice(0, 16);
  console.log(productosOtros);

  const productotecnologia = productos.filter(producto => producto.categoria_id === 4).slice(0, 16);
  console.log(productosOtros);

  const productoauto = productos.filter(producto => producto.categoria_id === 3).slice(0, 16);
  console.log(productosOtros);

  const productoropa = productos.filter(producto => producto.categoria_id === 6).slice(0, 16);
  console.log(productosOtros);

  const productodeportes = productos.filter(producto => producto.categoria_id === 7).slice(0, 16);
  console.log(productosOtros);

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
                  <img src=".\image\tecnologia.avif" alt="Tecnología" style={{ paddingTop: '20px' }}/>
                </li>
                <li>
                  <h3>Auto</h3>
                  <img src=".\image\camionet.png" alt="Auto" />
                </li>
                <li>
                  <h3>Hogar e Inmuebles</h3>
                  <img src=".\image\sofa4.png" alt="Hogar e Inmuebles" style={{ paddingTop: '30px' }} />
                </li>
                <li>
                  <h3>Alimentos</h3>
                  <img src=".\image\alimentos.png" alt="Alimentos" />
                </li>
                <li>
                  <h3>Ropa</h3>
                  <img src=".\image\ropa.png" alt="Ropa" style={{ width: '60%' , height: '60%', paddingTop: '10px'}} />
                </li>
                <li>
                  <h3>Deportes</h3>
                  <img src=".\image\deportes.png" alt="Deportes" style={{ width: '70%' , height: '70%', paddingTop: '10px'}} />
                </li>
                <li>
                  <h3>Otros</h3>
                  <img src=".\image\eladagiodejuan.png" alt="Otros" style={{ width: '70%' , height: '70%', paddingTop: '1px'}} />
                </li>
              </ul>
            </div>

            <div className="rectangles-container">
              {/* Pasamos los productos más nuevos como prop al rectángulo */}
              <Rectangle key={0} title="Mas nuevos" productos={productosMasNuevos} />
              <Rectangle key={1} title="Tecnologia" productos={productotecnologia} />
              <Rectangle key={2} title="Auto" productos={productoauto}/>
              <Rectangle key={3} title="Hogar e Inmuebles" productos={productohogar} />
              <Rectangle key={4} title="Alimentos" productos={productosalimentos} />
              <Rectangle key={5} title="Ropa" productos={productoropa} />
              <Rectangle key={6} title="Deportes" productos={productodeportes} />
              <Rectangle key={7} title="Otros" productos={productosOtros}/>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}

function Rectangle({ title, productos = [] }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="rectangle">
      {/* Título en la esquina superior izquierda */}
      <div className="rectangle-title">{title}</div>

      {/* Mostrar los productos dentro de los cuadros */}
      {productos.length > 0 ? (
        <div className="products-container">
          <div className="square-container">
            <div className={`square-wrapper ${showMore ? 'move-right' : ''}`}>
              {productos.map((producto) => (
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
      <button className="toggle-btn" onClick={() => setShowMore(!showMore)}>
        {showMore ? '←' : '→'}
      </button>
    </div>
  );
}

export default App;