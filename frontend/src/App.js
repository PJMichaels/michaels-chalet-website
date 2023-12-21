import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import AvailabilityPage from './pages/AvailabilityPage';
import BookingPage from './pages/BookingPage';
import ReservationPage from './pages/ReservationPage';
import FloatPage from './pages/FloatPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import StayInfoPage from './pages/StayInfoPage';
import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import './App.css';
import CheckoutListPage from './pages/CheckoutListPage';

const App = () => {

  // set authentication variable
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  
  // check for local access token
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('access_token');
      setIsAuth(token !== null);
      setIsLoading(false); // Set loading to false once the check is complete
    };
  
    checkAuthStatus();
  }, []);

  return (
    <Router>
      {/* {isAuth ? <Navbar /> : <Login/>} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/lp-admin" element={<PrivateRoute Page = {AvailabilityPage} auth = {isAuth} loading = {isLoading} />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/saco-river" element={<FloatPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/checkout" element={<CheckoutListPage />} />
        <Route path="/stayinfo" element={<StayInfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;


function PrivateRoute({Page, auth , loading}) {
  const location = useLocation(); // Hook to access the current location
  
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  return (
    auth ? <Page/> : 
    <Navigate to="/login" />
  );
}