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
    
    <div className="App">
      <h1>New Requests</h1>
      <RequestTable data={requestData} refreshData={fetchData} />
      <h1>Reservation Management</h1>
      <BookingTable data={bookingData} refreshData={fetchData} />
    </div>
  );
};

export default ReservationManagementPage;