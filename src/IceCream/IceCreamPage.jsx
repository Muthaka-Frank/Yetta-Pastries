// src/IceCream/IceCreamPage.jsx
import React, { useState, useEffect } from 'react';
import '../Home/App.css'; // Shared component styles
import '../Home/index.css'; // Global styles and variables
import './icecream.css'
// --- Ice Cream Data ---
const iceCreamData = [
    {
        id: 'chocolate',
        title: 'Chocolate',
        description: 'Rich, dark, and decadent fudge ice cream, a timeless indulgence.',
        imageSrc: '/Frontend/ice cream/chocolate ice cream.jpeg',
        imageAlt: 'A slice of rich chocolate fudge ice cream.'
    },
    {
        id: 'pineapple',
        title: 'Pineapple',
        description: 'A Fruity Dessert That Screams Summer.',
        imageSrc: '/Frontend/ice cream/Pineapple Ice Cream.jpeg',
        imageAlt: 'A scoop of Summer.'
    },
    {
        id: 'coconut',
        title: 'Coconut',
        description: 'Subtle coconut flavor with a striking creamy hue.',
        imageSrc: '/Frontend/ice cream/coconut ice cream.jpeg',
        imageAlt: 'Coconut just like Mombasa.'
    },
    {
        id: 'lemon',
        title: 'Lemon Custard',
        description: 'Bright, zesty, and refreshing—a tart and sweet citrus delight.',
        imageSrc: '/Frontend/ice cream/Lemon Custard Ice Cream.jpeg',
        imageAlt: 'A bright lemon Ice Cream with glaze.'
    },
    {
        id: 'mango',
        title: 'Mango',
        description: 'Moist dessert studded with sweet mango flakes.',
        imageSrc: '/Frontend/ice cream/mango ice cream.jpeg',
        imageAlt: 'A mango flavored icecream.'
    },
    {
        id: 'orange',
        title: 'Orange',
        description: 'A tropical blend of sweet pineapple and creamy coconut with a hint of rum flavor.',
        imageSrc: '/Frontend/ice cream/orange ice cream.jpeg',
        imageAlt: 'orange like the color.'
    },
    {
        id: 'passion',
        title: 'Passion',
        description: "It's the seedy season.",
        imageSrc: '/Frontend/ice cream/passion ice cream.jpeg',
        imageAlt: 'passion.'
    },
    {
        id: 'strawberry',
        title: 'Strawberry',
        description: "Match your tongue's energy.",
        imageSrc: '/Frontend/ice cream/strawberry ice cream.jpeg',
        imageAlt: 'Rizzard of berries.'
    },
    {
        id: 'vanilla',
        title: 'Vanilla',
        description: 'One of a kind flavor.',
        imageSrc: '/Frontend/ice cream/vanilla (2).jpeg',
        imageAlt: 'Try with vanilla yorghut.'
    },
];

const IceCreamPage = () => {
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
                🍦 Our Signature Ice Cream Flavors 🍨
            </h1>
            
            <section className="icecream-container">
                {iceCreamData.map((cream, index) => (
                    // This div acts as the "Ice Cream Card"
                    <div 
                        key={cream.id}
                        className={`icecream-card ${cream.id} animated-element ${animate ? 'slide-in-up' : ''}`}
                        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                        <img src={cream.imageSrc} alt={cream.imageAlt} width="200" height="auto" />
                        <h2>{cream.title}</h2>
                        <p>{cream.description}</p>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                ))}
            </section>

            <div className={`icecream-verification animated-element ${animate ? 'fade-in' : ''}`} style={{ animationDelay: '1.2s' }}>
                <h2>DELIGHT 😍</h2>
                <h2>Dessert full of delight 😌</h2>
            </div>
        </>
    );
};

export default IceCreamPage;