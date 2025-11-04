// src/Home/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import all required pages
import './index.css'; 
import AppLayout from './AppLayout.jsx'; 
import Home from './Home/App.jsx';                
import CakesPage from './Cake/CakesPage.jsx'; 
import IceCreamPage from './IceCream/IceCreamPage.jsx';
import CookiesPage from './Cookies/CookiesPage.jsx';
import DrinksPage from './Drinks/DrinksPage.jsx'; 

// Placeholder for CustomPage (You will need to create this file)
const CustomPage = () => <h1>Custom Orders & Catering Coming Soon!</h1>;

const router = createBrowserRouter([
    {
        path: "/", 
        element: <AppLayout />, 
        children: [
            {
                index: true, 
                element: <Home />, // This is your App.jsx
            },
            {
                path: "cakes", 
                element: <CakesPage />,
            },
            {
                path: "icecream", 
                element: <IceCreamPage />,
            },
            {
                path: "cookies",
                element: <CookiesPage />,
            },
            {
                path: "drinks",
                element: <DrinksPage />,
            },
            {
                path: "customs", // 👈 NEW CUSTOMS ROUTE
                element: <CustomPage />, 
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);