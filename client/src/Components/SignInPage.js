import React, { useState } from 'react';
import '../styles/SignInPage.css'; // Import the CSS file

const SignInPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: inputValue,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform sign-in logic here
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="signin-form">
                <div className="input-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group remember-me">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div className="forgot-password">
                    <a href="#">Forgot password?</a>
                </div>
                <div className="signup-link">
                    Don't have an account? <a href="#">Sign Up</a>
                </div>
                <button type="submit" className="signin-button">Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;
