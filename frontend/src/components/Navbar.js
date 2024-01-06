import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // Access isLoggedIn and logout from context

  return (
    <nav>
      <ul>
        {/* ... Public Links ... */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/booking">Booking</Link></li>
        {/* <li><Link to="/gallery">Photo Gallery</Link></li> */}
        <li><Link to="/saco-river">Saco River Tubing</Link></li>
        {/* <li><Link to="/contact">Contact</Link></li> */}
        {/* <li><Link to="/about">About</Link></li> */}
        {/* Conditional link for Login/Logout */}
        {!isLoggedIn ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <div>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/stayinfo">Stay Info</Link></li>
          <li><Link to="/checkout">Checkout Info</Link></li>
          <li>
            {/* Use the logout function directly */}
            <button onClick={logout}>Logout</button>
          </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;