// PrivateRoute.js

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isLoading, validateToken } = useAuth();
    const location = useLocation();
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const isValid = await validateToken();
            setIsValidating(!isValid); // Stop validating if the token is invalid
        };

        checkToken();
    }, [location, validateToken]); // Re-run validation when the location changes

    if (isLoading || isValidating) {
        return <div>Loading...</div>; // Or your preferred loading indicator
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
