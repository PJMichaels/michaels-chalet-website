import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import RequestForm from "../components/RequestForm";
import BookingCalendar from "../components/BookingCalendar";
import ReservationList from "../components/ReservationList";
import {getAvailableDates} from "../utilities/calendarFuncs";
import { fetchBookingsData, fetchProvisionedData } from '../utilities/api_funcs';
import './Calendar.css';

const BookingPage = () => {
    // variables for available dates to be stored or error states
    // from available data, then assign values to those variables
    const [bookingData, setBookingData] = useState([]);
    const [provisionedData, setProvisionedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDates, setDates] = React.useState([new Date(), new Date()]);
    const minDaysOut = 2; // temporary variable sets minimum days out for booking

    // Function to fetch data from both APIs
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [bookingData, provisionedData] = await Promise.all([fetchBookingsData(), fetchProvisionedData()]);
            setBookingData(bookingData);
            setProvisionedData(provisionedData);
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

    // Get available dates from provisioned and booked dates
    const availableDates = getAvailableDates(provisionedData, bookingData, minDaysOut);


    const handleDateChange = newDates => {
        setDates(newDates);
    };

  return (
    // <div className="booking-container">
    <div className='bg-backdrop-bg text-white p-5'>
        <div className='flex'>
            <div className='flex-5 bg-black bg-opacity-80 shadow-lg rounded-sm mx-2 my-2 p-8'>
                <ReservationList/>
            </div>
            
            <div className='flex-3 bg-black bg-opacity-80 shadow-lg rounded-sm mx-2 my-2 p-8'>
                <BookingCalendar 
                    className='object-center'
                    availableDates={availableDates}
                    selectedDates={selectedDates}
                    handleDateChange = {handleDateChange}
                />
                <div className='border-t-2 m-2 p-2'>
                <RequestForm
                    arrival_date={selectedDates[0]}
                    departure_date= {selectedDates[1]}
                    refreshData = {fetchData}
                />
                </div>
            </div>
        </div>
   </div>
  );
};

export default BookingPage;