import React, { useState } from 'react';
import './index.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignInPage = ({ user, setUser }) => {
    const [formData, setFormData] = useState({
        usernameOrEmailId: '',
        password: '',
        rememberMe: false,
    });

    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: inputValue,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formData.usernameOrEmailId, formData.password);
        try {
            const response = await axios.post('http://localhost:8000/api/accounts/login', {

                usernameOrEmailId: formData.usernameOrEmailId,
                password: formData.password,
            });
            // console.log(response);


            if (response.status === 200) {
                // console.log(response.data.accessToken);
                const accessToken = response.data.accessToken;
                // console.log("Access Token:", accessToken);
                // sessionStorage.setItem('access_token', accessToken);
                const getUserDetails = async () => {
                    try {
                        // console.log('getting current user..........');
                        const response = await axios.get('http://localhost:8000/api/accounts/current', {

                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        });


                        if (response.status === 200) {
                            // console.log(response.data);
                            //username,email,id
                            // sessionStorage.setItem('user', JSON.stringify({ ...response.data }));
                            localStorage.setItem('user', JSON.stringify( { ...response.data, accessToken }));
                            // console.log(localStorage.getItem('user'));
                            navigate('/');
                            
                            // const currentUser = JSON.parse(sessionStorage.getItem('user'));
                            // console.log(currentUser.id, currentUser.email, currentUser.username);
                            // console.log();

                        }
                    }
                    catch (err) { console.log(err) }
                };

                getUserDetails();

                // console.log(userDetails);

            }
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {

                    alert("Bad Request: " + error.response.data);
                } else if (error.response.status === 401) {
                    // Handle other HTTP error statuses here
                    console.log(error.response);

                    alert("Status: " + error.response.status + "\n" + error.response.statusText + ": " + error.response.data);
                }
                else {
                    alert("Status: " + error.response.status + "\n" + error.response.statusText + ": " + error.response.data);
                }
            } else {

                alert("Status: " + error.response.status + "\n" + error.response.statusText + ": " + error.response.data);
            }
        }

    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="signin-form">
                <div className="input-group">
                    <label htmlFor="usernameOrEmailId">Username or Email Id:</label>
                    <input
                        type="text"
                        id="usernameOrEmailId"
                        name="usernameOrEmailId"
                        autoComplete="usernameOrEmailId "
                        value={formData.usernameOrEmailId}
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
                        autoComplete="password"
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
                    Don't have an account?  <Link to='/auth/register'>Sign Up</Link>
                </div>
                <button type="submit" className="signin-button">Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;
