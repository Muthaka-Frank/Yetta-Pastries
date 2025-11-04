// src/Cake/cake.jsx
import React from 'react';
// 1. FIXED CSS PATHS: Go up from 'Cake' then down into 'Home'
import '../App.css'; 
import '../index.css';
import './cake.css';

// 2. REMOVED: Broken import for 'CakeCard.jsx' (it's not used)

// --- Cake Data ---
const cakeMenuData = [
    {
        id: 'chocolate',
        title: 'Chocolate',
        description: 'Rich, dark, and decadent fudge cake, a timeless indulgence.',
        imageSrc: '/Frontend/cakes/chocolate_cake.jpg.jpg',
        imageAlt: 'A slice of rich chocolate fudge cake.'
    },
    {
        id: 'vanilla',
        title: 'Vanilla Bean',
        description: 'Light and fluffy sponge infused with real vanilla bean. Perfect with any filling.',
        imageSrc: '/Frontend/cakes/vanilla_cake.jpg.jpg',
        imageAlt: 'A piece of vanilla bean cake.'
    },
    {
        id: 'red-velvet',
        title: 'Red Velvet',
        description: 'Subtle cocoa flavor with a striking red hue, paired with tangy cream cheese frosting.',
        imageSrc: '/Frontend/cakes/red_velvet_cake.jpg.jpg',
        imageAlt: 'Red velvet cake with cream cheese frosting.'
    },
    {
        id: 'lemon',
        title: 'Lemon Zest',
        description: 'Bright, zesty, and refreshing—a tart and sweet citrus delight.',
        imageSrc: '/Frontend/cakes/lemon_cake.jpg.jpg',
        imageAlt: 'A bright lemon cake with glaze.'
    },
    {
        id: 'coconut',
        title: 'Coconut Dream',
        description: 'Moist cake studded with sweet coconut flakes and a creamy filling.',
        imageSrc: '/Frontend/cakes/coconut_cake.jpg.jpg',
        imageAlt: 'A white layer cake topped with shredded coconut.'
    },
    {
        id: 'pina-colada',
        title: 'Piña Colada',
        description: 'A tropical blend of sweet pineapple and creamy coconut with a hint of rum flavor.',
        imageSrc: '/Frontend/cakes/pina_colada_cake.jpg.jpg',
        imageAlt: 'Tropical cake with pineapple and coconut.'
    },
    {
        id: 'orange',
        title: 'Orange',
        description: 'A juicy splash.',
        imageSrc: '/Frontend/cakes/Orange cake.jpeg',
        imageAlt: 'Orange cake.'
    },
    {
        id: 'butter',
        title: 'Butter',
        description: 'Soft cushy and tasty.',
        imageSrc: '/Frontend/cakes/Butter cake.jpeg',
        imageAlt: 'Butter cake.'
    },
    {
        id: 'cinnamon',
        title: 'Cinnamon',
        description: 'Cinnamon full of swirl equal double trouble.',
        imageSrc: '/Frontend/cakes/Cinnamon Swirl Bundt Cake.jpeg',
        imageAlt: 'Cinnamon Swirl Bundt Cake.'
    },
];

// Renamed component to match file name
const CakesPage = () => {
    return (
        // You don't need <main> here because the <AppLayout> already has it.
        <>
            <h1 className="main-heading animated-element slide-in-up">🍰 Our Signature Cake Flavors 🎂</h1>
            
            <section className="cake-container">
                {cakeMenuData.map((cake, index) => (
                    // This div acts as the "Cake Card"
                    <div 
                        key={cake.id}
                        className={`cake-card ${cake.id} animated-element slide-in-up`}
                        style={{ animationDelay: `${0.1 * index}s` }}
                    >
                        <img src={cake.imageSrc} alt={cake.imageAlt} width="200" height="auto" />
                        <h2>{cake.title}</h2>
                        <p>{cake.description}</p>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                ))}
            </section>

            <div className="cake-verification animated-element fade-in" style={{ animationDelay: '1s' }}>
                <h2>VERIFIED ✅</h2>
                <h2>You are a sweet tooth 😌</h2>
            </div>
        </>
    );
};

export default CakesPage;