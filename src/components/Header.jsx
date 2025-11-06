// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // 👈 Import Link
import '../Home/App.css'; // Assuming styles are shared
import '../Home/index.css';

// This is the header from your App.jsx
const Header = () => {
    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    {/* Link to the Home page */}
                    <Link to="/">
                        <img src="/Frontend/images/logo 2.png" alt="Yetta's Bakery Logo" width="150" height="auto" /> 
                    </Link>
                </div>

                <div className="dropdown">
                    <button>Menu</button>
                    <div className="dropdown-content">
                        {/* Links to your other pages */}
                        <Link to="/cakes">Cakes</Link>
                        <Link to="/icecream">Ice Cream</Link>
                        <Link to="/cookies">Cookies</Link>
                        <Link to="/drinks">Drinks</Link>
                        <Link to="/specials">Customs / Specials</Link>
                    </div>
                </div>

                <nav className="navigation">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/help">Help Center</Link></li>
                        <li><Link to="/account">Account</Link></li>
                    </ul>
                </nav>

                <div className="search-container">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">Search</button>
                </div>

                <div className="login">
                    <Link to="/login" className="nav-login-btn">Customer Login</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;