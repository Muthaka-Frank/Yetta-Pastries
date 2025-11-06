// src/Home/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // 👈 1. IMPORT

// Import your global styles
import './index.css'; 

// Import your Layout and Page Components
import AppLayout from '../AppLayout.jsx'; 
import Home from './App.jsx';                
import CakesPage from '../Cake/CakesPage.jsx'; 
import IceCreamPage from '../IceCream/IceCreamPage.jsx';
import CookiesPage from '../Cookies/CookiesPage.jsx';
import DrinksPage from '../Drinks/DrinksPage.jsx';
import AuthPage from '../Auth/AuthPage.jsx'; // 👈 2. IMPORT AUTH PAGE

// Placeholder for CustomPage
const CustomPage = () => <h1>Custom Orders Page (Coming Soon)</h1>;

// 3. Define your routes
const router = createBrowserRouter([
    {
        path: "/", 
        element: <AppLayout />, 
        children: [
            { index: true, element: <Home /> },
            { path: "cakes", element: <CakesPage /> },
            { path: "icecream", element: <IceCreamPage /> },
            { path: "cookies", element: <CookiesPage /> },
            { path: "drinks", element: <DrinksPage /> },
            { path: "customs", element: <CustomPage /> },
            { path: "login", element: <AuthPage /> }, // 👈 4. ADD LOGIN ROUTE
            { path: "account", element: <AuthPage /> }, // 👈 ADD ACCOUNT ROUTE
        ],
    },
]);

// 5. Get Client ID from .env file
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// 6. Render the app, wrapped in the Google Provider
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={googleClientId}>
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    </React.StrictMode>
);