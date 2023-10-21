// BookingData.js

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TestPage.css'
import axios from 'axios';


const TestPage = () => {
    
    // variables for available dates to be stored or error states
    // from available data, then assign values to those variables
    const [allowedData, setAllowedData] = useState([]);
    const [allowedError, setAllowedError] = useState(null);

    // Queries available api and populate variables
    useEffect(() => {
        // Assume your API endpoint is 'http://yourapi.com/bookings'
        axios.get('/api/available/')
            .then((response) => {
                setAllowedData(response.data);
            })
            .catch((err) => {
                setAllowedError(err.toString());
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    const allowedRanges = allowedData.map((entry, index) => 
    ({'start': new Date(entry.start_date), 'end': new Date(entry.end_date)})
    );


    // variables for booking data to be stored or error states
    // from booking data, then assign values to those variables
    const [bookedDates, setBookedDates] = useState([]);
    const [bookingError, setBookingError] = useState(null);

    // this code actually populates variables
    useEffect(() => {
        // Assume your API endpoint is 'http://yourapi.com/bookings'
        axios.get('/api/bookings/')
            .then((response) => {
                setBookedDates(response.data);
            })
            .catch((err) => {
                setBookingError(err.toString());
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts


    const [selectedDates, setDates] = React.useState([new Date(), new Date()]);

    const handleDateChange = newDates => {
        setDates(newDates);
    };

    function setAvailableDates(availabilityAPIData, bookedAPIData) {
        let dateRanges = Array()
    };


    function isDateInRange(date, start, end) {
        return date >= start && date <= end;
      };
      
    function isDateDisabled({ date, view }) {
        if (view !== 'month') {
          return false;
        }
      
        return !allowedRanges.some(range => 
          isDateInRange(date, range.start, range.end)
        );
      };

    function tileClassLogic({ date, view }) {
        // Check if the tile is a day in month view and if it's a Sunday
        if (view === 'month' && date.getDay() === 0) {
          return 'highlighted-sunday';
        }
      }

    return (
        <div>
            <Calendar 
                onChange={handleDateChange}
                value={selectedDates}
                tileDisabled={isDateDisabled}
                selectRange={true}
                tileClassName={tileClassLogic}
                />
            <label> Selected Start Date: {selectedDates[0].toString()} </label>
            <label> Selected End Date: {selectedDates[1].toString()} </label>
            <h1>Booking Data</h1>
            {bookingError && <p>Error: {bookingError}</p>}
            {bookedDates.length > 0 ? (
                <ul>
                    {bookedDates.map((booking, index) => (
                        <li key={index}>
                            <h2>{booking.name}</h2>
                            <p>Start Date: {booking.start_date}</p>
                            <p>End Date: {booking.end_date}</p>
                            <p>Note: {booking.note}</p>
                            {/* Add other booking details you'd like to display here */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings available.</p>
            )}
        </div>
    );
};

export default TestPage;