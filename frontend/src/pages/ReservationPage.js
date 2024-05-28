import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchMyBookingsData, fetchMyRequestsData } from '../utilities/api_funcs';
import './ReservationPage.css'

const ReservationPage = () => {

// variables for booking data to be stored or error states
    // from booking data, then assign values to those variables
    const [bookingData, setBookingData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch data from both APIs
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
          const [bookingData, requestData] = await Promise.all([fetchMyBookingsData(), fetchMyRequestsData()]);
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

  // Need to update this to create a cancellation request
  const deleteRequest = (id) => {
    axios.delete(`/api/requests/${id}/`)
        .then(() => {
            // Refresh data
            console.log('Deleted Request')
            fetchData();
        })
        .catch(err => {
            setError(err.message);
        });
  };
  
    return (
      <div className='reservations-container'>
          <div className='reservations-header'>
              <h1>Pending Requests</h1>
          </div>
          {/* {requestError && <p className="error">Error: {requestError}</p>} */}
          {requestData.length > 0 ? (
              <ul>
                  {requestData.map((request, index) => (
                    
                      <li key={request.id}>
                        <div className='bookingItem'>
                          <div className='bookingLeftSide'>
                            <h2>{request.created_by}</h2>
                            <p>Booking Dates: {request.arrival_date} - {request.departure_date}</p>
                            <p>Group Size: {request.group_size}</p>
                          </div>
                          <div className='bookingRightSide'>
                            <p>Message: <br></br>{request.request_message}</p>
                            {/* Add other booking details you'd like to display here */}
                          </div>
                          <button onClick={() => deleteRequest(request.id)}>Cancel</button>
                        </div>
                      </li>
                  ))}
              </ul>
          ) : (
              <p className="no-bookings">No pending requests.</p>
          )}
          <br></br>
      <div className='reservations-header'>
              <h1>Confirmed Reservations</h1>
          </div>
          {/* {bookingError && <p className="error">Error: {bookingError}</p>} */}
          {bookingData.length > 0 ? (
              <ul>
                  {bookingData.map((booking, index) => (
                    
                      <li key={booking.id}>
                        <div className='bookingItem'>
                          <div className='bookingLeftSide'>
                            <h2>{booking.created_by}</h2>
                            <p>Booking Dates: {booking.arrival_date} - {booking.departure_date}</p>
                            <p>Group Size: {booking.group_size}</p>
                          </div>
                          <div className='bookingRightSide'>
                            <p>Message: <br></br>{booking.request_message}</p>
                            {/* Add other booking details you'd like to display here */}
                          </div>
                          {/* <button onClick={() => deleteBooking(booking.id)}>Cancel Reservation</button> */}
                        </div>
                      </li>
                    
                  ))}
              </ul>
          ) : (
              <p className="no-bookings">No bookings available.</p>
          )}
      </div>
      
  );
};

export default ReservationPage;