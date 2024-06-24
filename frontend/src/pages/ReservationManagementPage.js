// src/pages/ReservationManagementPage.js
import React, { useState, useEffect } from 'react';
import BookingTable from '../components/BookingTable';
import RequestTable from '../components/RequestTable';
import { fetchBookingsData, fetchRequestsData } from '../utilities/api_funcs';

const ReservationManagementPage = () => {
  const [bookingData, setBookingData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingData, requestData] = await Promise.all([fetchBookingsData(), fetchRequestsData()]);
      setBookingData(bookingData);
      setRequestData(requestData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bg-black bg-opacity-80 p-4 sm:p-3 md:p-6 lg:p-8 m-8 rounded-lg shadow-lg'>
      <h1 className='text-white text-2xl border-b-2 mb-4'>Reservation Management</h1>
      <h2 className='text-white text-xl mb-4'>New Requests</h2>
      <RequestTable data={requestData} refreshData={fetchData} />
      <div className='border-b-4 my-8'></div>
      <h2 className='text-white text-xl mb-4'>Confirmed Bookings</h2>
      <BookingTable data={bookingData} refreshData={fetchData} />
    </div>
  );
};

export default ReservationManagementPage;
