import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import SesionUsuario from './SesionUsuario'; // Componente para iniciar sesión
import Registro from './Registro'; // Componente para registrar usuarios
import CrearProducto from './CrearProducto'; // Componente para crear productos
import CategoriaPage from './CategoriaPage'; // Página para mostrar productos por categoría
import ProductoPage from './ProductoPage'; // Nueva página para mostrar detalles del producto
import EditProfile from './EditProfile'; // Componente para editar el perfil del usuario

// Configuración de rutas
const router = createBrowserRouter([
    {
        path: '/', // Ruta raíz
        element: <App />,
    },
    {
        path: '/sesion', // Ruta para iniciar sesión
        element: <SesionUsuario />,
    },
    {
        path: '/registro', // Ruta para registrar un usuario
        element: <Registro />,
    },
    {
        path: '/crearproductos', // Ruta para crear un producto
        element: <CrearProducto />,
    },
    {
        path: '/categoria/:id', // Ruta dinámica para mostrar productos por categoría
        element: <CategoriaPage />,
    },
    {
        path: '/producto/:productoId', // Nueva ruta para los detalles del producto
        element: <ProductoPage />,
    },
    {
        path: '/perfil', // Nueva ruta para editar el perfil del usuario
        element: <EditProfile />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
