import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Verifica si este componente existe
import Footer from './Footer'; // Verifica si este componente existe
import './ProductoPage.css';

const ProductoPage = () => {
    const { productoId } = useParams();
    const [producto, setProducto] = useState(null);
    const [reseñas, setReseñas] = useState([]); // Estado para guardar las reseñas
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Modal de pago
    const [cantidadCompra, setCantidadCompra] = useState(1); // Cantidad seleccionada
    const [pagoRealizado, setPagoRealizado] = useState(false);
    const [calificacion, setCalificacion] = useState(0);
    const [comentario, setComentario] = useState('');
    const [reseñaEnviado, setReseñaEnviado] = useState(false);
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
        if (calificacion < 1 || calificacion > 5) {
            alert("La calificación debe ser entre 1 y 5.");
            return;
        }
        if (comentario.trim() === "") {
            alert("El comentario no puede estar vacío.");
            return;
        }
        
        
        const nuevaReseña = {
            producto : productoId,
            calificacionInt: calificacion,
            comentario: comentario,
            fecha: new Date().toISOString(),
            nombre_usuario: "Juan23", // Nombre ficticio, reemplázalo por el sistema de autenticación
            email_usuario: "juan@gmail.com", // Email ficticio
        };
    
        try {
            const productoIdInt2 = parseInt(productoId, 10);
            if (isNaN(productoIdInt)) {
                console.error('El ID del producto no es válido:', productoId);
                return;
            }
    
            // Realiza la solicitud POST para enviar la reseña
            const response = await axios.post(`/api/productos/${productoIdInt2}/resenas`, nuevaReseña);
            console.log("Reseña creada:", response.data);
    
            // Si la reseña fue enviada con éxito
            setReseñaEnviado(true);
            setIsModalOpen(false);
            setCalificacion(0);
            setComentario('');
        } catch (error) {
            console.error("Error al crear la reseña:", error.response?.data || error.message);
            setReseñaEnviado(false);
        }
    };
    

    const fetchReseñas = async () => {

        try {

            const productoIdInt2 = parseInt(productoId, 10);
            const response = await axios.get(`/api/productos/${productoIdInt2}/resenas`);
            setReseñas(response.data);
        } catch (error) {
            console.error('Error al obtener las reseñas:', error);
        }
    };

    const handleComprarClick = () => {
        setIsPaymentModalOpen(true); // Abre el modal de pago
    };

    const handleClosePaymentModal = () => {
        setIsPaymentModalOpen(false); // Cierra el modal de pago
    };

    const handleProcesarPago = async () => {
        if (cantidadCompra > producto.stock) {
            alert("No hay suficiente stock disponible.");
            return;
        }

         try {
            const nuevoStock = producto.stock - cantidadCompra;
            const productoIdInt3 = parseInt(productoId, 10);
            const productoActualizado = {
                ...producto,
                stock: nuevoStock,
            };
            await axios.put(`http://127.0.0.1:8000/api/productos/${productoIdInt3}/`, productoActualizado);
             setProducto(productoActualizado);
            setPagoRealizado(true);
             setIsPaymentModalOpen(false);
             setCantidadCompra(1);
        } catch (error) {
             console.error("Error al procesar el pago:", error);
             setPagoRealizado(false);
         }
    };

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/productos/${productoId}`);
                setProducto(response.data);
                fetchReseñas();
            } catch (err) {
                console.error('Error fetching producto:', err);
                setError('Error al obtener los detalles del producto');
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [productoId]);

    if (loading) return <p className="loading">Cargando...</p>;
    if (error) return <p className="error">{error}</p>;


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
                                <button className="buy-button" onClick={handleComprarClick}>Comprar</button>
                                <button className="review-button" onClick={handleReseñaClick}>Reseña</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Sección de reseñas */}
            {reseñas.length > 0 ? (
                <div className='reseña-item'>
                    <div className="reseñas-section">
                        <h2>Reseñas</h2>
                        {reseñas.map((reseña, index) => (
                            <div key={index} className="reseña">
                                <p><strong>Usuario:</strong> {reseña.nombre_usuario}</p>
                                <p><strong>Calificación:</strong> {reseña.calificacion}/5</p>
                                <p><strong>Comentario:</strong> {reseña.comentario}</p>
                                <p><strong>Fecha:</strong> {new Date(reseña.fecha).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="no-reseñas">Aún no hay reseñas para este producto.</p>
            )}


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

            {/* Modal de pago */}
            {isPaymentModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleClosePaymentModal}>X</button>
                        <h2>Confirmar compra</h2>
                        <div>
                            <label>Cantidad:</label>
                            <input
                                type="number"
                                value={cantidadCompra}
                                onChange={(e) => setCantidadCompra(Math.min(producto.stock, Math.max(1, e.target.value)))}
                                min="1"
                                max={producto.stock}
                            />
                        </div>
                        <p><strong>Total:</strong> ${producto.precio * cantidadCompra}</p>
                        <button className="send-review-button" onClick={handleProcesarPago}>Pagar</button>
                    </div>
                </div>
            )}

            {reseñaEnviado && <p className="success-message">¡Gracias por tu reseña!</p>}
            {pagoRealizado && <p className="success-message">¡Compra realizada con éxito!</p>}

            <Footer />
        </div>
    );
};

export default ProductoPage;
