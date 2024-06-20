// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userGroups, setUserGroups] = useState([]);

    // function to extract user and group from token

    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            setUserID(decoded.user_id || '');
            setUserEmail(decoded.email || '');
            setUserName(decoded.name || '');
            setUserGroups(decoded.groups || []);
        } catch (error) {
            console.error('Error decoding token', error);
            setUserID('');
            setUserEmail('');
            setUserName('');
            setUserGroups([]); // Fallback to default values
        }
    };

    // Function to validate the current token
    const validateToken = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setIsLoggedIn(false);
            setUserID('');
            setUserEmail('');
            setUserName('');
            setUserGroups([]); // Ensure default values are set
            setIsLoading(false);
            return;
        }
    
        decodeToken(token); // Decode immediately to set userGroups
    
        try {
            const response = await axios.post('/api/token/validate/', { token });
            if (response.data.valid) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsLoggedIn(true);
            } else {
                handleLogout(); // Refactor logout steps into a separate function
            }
        } catch (error) {
            console.error('Token validation error', error);
            handleLogout();
        }
        setIsLoading(false);
    };

    useEffect(() => {
        validateToken();
    }, []);

    // Provide a login function that updates the isLoggedIn state
    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/token/', { email, password });
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            setIsLoggedIn(true);
            decodeToken(data.access); // Decode token to update userGroups and userEmail
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
        setIsLoggedIn(false);
        setUserID('');
        setUserEmail('');
        setUserName('');
        setUserGroups([]);
        window.location.href = '/';
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
    
            // Use the common logout handler
            handleLogout();
        } catch (error) {
            console.log('Logout failed', error);
            // Even in case of error, it might be safe to clean up the local state
            handleLogout();
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, userID, userEmail, userName, userGroups, login, logout, validateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
