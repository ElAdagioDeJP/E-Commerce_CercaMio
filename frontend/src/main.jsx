import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import SesionUsuario from './SesionUsuario'; // Importamos el nuevo componente


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        
    },
    {
        path: '/sesion', // Nueva ruta
        element: <SesionUsuario />, // Componente que se renderiza cuando se navega a '/sesion'
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
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)