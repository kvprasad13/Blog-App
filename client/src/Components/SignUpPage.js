import React, { useState } from 'react';
import '../styles/SignUpPage.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import axios from 'axios';
const SignUpPage = () => {
    const [status, setStatus] = useState(0);
    const[message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 200) {
                setStatus(200);
                setMessage("User registered successfully");
                alert("User registered successfully");
            }
        } catch (error) {
            handleAxiosError(error);
        }

        // console.log('Form data submitted:', formData);
    };

    const handleAxiosError = (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 400) {
                    setStatus(200);
                    handleBadRequestError(error.response.data);
                } else {
                    alert("Something went wrong");
                }
            } else if (error.request) {
                alert("No response received from the server");
            } else {
                alert("Something went wrong not from request or response");
            }
        } else {
            alert(error.message);
        }
    };

    const handleBadRequestError = (responseData) => {
        if (typeof responseData === 'string') {
            alert(responseData);
        } else if (responseData.errors) {
            // Parse and display validation errors from responseData.errors
            const errorMessages = Object.values(responseData.errors).join('\n');
            alert(errorMessages);
        } else {
            alert("Bad request: The registration request is invalid.");
            setMessage("Bad request: The registration request is invalid.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                {/* {isRegistered && <div className='output-status'>User registered successfully</div>} */}
               
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email Id:</label>
                    <input
                        type="text"
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
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="signup-link">
                    Already user?
                    <Link to='/auth/login'>Sign In</Link>
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;