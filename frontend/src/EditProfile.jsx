import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa axios
import './EditProfile.css'; // Asegúrate de agregar los estilos necesarios
import Navbar from './Navbar';
import Footer from './Footer';

function EditProfile() {
    const [profileData, setProfileData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        telefono: '',
        direccion: '',
        password: '' // Se agrega el campo para la contraseña
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = JSON.parse(localStorage.getItem('user'))?.id;

            if (!userId) {
                navigate('/'); // Redirige si no hay usuario
                return;
            }

            try {
                const response = await axios.get(`/api/usuarios/${userId}/`); // Usamos axios.get
                setProfileData({
                    username: response.data.username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    telefono: response.data.telefono,
                    direccion: response.data.direccion,
                    password: '' // No llenamos la contraseña al obtener los datos
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Si la contraseña está vacía, no la incluimos en los datos a enviar
        const { password, ...profileWithoutPassword } = profileData;
        const dataToUpdate = password ? { ...profileWithoutPassword, password } : profileWithoutPassword;

        console.log('Datos enviados:', dataToUpdate); // Verifica los datos enviados

        const userId = JSON.parse(localStorage.getItem('user'))?.id;

        try {
            const response = await axios.put(`/api/usuarios/${userId}/`, dataToUpdate, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Actualiza el localStorage con los nuevos datos
                const updatedUser = {
                    id: userId,
                    username: profileData.username,
                    email: profileData.email,
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                // Muestra el mensaje de éxito y luego redirige al Dashboard
                alert('Perfil actualizado con éxito');
                navigate('/'); // Redirige al dashboard después de la actualización
            } else {
                alert('Error al actualizar el perfil');
            }
        } catch (err) {
            console.error('Error al actualizar perfil:', err.response ? err.response.data : err.message);
            alert('Error al actualizar perfil: ' + (err.response ? err.response.data : err.message));
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Navbar />
            <div className="edit-profile-container">
                <div className="edit-profile-card">
                    <h1 className="edit-profile-title">Editar Perfil</h1>
                    <form className="edit-profile-form" onSubmit={handleSubmit}>
                        <label className="edit-profile-label">Nombre de usuario:</label>
                        <input
                            className="edit-profile-input"
                            type="text"
                            name="username"
                            value={profileData.username || ''}
                            onChange={handleChange}
                        />

                        <label className="edit-profile-label">Primer nombre:</label>
                        <input
                            className="edit-profile-input"
                            type="text"
                            name="first_name"
                            value={profileData.first_name || ''}
                            onChange={handleChange}
                        />

                        <label className="edit-profile-label">Apellido:</label>
                        <input
                            className="edit-profile-input"
                            type="text"
                            name="last_name"
                            value={profileData.last_name || ''}
                            onChange={handleChange}
                        />

                        <label className="edit-profile-label">Email:</label>
                        <input
                            className="edit-profile-input"
                            type="email"
                            name="email"
                            value={profileData.email || ''}
                            onChange={handleChange}
                        />

                        <label className="edit-profile-label">Teléfono:</label>
                        <input
                            className="edit-profile-input"
                            type="tel"
                            name="telefono"
                            value={profileData.telefono || ''}
                            onChange={handleChange}
                        />

                        <label className="edit-profile-label">Dirección:</label>
                        <input
                            className="edit-profile-input"
                            type="text"
                            name="direccion"
                            value={profileData.direccion || ''}
                            onChange={handleChange}
                        />

                        <label className="edit-profile-label">Nueva Contraseña (opcional):</label>
                        <input
                            className="edit-profile-input"
                            type="password"
                            name="password"
                            value={profileData.password || ''}
                            onChange={handleChange}
                        />

                        <button type="submit" className="edit-profile-button">Guardar Cambios</button>
                    </form>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}

export default EditProfile;
