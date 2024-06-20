import React, { useState, useEffect } from 'react';
import BookingTable from '../components/BookingTable';
import RequestTable from '../components/RequestTable';
import { fetchBookingsData, fetchRequestsData } from '../utilities/api_funcs';

const ReservationManagementPage = () => {

  const [bookingData, setBookingData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


   // Function to fetch data from both APIs
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

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  
  // If loading, show a loading message
  if (loading) return <div>Loading...</div>;

  // If there's an error, show an error message
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bg-black bg-opacity-80 p-4 m-8 rounded-sm shadow-lg'>
      <h1 className='text-white text-2xl border-b-2 m-2'>Reservation Management</h1>
      <br></br>
      <h2 className='text-white text-xl m-2'>New Requests</h2>
      <RequestTable data={requestData} refreshData={fetchData} />
      <div className='border-b-4 my-8'><br></br></div>
      <h2 className='text-white text-xl m-2'>Confirmed Bookings</h2>
      <BookingTable data={bookingData} refreshData={fetchData} />
    </div>
  );
};

export default ReservationManagementPage;