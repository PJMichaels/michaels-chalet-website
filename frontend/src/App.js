import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AvailabilityPage from './pages/AvailabilityPage';
import BookingPage from './pages/BookingPage';
import ReservationPage from './pages/ReservationPage';
import FloatPage from './pages/FloatPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/lp-admin" element={<AvailabilityPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/saco-river" element={<FloatPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
};

export default App;