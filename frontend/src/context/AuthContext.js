// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [userGroups, setUserGroups] = useState([]);

    // function to extract user and group from token
    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            setUserEmail(decoded.email);
            setUserGroups(decoded.groups);
        } catch (error) {
            console.error('Error decoding token', error);
        }
    };

    // Function to validate the current token
    const validateToken = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUserEmail('');
            setUserGroups([]);
            return;
        }

        try {
            const response = await axios.post('/api/token/validate/', { token });
            if (response.data.valid) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsLoggedIn(true);
                decodeToken(token);
            } else {
                localStorage.clear();
                delete axios.defaults.headers.common['Authorization'];
                setIsLoggedIn(false);
                setUserEmail('');
                setUserGroups([]);
            }
        } catch (error) {
            console.error('Token validation error', error);
            localStorage.clear();
            delete axios.defaults.headers.common['Authorization'];
            setIsLoggedIn(false);
            setUserEmail('');
            setUserGroups([]);
        }
        setIsLoading(false);
    };

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
            decodeToken(data.access); // Decode token to update userGroups and userEmail
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
        <AuthContext.Provider value={{ isLoggedIn, isLoading, userEmail, userGroups, login, logout, validateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
