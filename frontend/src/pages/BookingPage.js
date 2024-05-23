import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import RequestForm from "../components/RequestForm";
import BookingCalendar from "../components/BookingCalendar";
import {getAvailableDates} from "../funcs/calendarFuncs";
import './BookingPage.css';

const BookingPage = () => {
  // variables for available dates to be stored or error states
    // from available data, then assign values to those variables
    const [provisionedAPI, setProvisionedAPI] = useState([]);
    const [provisionedAPIError, setProvisionedAPIError] = useState(null);

    // Queries availability api and populate variables
    useEffect(() => {
        axios.get('/api/availability/')
            .then((response) => {
                setProvisionedAPI(response.data);
            })
            .catch((err) => {
                setProvisionedAPIError(err.toString());
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    // const allowedRanges = allowedData.map((entry, index) => 
    // ({'start': new Date(entry.start_date), 'end': new Date(entry.end_date)})
    // );


    // variables for booking data to be stored or error states
    // from booking data, then assign values to those variables
    const [bookedAPI, setBookedAPI] = useState([]);
    const [bookedAPIError, setBookedAPIError] = useState(null);

    // this code actually populates variables
    useEffect(() => {
        axios.get('/api/bookings/')
            .then((response) => {
                setBookedAPI(response.data);
            })
            .catch((err) => {
                setBookedAPIError(err.toString());
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    const availableDates = getAvailableDates(provisionedAPI, bookedAPI, 2);

    const [selectedDates, setDates] = React.useState([new Date(), new Date()]);


    const handleDateChange = newDates => {
        setDates(newDates);
    };

  return (
    <div className="booking-container">
        <RequestForm
             arrival_date={selectedDates[0]}
             departure_date= {selectedDates[1]}
         />
         <BookingCalendar 
             availableDates={availableDates}
             selectedDates={selectedDates}
             handleDateChange = {handleDateChange}
             />
   </div>
  );
};

export default BookingPage;