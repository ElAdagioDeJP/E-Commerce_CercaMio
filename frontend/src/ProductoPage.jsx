import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './ProductoPage.css';

const ProductoPage = () => {
    const { productoId } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/productos/${productoId}`);
                setProducto(response.data);
            } catch (err) {
                console.error('Error fetching producto:', err);
                setError('Error al obtener los detalles del producto');
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [productoId]);

    if (loading) {
        return <p className="loading">Cargando...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="producto-page">
                {producto && (
                    <div className="producto-detail">
                        <div>
                            <img src={producto.imagen} alt={producto.titulo} />
                        </div>
                        
                        <div className="producto-info">
                            <h1>{producto.titulo}</h1>
                            <p>{producto.descripcion}</p>
                            <p><strong>Precio:</strong> ${producto.precio}</p>
                            <p><strong>Descuento:</strong> ${producto.descuento}</p>
                            <p><strong>Marca:</strong> {producto.marca}</p>
                            <p><strong>Stock:</strong> {producto.stock} unidades</p>
                            <div>
                                <strong>Dimensiones:</strong>
                                <ul>
                                    <li><strong>Ancho:</strong> {producto.dimensiones.ancho} cm</li>
                                    <li><strong>Alto:</strong> {producto.dimensiones.alto} cm</li>
                                    <li><strong>Profundidad:</strong> {producto.dimensiones.profundidad} cm</li>
                                    <li><strong>Peso:</strong> {producto.dimensiones.peso} kg</li>
                                </ul>
                            </div>
                            <div className="producto-buttons">
                                <button className="buy-button">Comprar</button>
                                <button className="review-button">Reseña</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProductoPage;
