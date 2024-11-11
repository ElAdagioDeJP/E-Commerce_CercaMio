import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'




import App from './App'




const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        
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