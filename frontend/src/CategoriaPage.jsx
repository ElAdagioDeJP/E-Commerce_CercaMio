import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './CategoriaPage.css';

const CategoriaPage = () => {
    const { id } = useParams();
    const [productos, setProductos] = useState([]);
    const [categoriaNombre, setCategoriaNombre] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const productosResponse = await axios.get('/api/productos/');
                const categoriaResponse = await axios.get(`/api/categorias/${id}`);

                const productosFiltrados = productosResponse.data.filter(
                    (producto) => producto.categoria_id === parseInt(id)
                );
                setProductos(productosFiltrados.slice(0, 16));
                setCategoriaNombre(categoriaResponse.data.nombre);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error al obtener los datos.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="categoria-page">
                <h1>{categoriaNombre}</h1>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div className="container">
                        <div className="productos-container">
                            {productos.length > 0 ? (
                                productos.map((producto) => (
                                    <p
                                        key={producto.id}
                                        to={`/producto/${producto.id}`}
                                        className="producto-card"
                                    >
                                        <img src={producto.imagen} alt={producto.titulo} />
                                        <h3>{producto.titulo}</h3>
                                        <p>${producto.precio}</p>
                                    </p>
                                ))
                            ) : (
                                <p>No hay productos disponibles en esta categoría.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CategoriaPage;
