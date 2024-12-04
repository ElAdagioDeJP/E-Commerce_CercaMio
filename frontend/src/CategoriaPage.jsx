import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './CategoriaPage.css';

const CategoriaPage = () => {
    const { id } = useParams(); // Obtener el ID de la categoría de la URL
    const [productos, setProductos] = useState([]);
    const [categoriaNombre, setCategoriaNombre] = useState(''); // Estado para el nombre de la categoría
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Solicitar todos los productos de la API
                const response = await axios.get('/api/productos/');
                const productosFiltrados = response.data.filter(
                    (producto) => producto.categoria_id === parseInt(id) // Comparar correctamente con un número
                );
                setProductos(productosFiltrados.slice(0, 16)); // Limitar a los primeros 16 productos
            } catch (err) {
                console.error('Error fetching productos:', err);
                setError('Error al obtener los productos de esta categoría');
            }
        };

        const fetchCategoriaNombre = async () => {
            try {
                // Solicitar el nombre de la categoría de la API
                const response = await axios.get(`/api/categorias/${id}`);
                setCategoriaNombre(response.data.nombre); // Actualizar el nombre de la categoría
            } catch (error) {
                console.error('Error al obtener la categoría:', error);
                setError('Error al obtener la categoría');
            }
        };

        fetchProductos();
        fetchCategoriaNombre(); // Llamar a la función para obtener el nombre de la categoría
    }, [id]); // Dependencia: se ejecuta cuando cambia el ID de la categoría

    return (
        <div>
            <Navbar />
            <div className="categoria-page">
                <h1>{categoriaNombre}</h1>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div className="conteiner">
                        <div className="productos-container">
                            {productos.map((producto) => (
                                <div key={producto.id} className="producto-card">
                                    <img src={producto.imagen} alt={producto.titulo} />
                                    <h3>{producto.titulo}</h3>
                                    <p>${producto.precio}</p>
                                </div>
                            ))}
                        </div>
                        {productos.length === 0 && <p>No hay productos disponibles en esta categoría.</p>}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CategoriaPage;
