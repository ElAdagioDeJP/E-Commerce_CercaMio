import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import SesionUsuario from './SesionUsuario'; // Importamos el nuevo componente
import Registro from './Registro'; // Importamos el nuevo componente
import Crearproductos from './Crearproductos';// Importamos el nuevo componente

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        
    },
    {
        path: '/sesion', // Nueva ruta
        element: <SesionUsuario />, // Componente que se renderiza cuando se navega a '/sesion'
      },
    {
        path: '/registro', // Nueva ruta
        element: <Registro />, // Componente que se renderiza cuando se navega a '/registro'
      },
      {
        path: '/crearproductos', // Nueva ruta para crear productos
        element: <Crearproductos />, // Componente que se renderiza cuando se navega a '/crearproductos'
    },

    /*
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/shop/:rif',
        element: <ShopPage />,
    },
    {
        path: '/Product/:productID',
        element: <ProductPage />,
        children: [
            {
                path: '/Product/:productID/:rif',
                element: <ShopInfo />
            }
        ]
    },
    {
        path: '/Login',
        element: <Login />,
    },
    {
        path: '/Register',
        element: <Register />,
    },
    {
        path: '/Dashboard/:shopRif',
        element: <Dashboard />,
    },*/
])

ReactDOM.createRoot(document.getElementById('root')).render(
    
        <RouterProvider router={router} />
    
)