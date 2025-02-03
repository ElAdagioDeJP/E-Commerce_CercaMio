import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Verifica si este componente existe
import Footer from './Footer'; // Verifica si este componente existe
import './ProductoPage.css';
import SesionUsuario from './SesionUsuario';

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
    const [usuarioProducto, setUsuarioProducto] = useState(null);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };
    const fetchUsuarioProducto = async (usuarioId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/usuarios/${usuarioId}/`);
            setUsuarioProducto(response.data);
        } catch (error) {
            console.error("Error al obtener el usuario del producto:", error);
        }
    };
    const handleReseñaClick = () => {
        const user = localStorage.getItem('user');
        if (!user || user === "") {
            alert('Debes estar logueado para dejar una reseña');
            return;
        }
        setIsModalOpen(true); // Abre el modal de reseña
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Cierra el modal de reseña
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
        const user = JSON.parse(localStorage.getItem('user'));
        // Si no hay un usuario logueado, mostrar un mensaje de error
        if (!user) {
            alert('Debes estar logueado para dejar una reseña');
            return;
        }
        const nuevaReseña = {
            calificacion: calificacion,
            comentario: comentario,
            fecha: new Date().toISOString(),
            nombre_usuario: user.username, // Nombre ficticio, reemplázalo por el sistema de autenticación
            email_usuario: user.email, // Email ficticio
        };

        try {
            const productoIdInt2 = parseInt(productoId, 10); // Declaración correcta
            if (isNaN(productoIdInt2)) {
                console.error('El ID del producto no es válido:', productoIdInt2);
                return;
            }

            // Realiza la solicitud POST para enviar la reseña
            const response = await axios.post(`http://127.0.0.1:8000/api/productos/${productoIdInt2}/resenas/`, nuevaReseña);
            console.log("Reseña creada:", response.data);

            // Si la reseña fue enviada con éxito
            setReseñaEnviado(true);
            setIsModalOpen(false);
            setCalificacion(0);
            setComentario('');
        } catch (error) {
            alert("Ocurrió un error al enviar la reseña. Por favor, inténtalo de nuevo.");
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
        const user = localStorage.getItem('user');
        if (!user || user === "") {
            alert('Debes estar logueado para realizar una compra');
            return;
        }
        setIsPaymentModalOpen(true); // Abre el modal de pago
    };

    const handleClosePaymentModal = () => {
        setIsPaymentModalOpen(false); // Cierra el modal de pago
    };

    const handleCantidadChange = (e) => {
        const nuevaCantidad = Math.max(1, Math.min(producto.stock, e.target.value)); // Limita la cantidad a un mínimo de 1 y al máximo de stock
        setCantidadCompra(nuevaCantidad);
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
    
                // Obtener el usuario asociado al producto
                const usuarioId = response.data.usuario;
                if (usuarioId) {
                    await fetchUsuarioProducto(usuarioId);
                }
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
                        <div className='imagen'>
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
                            <h3>Información del Vendedor</h3>
                            <p><strong>Usuario:</strong> {usuarioProducto.username}</p>
                            <p><strong>Dirección:</strong> {usuarioProducto.direccion}</p>
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
                        <h2>Reseña:</h2>
                        {reseñas.map((reseña, index) => (
                            <div key={index} className="reseña">
                                <p><strong>Usuario:</strong> {reseña.nombre_usuario}</p>
                                <p><strong>Email:</strong> {reseña.email_usuario}</p>
                                <p><strong>Calificación:</strong> {reseña.calificacion}/5</p>
                                <p><strong>Comentario:</strong> {reseña.comentario}</p>
                                <p><strong>Fecha:</strong> {new Date(reseña.fecha).toLocaleDateString()}</p>
                                <hr />
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
                                onChange={(e) => setCalificacion(e.target.value)}
                                min="1"
                                max="5"
                            />
                        </div>
                        <div>
                            <label>Comentario:</label>
                            <textarea
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSendReseña} className='boton-ventana'>Enviar Reseña</button>
                    </div>
                </div>
            )}

            {/* Modal de pago */}
            {isPaymentModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleClosePaymentModal}>X</button>
                        <h2>Confirmar Compra</h2>
                        <p><strong>Cantidad:</strong>
                            <input
                                type="number"
                                value={cantidadCompra}
                                onChange={handleCantidadChange}
                                min="1"
                                max={producto.stock} // Limita la cantidad al stock disponible
                            />
                        </p>
                        <p><strong>Precio total:</strong> ${producto.precio * cantidadCompra}</p>
                        <button onClick={handleProcesarPago} className='boton-ventana'>Procesar pago</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ProductoPage;

