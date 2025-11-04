// src/components/Footer.jsx
import React from 'react';
import '../App.css';
import '../index.css';

const Footer = () => {
    return (
        <footer className="footer-container slide-in-up animated-element" style={{ animationDelay: '1.5s' }}>
            <div className="footer-message">
                "Life is what you bake it! 🎂 Serving you deliciousness, one slice at a time."
            </div>
        
            <div className="footer-grid">
                <div className="footer-links">
                    <a href="#about">About us</a>
                    <a href="#faq">FAQ</a>
                    <a href="#blog">Blog</a>
                    <a href="#contact">Contact us</a>
                    <a href="#security">Security</a>
                    <a href="#login" className="footer-login">Log in</a>
                </div>

                <div className="footer-links">
                    <a href="#cookies-config">Configure the cookies</a>
                    <a href="#terms">Terms & Conditions</a>
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#cookies-policy">Cookies Policy</a>
                    <a href="#compliance">Compliance</a>
                    <a href="#dsa">Digital Services Act</a>
                    <a href="#eaa">European Accessibility Act</a>
                </div>
            </div>
            
            <div className="footer-copyright">
                &copy; 2025 Cake Shop, Inc. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;