// ProtectedRoutes.js

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedGroups }) => {
    const { isLoggedIn, isLoading, userGroups } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isLoggedIn && !allowedGroups.some(group => userGroups.includes(group))) {
        return <div>You don't have permission to access this page.</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export const AdminRoute = ({ children }) => (
    <ProtectedRoute children={children} allowedGroups={['Admin']} />
);

export const GuestRoute = ({ children }) => (
    <ProtectedRoute children={children} allowedGroups={['Guest']} />
);

export const LimitedGuestRoute = ({ children }) => (
    <ProtectedRoute children={children} allowedGroups={['LimitedGuest']} />
);

export const CombinedAdminGuestRoute = ({ children }) => (
    <ProtectedRoute children={children} allowedGroups={['Admin', 'Guest']} />
);
