// src/Drinks/DrinksPage.jsx
import React, { useState, useEffect } from 'react';
import '../Home/App.css'; // Shared component styles
import '../Home/index.css'; // Global styles and variables
import './drinks.css'
// --- Drinks Data ---
const drinksData = [
    {
        id: 'water',
        title: 'Water',
        price: '$1.00',
        description: 'Still or sparkling, served chilled.',
        imageSrc: '/Frontend/drinks/water.jpeg',
        imageAlt: 'Water Bottle'
    },
    {
        id: 'mojito',
        title: 'Classic Mojito',
        price: '$5.50',
        description: 'Fresh mint, lime, sugar, and sparkling soda.',
        imageSrc: '/Frontend/drinks/Classic Mojito Mocktail.jpeg',
        imageAlt: 'Classic Mojito'
    },
    {
        id: 'mango',
        title: 'Mango Juice',
        price: '$4.00',
        description: 'Thick, sweet, and tropical mango puree.',
        imageSrc: '/Frontend/drinks/Mango juice.jpeg',
        imageAlt: 'Mango Juice'
    },
    {
        id: 'passion-smoothie',
        title: 'Passion Fruit Smoothie',
        price: '$6.00',
        description: 'Creamy blend of tart passion fruit and yogurt.',
        imageSrc: '/Frontend/drinks/Passion Fruit Smoothie.jpeg',
        imageAlt: 'Passion Fruit Smoothie'
    },
    {
        id: 'pineapple',
        title: 'Pineapple Juice',
        price: '$3.50',
        description: 'Freshly squeezed, tangy, and sweet.',
        imageSrc: '/Frontend/drinks/Pineapple juice.jpeg',
        imageAlt: 'Pineapple Juice'
    },
    {
        id: 'soft-drinks',
        title: 'Soft Drinks',
        price: '$2.50',
        description: 'Assorted bottled sodas (Coke, Sprite, Fanta).',
        imageSrc: '/Frontend/drinks/Soft Drinks.jpeg',
        imageAlt: 'Soft Drinks'
    },
    {
        id: 'tropical-orange',
        title: 'Tropical Orange',
        price: '$4.50',
        description: 'A blend of orange, mango, and a hint of ginger.',
        imageSrc: '/Frontend/drinks/Tropical Orange.jpeg',
        imageAlt: 'Tropical Orange Juice'
    },
    {
        id: 'watermelon',
        title: 'Watermelon Juice',
        price: '$3.75',
        description: 'Cooling, hydrating, and naturally sweet.',
        imageSrc: '/Frontend/drinks/watermelon juice.jpeg',
        imageAlt: 'Watermelon Juice'
    },
    {
        id: 'iced-tea',
        title: 'Vanilla Strawberry Iced Tea',
        price: '$3.75',
        description: 'Cooling, hydrating, and naturally sweet.',
        imageSrc: '/Frontend/drinks/Vanilla Strawberry Iced Tea.jpeg',
        imageAlt: 'Vanilla Strawberry Iced Tea'
    },
];


const DrinksPage = () => {
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
                🍹 Drinks
            </h1>
            <p className={`animated-element ${animate ? 'slide-in-up' : ''}`} style={{ animationDelay: '0.2s', textAlign: 'center', fontSize: '1.1rem' }}>
                Refreshing drinks to complement your perfect pastry.
            </p>
            
            {/* Reusing 'cake-container' class for consistent grid styling */}
            <div className="cake-container"> 
                {drinksData.map((drink, index) => (
                    // Reusing 'cake-card' class for consistent card styling
                    <div 
                        key={drink.id}
                        className={`cake-card ${drink.id} animated-element ${animate ? 'slide-in-up' : ''}`}
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                        <img src={drink.imageSrc} alt={drink.imageAlt} className="drink-img" width="200" height="auto" />
                        <h2>{drink.title}</h2>
                        <p className="price">{drink.price}</p>
                        <p className="description">{drink.description}</p>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                ))}
            </div>

            <div className={`cake-verification animated-element ${animate ? 'fade-in' : ''}`} style={{ animationDelay: '1.2s' }}>
                <h1>AAAHH</h1>
                <p>Leaves you cool and refreshed. 🙂‍↔️</p>
            </div>
        </>
    );
};

export default DrinksPage;