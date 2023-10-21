import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationPage.css'

const ReservationPage = () => {

// variables for booking data to be stored or error states
    // from booking data, then assign values to those variables
    const [bookedDates, setBookingData] = useState([]);
    const [bookingError, setBookedAPIError] = useState(null);

    // this code actually populates variables
    useEffect(() => {
        // Assume your API endpoint is 'http://yourapi.com/bookings'
        axios.get('/api/bookings/')
            .then((response) => {
                setBookingData(response.data);
            })
            .catch((err) => {
              bookingError(err.toString());
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
  

    
    return (
      <div className='reservations-container'>
          <div className='reservations-header'>
              <h1>Booking Data</h1>
          </div>
          {bookingError && <p className="error">Error: {bookingError}</p>}
          {bookedDates.length > 0 ? (
              <ul>
                  {bookedDates.map((booking, index) => (
                    
                      <li key={booking.id}>
                        <div className='bookingItem'>
                          <div className='bookingLeftSide'>
                            <h2>{booking.name}</h2>
                            <p>Booking Dates: {booking.start_date} - {booking.end_date}</p>
                            <p>Group Size: {booking.group_size}</p>
                          </div>
                          <div className='bookingRightSide'>
                            <p>Message: <br></br>{booking.note}</p>
                            {/* Add other booking details you'd like to display here */}
                          </div>
                          <button onClick={() => deleteBooking(booking.id)}>Delete</button>
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