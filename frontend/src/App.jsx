import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import './App.css';

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
  const handleCategoryClick = (categoryId) => {
    navigate(`/categoria/${categoryId}`);
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

        <div className="background">
          <img src='./image/fondocercamio.png' alt="background" />
        </div>
        
        <div className="main">
          <main>
            <div className="categorias">
              <h2>Categorías</h2>
              <ul>
                <li onClick={() => handleCategoryClick(4)}>
                  <h3>Tecnología</h3>
                  <img src=".\image\tecnologia.avif" alt="Tecnología" style={{ paddingTop: '20px' }}/>
                </li>
                <li  onClick={() => handleCategoryClick(3)}>
                  <h3>Auto</h3>
                  <img src=".\image\camionet.png" alt="Auto" />
                </li>
                <li onClick={() => handleCategoryClick(5)}> 
                  <h3>Hogar e Inmuebles</h3>
                  <img src=".\image\sofa4.png" alt="Hogar e Inmuebles" style={{ paddingTop: '30px' }} />
                </li>
                <li onClick={() => handleCategoryClick(1)}>
                  <h3>Alimentos</h3>
                  <img src=".\image\alimentos.png" alt="Alimentos" />
                </li>
                <li onClick={() => handleCategoryClick(6)}>
                  <h3>Ropa</h3>
                  <img src=".\image\ropa.png" alt="Ropa" style={{ width: '60%' , height: '60%', paddingTop: '10px'}} />
                </li>
                <li onClick={() => handleCategoryClick(7)}>
                  <h3>Deportes</h3>
                  <img src=".\image\deportes.png" alt="Deportes" style={{ width: '70%' , height: '70%', paddingTop: '10px'}} />
                </li>
                <li onClick={() => handleCategoryClick(2)}>
                  <h3>Otros</h3>
                  <img src=".\image\eladagiodejuan.png" alt="Otros" style={{ width: '70%' , height: '70%', paddingTop: '1px'}} />
                </li>
              </ul>
            </div>

            <div className="rectangles-container">
              <Carousel title="Mas nuevos" productos={productosMasNuevos} />
              <Carousel title="Tecnologia" productos={productotecnologia} />
              <Carousel title="Auto" productos={productoauto} />
              <Carousel title="Hogar e Inmuebles" productos={productohogar} />
              <Carousel title="Alimentos" productos={productosalimentos} />
              <Carousel title="Ropa" productos={productoropa} />
              <Carousel title="Deportes" productos={productodeportes} />
              <Carousel title="Otros" productos={productosOtros} />
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}

// Carrusel para productos
function Carousel({ title, productos = [] }) {
  const [current, setCurrent] = useState(0);
  const [productosCarrusel, setProductosCarrusel] = useState(productos);
  const navigate = useNavigate();
  const itemsToShow = 7;

  useEffect(() => {
    setProductosCarrusel(productos);
    setCurrent(0);
  }, [productos]);

  const total = productosCarrusel.length;
  const maxIndex = Math.max(0, total - itemsToShow);

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    } else if (total > itemsToShow) {
      // Mueve el último elemento al inicio
      const nuevosProductos = [
        productosCarrusel[productosCarrusel.length - 1],
        ...productosCarrusel.slice(0, productosCarrusel.length - 1),
      ];
      setProductosCarrusel(nuevosProductos);
      // current se mantiene igual para mostrar el nuevo grupo
    }
  };

  const handleNext = () => {
    if (current < maxIndex) {
      setCurrent((prev) => prev + 1);
    } else if (total > itemsToShow) {
      // Mueve el primer elemento al final
      const nuevosProductos = [
        ...productosCarrusel.slice(1),
        productosCarrusel[0],
      ];
      setProductosCarrusel(nuevosProductos);
      // current se mantiene igual para mostrar el nuevo grupo
    }
  };

  const handleProductClick = (productoId) => {
    navigate(`/producto/${productoId}`);
  };

  return (
    <div className="rectangle">
      <div className="rectangle-title">{title}</div>
      {productosCarrusel.length > 0 ? (
        <div className="carousel-outer">
          <button
            className="carousel-btn carousel-btn-left"
            onClick={handlePrev}
            disabled={productosCarrusel.length <= itemsToShow}
          >
            &#8592;
          </button>
          <div className="carousel-products">
            {productosCarrusel.slice(current, current + itemsToShow).map((producto) => (
              <div
                key={producto.id}
                className="square"
                onClick={() => handleProductClick(producto.id)}
              >
                <div className="square-content">
                  <img
                    src={producto.imagen}
                    alt={producto.titulo}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3>{producto.titulo}</h3>
                    <p>${producto.precio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-btn carousel-btn-right"
            onClick={handleNext}
            disabled={productosCarrusel.length <= itemsToShow}
          >
            &#8594;
          </button>
        </div>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
}

export default App;