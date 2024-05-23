import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationPage.css'

const ReservationPage = () => {

// variables for booking data to be stored or error states
    // from booking data, then assign values to those variables
    const [bookedDates, setBookingData] = useState([]);
    const [bookingError, setBookedAPIError] = useState(null);

    const [requestedDates, setRequestData] = useState([]);
    const [requestError, setRequestAPIError] = useState(null);

    // this code actually populates variables
    useEffect(() => {
        // Assume your API endpoint is 'http://yourapi.com/bookings'
        axios.get('/api/bookings/')
            .then((response) => {
                setBookingData(response.data);
            })
            .catch((err) => {
              setBookedAPIError(err.toString());
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts


    // this code actually populates variables
    useEffect(() => {
      // Assume your API endpoint is 'http://yourapi.com/bookings'
      axios.get('/api/requests/')
          .then((response) => {
              setRequestData(response.data);
          })
          .catch((err) => {
            setRequestAPIError(err.toString());
          });
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    const deleteBooking = (id) => {
      axios.delete(`/api/bookings/${id}/`)
          .then(() => {
              // Remove the deleted booking from the state
              const updatedBookings = bookedDates.filter(booking => booking.id !== id);
              setBookingData(updatedBookings);
          })
          .catch(err => {
              setBookedAPIError(err.toString());
          });
    };


    const deleteRequest = (id) => {
      axios.delete(`/api/requests/${id}/`)
          .then(() => {
              // Remove the deleted booking from the state
              const updatedRequests = requestedDates.filter(request => request.id !== id);
              setRequestData(updatedRequests);
          })
          .catch(err => {
              setRequestAPIError(err.toString());
          });
    };
  

    
    return (
      <div className='reservations-container'>
          <div className='reservations-header'>
              <h1>Pending Requests</h1>
          </div>
          {requestError && <p className="error">Error: {requestError}</p>}
          {requestedDates.length > 0 ? (
              <ul>
                  {requestedDates.map((request, index) => (
                    
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
                          <button onClick={() => deleteRequest(request.id)}>Delete</button>
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
          {bookingError && <p className="error">Error: {bookingError}</p>}
          {bookedDates.length > 0 ? (
              <ul>
                  {bookedDates.map((booking, index) => (
                    
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
                          <button onClick={() => deleteBooking(booking.id)}>Cancel Reservation</button>
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