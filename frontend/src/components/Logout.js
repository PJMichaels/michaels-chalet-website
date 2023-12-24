// Logout.js

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth from your AuthContext

const Logout = () => {
    const { logout } = useAuth(); // Get the logout function from the context

    useEffect(() => {
        // Call the logout function from the context when the component is rendered
        logout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // The empty dependency array ensures this effect runs only once on mount

    return (
        <div>Logging out...</div> // You can add a spinner or message here if you like
    );
};

export default Logout;
