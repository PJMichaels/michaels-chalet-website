import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes,
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
import {AdminRoute, GuestRoute} from './components/ProtectedRoutes';
import {useAuth, AuthProvider} from './context/AuthContext'
import './App.css';
import CheckoutListPage from './pages/CheckoutListPage';
import UserManagementPage from './pages/UserManagementPage';
import UserProfilePage from './pages/UserProfile';


function AppContent() {
  const { isLoading } = useAuth(); // Use the isLoading state from the context

  if (isLoading) {
      // Show a loading indicator while checking the user's authentication status
      return <div>Loading...</div>; // Or a more elaborate spinner/indicator
  }

  return (
      <Routes>
          {/* Public routes that don't require authentication */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/booking" element={<BookingPage />} />
          {/* <Route path="/date-provisioning" element={<AvailabilityPage />} /> */}
          <Route path="/reservations" element={<ReservationPage />} />
          <Route path="/saco-river" element={<FloatPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/checkout" element={<CheckoutListPage />} />
          {/* <Route path="/stayinfo" element={<StayInfoPage />} /> */}

          {/* <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> */}
          <Route path="/stayinfo" element={<GuestRoute><StayInfoPage /></GuestRoute>} />
          <Route path="/date-provisioning" element={<AdminRoute><AvailabilityPage /></AdminRoute>} />
          <Route path="/user-management" element={<AdminRoute><UserManagementPage /></AdminRoute>} />
          <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
  );
}

function App() {
  return (
      <AuthProvider> {/* Provide the authentication context to the entire app */}
          <Router>
              <Navbar /> {/* Navbar is placed here to be visible on all routes */}
              <AppContent /> {/* Separated component to use useAuth hook */}
          </Router>
      </AuthProvider>
  );
}

export default App;