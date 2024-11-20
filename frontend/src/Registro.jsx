import React, { useState } from 'react';
import './Registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    foto: null,
    telefono: ''
  });
  const [fotoPreview, setFotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file
      });
      setFotoPreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el registro del usuario
    console.log('Datos del formulario:', formData);
  };

  return (
    <div className="registro-container">
      <h2>Formulario de Registro</h2>
      <form action="/submit" method="post" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Número Telefónico:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <label htmlFor="foto">Foto</label>
        <input
          type="file"
          id="foto"
          name="foto"
          onChange={handleChange}
        />
        {fotoPreview && <img src={fotoPreview} alt="Vista previa" className="foto-preview" />}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;