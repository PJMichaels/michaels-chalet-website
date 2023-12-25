// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check the local storage for an access token and update isLoggedIn accordingly
    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        setIsLoggedIn(!!access_token);
        setIsLoading(false); // Set loading to false once the check is complete
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
        <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
