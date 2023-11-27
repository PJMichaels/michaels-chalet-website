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
import ToDoPage from './pages/ToDoPage';
import TestPage from './pages/TestPage';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/saco-river" element={<FloatPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/todo" element={<ToDoPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
};

export default App;