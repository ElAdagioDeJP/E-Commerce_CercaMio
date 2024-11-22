// src/pages/CrearProducto.js

import React, { useState } from 'react';
import './CrearProducto.css'; // Asegúrate de crear este archivo de estilo.
import Navbar from './Navbar';

const CrearProducto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.descripcion || !formData.precio) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Aquí podrías enviar los datos a un backend o hacer alguna acción adicional
        console.log('Producto creado:', formData);

        // Limpiar el formulario después de enviar
        setFormData({
            nombre: '',
            descripcion: '',
            precio: '',
        });

        alert('Producto creado con éxito.');
    };

    return (
        <div>
            <Navbar />
            <div className="crear-producto-container">
                <h1 className="titulo">Crear Producto</h1>
                <form className="formulario" onSubmit={handleSubmit}>
                    <div className="campo">
                        <label htmlFor="nombre">Nombre del Producto</label>
                        <input
                            type="text"
                            id="nombre"
                            placeholder="Nombre del producto"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            placeholder="Descripción del producto"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="precio">Precio</label>
                        <input
                            type="number"
                            id="precio"
                            placeholder="Precio del producto"
                            value={formData.precio}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="boton">Crear Producto</button>
                </form>
            </div>
        </div>
    );
};

export default CrearProducto;
