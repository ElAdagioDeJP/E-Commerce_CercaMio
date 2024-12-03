import React, { useState } from 'react';
import './CrearProducto.css';
import Navbar from './Navbar';
import Footer from './Footer';

const CrearProducto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        marca: '',
        infoenvio: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.descripcion || !formData.precio || !formData.stock) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        console.log('Producto creado:', formData);

        setFormData({
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            marca: '',
            infoenvio: ''
        });

        alert('Producto creado con éxito.');
    };

    return (
        <div>
            <Navbar />
            <div className='hoja'>
                <div className="crear-producto-container">
                    <h1 className="titulo">Crear Producto</h1>
                    <form className="formulario" onSubmit={handleSubmit}>
                        <div className="campo mediano">
                            <label htmlFor="nombre">Nombre del Producto</label>
                            <input
                                type="text"
                                id="nombre"
                                placeholder="Nombre del producto"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="campo-grande">
                            <label htmlFor="descripcion">Descripción</label>
                            <textarea
                                id="descripcion"
                                placeholder="Descripción del producto"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="campo-doble">
                            <div className="campo pequeno">
                                <label htmlFor="precio">Precio</label>
                                <input
                                    type="number"
                                    id="precio"
                                    placeholder="Precio"
                                    value={formData.precio}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="campo pequeno">
                                <label htmlFor="stock">Stock</label>
                                <input
                                    type="number"
                                    id="stock"
                                    placeholder="Stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="campo mediano">
                            <label htmlFor="marca">Marca</label>
                            <input
                                type="text"
                                id="marca"
                                placeholder="Marca del producto"
                                value={formData.marca}
                                onChange={handleInputChange}
                            />
                            </div>
                            <div className="campo-grande">
                            <label htmlFor="infoenvio">Informacio de envio</label>
                            <textarea
                                id="infoenvio"
                                placeholder="informacion de envio"
                                value={formData.infoenvio}
                                onChange={handleInputChange}
                            />
                            
                            </div>
                        </div>
                        <button type="submit" className="boton">Crear Producto</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CrearProducto;
