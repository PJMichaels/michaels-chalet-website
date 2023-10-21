import React, { useState, useEffect } from 'react';
import BookingCalendar from "../components/BookingCalendar";
import axios from 'axios';

const ContactPage = () => {
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

    // const allowedRanges = allowedData.map((entry, index) => 
    // ({'start': new Date(entry.start_date), 'end': new Date(entry.end_date)})
    // );


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

    const Calendar = BookingCalendar(allowedData, bookedDates)

  return (
    <div>
      {Calendar}
    </div>
  );
};

export default ContactPage;