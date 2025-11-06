// src/Cookies/CookiesPage.jsx
import React, { useState, useEffect } from 'react';
import '../Home/App.css'; // Shared component styles
import '../Home/index.css'; // Global styles and variables

// --- Cookies Data ---
const cookiesData = [
    {
        id: 'choco-chip',
        title: 'Brown Butter Chocolate Chip',
        price: '$3.50 / ea',
        description: 'Nutty brown butter base with pools of melted dark chocolate.',
        imageSrc: '/Frontend/cookies/Choco chips cookie.jpeg',
        imageAlt: 'Brown Butter Chocolate Chip Cookies'
    },
    {
        id: 'butter',
        title: 'Butter Cookies',
        price: '$2.00 / ea',
        description: 'Simple, delicate, and melt-in-your-mouth Danish classic.',
        imageSrc: '/Frontend/cookies/Butter Cookies.jpeg',
        imageAlt: 'Butter Cookies'
    },
    {
        id: 'caramel',
        title: 'Caramel Cookies',
        price: '$3.75 / ea',
        description: 'Soft cookies loaded with chewy caramel chunks.',
        imageSrc: '/Frontend/cookies/Caramel cookies.jpeg',
        imageAlt: 'Caramel Cookies'
    },
    {
        id: 'gingerbread',
        title: 'Classic Gingerbread Men',
        price: '$4.00 / ea',
        description: 'Warm spice and molasses, decorated with royal icing.',
        imageSrc: '/Frontend/cookies/Classic Gingerbread Men Cookies.jpeg',
        imageAlt: 'Classic Gingerbread Men Cookies'
    },
    {
        id: 'double-choco',
        title: 'Double Chocolate Cookies',
        price: '$3.25 / ea',
        description: 'Rich cocoa cookie base with both milk and dark chocolate chips.',
        imageSrc: '/Frontend/cookies/Double Chocolate Cookies.jpeg',
        imageAlt: 'Double Chocolate Cookies'
    },
    {
        id: 'spritz',
        title: 'German Spritz Cookies',
        price: '$2.50 / ea',
        description: 'Delicate, pressed shortbread, often dipped in chocolate.',
        imageSrc: '/Frontend/cookies/German Spritz Cookies.jpeg',
        imageAlt: 'German Spritz Cookies'
    },
    {
        id: 'ginger',
        title: 'Ginger Cookies',
        price: '$3.00 / ea',
        description: 'Chewy, soft cookies with a strong, spicy ginger kick.',
        imageSrc: '/Frontend/cookies/Ginger Cookies.jpeg',
        imageAlt: 'Ginger Cookies'
    },
    {
        id: 'valentine',
        title: 'Valentine Sugar Cookies',
        price: '$4.50 / ea',
        description: 'Our classic sugar cookie, cut into hearts and decorated.',
        imageSrc: '/Frontend/cookies/Valentine Sugar Cookies.jpeg',
        imageAlt: 'Valentine Sugar Cookies'
    },
    {
        id: 'pinwheel',
        title: 'Chocolate Pinwheel Cookies',
        price: '$4.50 / ea',
        description: 'With swirls of chocolate and vanilla in every bite.',
        imageSrc: '/Frontend/cookies/Chocolate and Vanilla Pinwheel Cookies.jpeg',
        imageAlt: 'Pinwheel Cookies'
    },
];


const CookiesPage = () => {
    // State to trigger animations
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(true);
        }, 100); 
        return () => clearTimeout(timer);
    }, []); 

    return (
        // No <header> or <footer>, as they are in AppLayout
        <>
            <h1 className={`main-heading animated-element ${animate ? 'slide-in-up' : ''}`} style={{ animationDelay: '0.1s' }}>
                🍪 Cookies
            </h1>
            <p className={`animated-element ${animate ? 'slide-in-up' : ''}`} style={{ animationDelay: '0.2s', textAlign: 'center', fontSize: '1.1rem' }}>
                A selection of freshly baked, comforting classics.
            </p>
            
            {/* Reusing 'cake-container' class for consistent grid styling */}
            <section className="cake-container">
                {cookiesData.map((cookie, index) => (
                    // Reusing 'cake-card' class for consistent card styling
                    <div 
                        key={cookie.id}
                        className={`cake-card ${cookie.id} animated-element ${animate ? 'slide-in-up' : ''}`}
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                        <img src={cookie.imageSrc} alt={cookie.imageAlt} className="drink-img" />
                        <h2>{cookie.title}</h2>
                        <p className="price">{cookie.price}</p>
                        <p className="description">{cookie.description}</p>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                ))}
            </section>

            <div className={`cake-verification animated-element ${animate ? 'fade-in' : ''}`} style={{ animationDelay: '1.2s' }}>
                <h1>PERFECTO 👌</h1>
                <h1>Flavor in every crunch 😋</h1>
            </div>
        </>
    );
};

export default CookiesPage;