// PrivateRoute.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading state while authentication status is determined
    }

    if (!isLoggedIn) {
        // If the user is not logged in, redirect to the login page and remember the current location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children; // If the user is logged in, render the children components
};

export default PrivateRoute;
