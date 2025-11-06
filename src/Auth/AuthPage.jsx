// src/Auth/AuthPage.jsx
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import * as api from '../services/api.js'; // Import your separated "backend" file

// Import styles (we'll add classes to App.css)
import '../Home/App.css';
import '../Home/index.css';

const AuthPage = () => {
    // State to toggle between Login and Sign Up
    const [isLoginMode, setIsLoginMode] = useState(true);
    
    // State for form inputs
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    
    // State for error/success messages
    const [message, setMessage] = useState('');

    // --- Google Login Handlers ---
    const handleGoogleSuccess = async (credentialResponse) => {
        setMessage('Verifying with Google...');
        try {
            // Send the Google token to your backend for verification
            const result = await api.verifyGoogleToken(credentialResponse.credential);
            
            if (result.success) {
                setMessage(`Login successful! Welcome, ${result.user.name}.`);
                // Here you would typically save the token (result.token)
                // and redirect to the user's account page.
                // e.g., auth.login(result.token);
                // navigate('/account-dashboard');
            } else {
                setMessage(result.message || 'Google login failed.');
            }
        } catch (error) {
            setMessage('An error occurred during Google login.');
        }
    };

    const handleGoogleError = () => {
        setMessage('Google login failed. Please try again.');
    };

    // --- Email/Password Form Handlers ---
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setMessage('Logging in...');
        try {
            const result = await api.loginWithEmail(loginEmail, loginPassword);
            if (result.success) {
                setMessage(`Login successful! Welcome back.`);
                // Save token, redirect, etc.
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage('Login failed. Please check your connection.');
        }
    };
    
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (signupPassword.length < 6) {
            setMessage('Password must be at least 6 characters.');
            return;
        }
        setMessage('Creating account...');
        try {
            const result = await api.signupWithEmail(signupName, signupEmail, signupPassword);
            if (result.success) {
                setMessage(`Account created! Welcome, ${result.user.name}.`);
                // Save token, redirect, etc.
            } else {
                setMessage(result.message);
            }
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        }
    };

    return (
        <div className="auth-container animated-element slide-in-up">
            <h1>Welcome to Yetta's Pastries 🍰</h1>

            {/* --- Google Login Button --- */}
            <div className="google-login-container">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    theme="outline"
                    size="large"
                    shape="rectangular"
                    text="signin_with"
                    logo_alignment="left"
                />
            </div>
            
            <hr className="divider" />

            {/* --- Conditional Forms --- */}
            {isLoginMode ? (
                /* --- Login Form --- */
                <form id="login-form" className="auth-form" onSubmit={handleLoginSubmit}>
                    <h2>Login with Email</h2>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required 
                    />
                    <button type="submit">Log In</button>
                    <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginMode(false); setMessage(''); }}>Sign Up here.</a></p>
                </form>
            ) : (
                /* --- Sign Up Form --- */
                <form id="signup-form" className="auth-form" onSubmit={handleSignupSubmit}>
                    <h2>Create an Account</h2>
                    <input 
                        type="text" 
                        placeholder="Full Name"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password (min 6 chars)" 
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required 
                    />
                    <button type="submit">Sign Up</button>
                    <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginMode(true); setMessage(''); }}>Log In here.</a></p>
                </form>
            )}

            {/* Message area for errors or success */}
            {message && <p id="message-area">{message}</p>}
        </div>
    );
};

export default AuthPage;