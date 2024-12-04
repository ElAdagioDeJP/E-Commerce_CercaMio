import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './ProductoPage.css';

const ProductoPage = () => {
    const { productoId } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calificacion, setCalificacion] = useState(0); // Para la calificación
    const [comentario, setComentario] = useState(""); // Para el comentario
    const [reseñaEnviado, setReseñaEnviado] = useState(false); // Para saber si la reseña fue enviada
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/'); 
    };

    const handleReseñaClick = () => {
        setIsModalOpen(true); // Abre el modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

    const handleSendReseña = async () => {
        const nuevaReseña = {
            calificacion: calificacion,
            comentario: comentario,
            fecha: new Date().toISOString(), // Fecha actual en formato ISO
            nombre_usuario: "Juan23", // Este sería el nombre del usuario, puedes obtenerlo dinámicamente
            email_usuario: "juan@gmail.com", // Este sería el email del usuario
        };

        try {
            await axios.post(`/api/productos/${productoId}/resenas`, nuevaReseña); // Enviar reseña a la base de datos
            setReseñaEnviado(true); // Indica que la reseña fue enviada correctamente
            setIsModalOpen(false); // Cierra el modal
            setCalificacion(0); // Limpiar calificación
            setComentario(""); // Limpiar comentario
        } catch (error) {
            console.error('Error al enviar la reseña:', error);
            setReseñaEnviado(false); // En caso de error, la reseña no fue enviada
        }
    };

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
                                <button className="buy-button" onClick={handleBackClick}>Comprar</button>
                                <button className="review-button" onClick={handleReseñaClick}>Reseña</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de reseña */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleCloseModal}>X</button>
                        <h2>Escribe tu reseña</h2>
                        <div>
                            <label>Calificación (1-5):</label>
                            <input
                                type="number"
                                value={calificacion}
                                onChange={(e) => setCalificacion(Math.min(5, Math.max(1, e.target.value)))}
                                min="1"
                                max="5"
                            />
                        </div>
                        <div>
                            <label>Comentario:</label>
                            <textarea
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                rows="5"
                                cols="30"
                                placeholder="Escribe tu reseña aquí..."
                            />
                        </div>
                        <button className="send-review-button" onClick={handleSendReseña}>Enviar</button>
                    </div>
                </div>
            )}

            {reseñaEnviado && <p className="success-message">¡Gracias por tu reseña!</p>}

            <Footer />
        </div>
    );
};

export default ProductoPage;

