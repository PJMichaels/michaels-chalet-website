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
            await validateToken();
            setIsValidating(false); // Stop validating when complete
        };
        checkToken();
    }, [location, validateToken]); // Re-run validation when the location changes

    if (isLoading || isValidating) {
        // eventually get a fun loading indicator
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
