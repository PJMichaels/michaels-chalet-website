import React from 'react';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = () => {     
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');     
    const navigate = useNavigate(); // Hook for navigation

    // Create the submit method.
    const submit = async e => {
        e.preventDefault();          
        const user = { username, password };

        try {
            // Create the POST request
            const { data } = await axios.post(
                '/api/token/',
                user,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            // Initialize the access & refresh token in localstorage.
            localStorage.setItem('access_token', data.access);         
            localStorage.setItem('refresh_token', data.refresh);         
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

            navigate('/'); // Navigate to home page on successful login
        } catch (error) {
            // Handle login error (e.g., incorrect credentials, server issue)
            console.error('Login error', error);
            // Potentially update the state to show an error message to the user
        }    
    };    
        
    return (      
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={submit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input 
                            className="form-control mt-1" 
                            placeholder="Enter Username" 
                            name="username"  
                            type="text" 
                            value={username}
                            required 
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input 
                            name="password" 
                            type="password"     
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
