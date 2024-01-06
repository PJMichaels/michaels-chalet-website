// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Function to validate the current token
    const validateToken = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setIsLoggedIn(false);
            setIsLoading(false);
            return;
        }

        try {
            console.log('working');
            const response = await axios.post('/api/token/validate/', { token });
            console.log('working');
            if (response.data.valid) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsLoggedIn(true);
            } else {
                localStorage.clear();
                delete axios.defaults.headers.common['Authorization'];
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Token validation error', error);
            localStorage.clear();
            delete axios.defaults.headers.common['Authorization'];
            setIsLoggedIn(false);
        }
        setIsLoading(false);
    };

    // Validate token on initial load
    useEffect(() => {
        validateToken();
    }, []);

    // Provide a login function that updates the isLoggedIn state
    const login = async (username, password) => {
        try {
            const { data } = await axios.post('/api/token/', { username, password });
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login error', error);
        }
    };

    // Provide a logout function that updates the isLoggedIn state
    const logout = async () => {
        try {
            // Make the logout request to the server
            await axios.post('/api/logout/', {
                refresh_token: localStorage.getItem('refresh_token')
            }, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });

            // Clear local storage and reset axios headers
            localStorage.clear();
            delete axios.defaults.headers.common['Authorization'];

            // Update application state
            setIsLoggedIn(false);

            // Redirect to home or login page
            window.location.href = '/';
        } catch (error) {
            console.log('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout, validateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
