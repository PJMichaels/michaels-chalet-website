import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



const Navbar = () => {

  // Need to include isLoading to delay load..
  const { isLoggedIn, isLoading, logout, userGroups } = useAuth();

  const isAdmin = isLoggedIn && userGroups.includes('Admin');
  const isAdminOrGuest = isLoggedIn && (userGroups.includes('Admin') || userGroups.includes('Guest'));
  const isGuest = isLoggedIn && userGroups.includes('Guest');
  const isLimitedGuest = isLoggedIn && userGroups.includes('LimitedGuest');

  const AdminRoutes = () => {
    return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/date-provisioning">Date Provisioning</Link></li>
      <li><Link to="/booking">Book Dates</Link></li>
      <li><Link to="/saco-river">Saco River Tubing</Link></li>
      <li><Link to="/reservations">Reservations</Link></li>
      <li><Link to="/stayinfo">Stay Info</Link></li>
      <li><Link to="/checkout">Checkout Info</Link></li>
      <li><button onClick={logout}>Logout</button></li>
    </ul>
    );
  }

  const GuestRoutes = () => {
    return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/saco-river">Saco River Tubing</Link></li>
      <li><Link to="/booking">Book Dates</Link></li>
      <li><Link to="/reservations">Reservations</Link></li>
      <li><Link to="/stayinfo">Stay Info</Link></li>
      <li><Link to="/checkout">Checkout Info</Link></li>
      <li><button onClick={logout}>Logout</button></li>
    </ul>
    );
  }

  const LimitedGuestRoutes = () => {
    return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/saco-river">Saco River Tubing</Link></li>
      <li><Link to="/reservations">Reservations</Link></li>
      <li><Link to="/stayinfo">Stay Info</Link></li>
      <li><Link to="/checkout">Checkout Info</Link></li>
      <li><button onClick={logout}>Logout</button></li>
    </ul>
    );
  }

  const PublicRoutes = () => {
    return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/saco-river">Saco River Tubing</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
    );
  }

  const LoadingIndicator = () => (
    <ul>
      <li>Loading...</li>
    </ul>
  );
  
  // return (
  //   <nav>
  //     <ul>
        
  //       {/* Should be split between 2 links for view all or view user */}
  //       {isGuest && (
  //             <li><Link to="/booking">Book Dates</Link></li>
  //           )}
  //       <li><Link to="/saco-river">Saco River Tubing</Link></li>
  //       {/* <li><Link to="/gallery">Photo Gallery</Link></li> */}
  //       {/* <li><Link to="/contact">Contact</Link></li> */}
  //       {/* <li><Link to="/about">About</Link></li> */}
  //       {/* Conditional link for Login/Logout */}
  //       {!isLoggedIn ? (
  //         <li><Link to="/login">Login</Link></li>
  //       ) : (
  //         <div>
  //         <li><Link to="/date-provisioning">Date Provisioning</Link></li>
  //         <li><Link to="/reservations">Reservations</Link></li>
  //         <li><Link to="/stayinfo">Stay Info</Link></li>
  //         <li><Link to="/checkout">Checkout Info</Link></li>
  //         <li>
  //           {/* Use the logout function directly */}
  //           <button onClick={logout}>Logout</button>
  //         </li>
  //         </div>
  //       )}
  //     </ul>
  //   </nav>
  // );

  return (
    <nav>
      {
      isAdmin ? <AdminRoutes /> :
      isGuest ? <GuestRoutes />:
      isLimitedGuest ? <LimitedGuestRoutes />:
      <PublicRoutes />

      }
    </nav>
  );
};

export default Navbar;