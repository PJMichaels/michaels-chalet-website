// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import RequestForm from "../components/RequestForm";
import BookingCalendar from "../components/BookingCalendar";
import ReservationList from "../components/ReservationList";
import { getAvailableDates } from "../utilities/calendarFuncs";
import { fetchBookingsData, fetchProvisionedData } from '../utilities/api_funcs';
import './Calendar.css';

const BookingPage = () => {
    const [bookingData, setBookingData] = useState([]);
    const [provisionedData, setProvisionedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDates, setDates] = useState([new Date(), new Date()]);
    const minDaysOut = 2; // temporary variable sets minimum days out for booking

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

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const availableDates = getAvailableDates(provisionedData, bookingData, minDaysOut);

    const handleDateChange = newDates => {
        setDates(newDates);
    };

    return (
        <div className='bg-black bg-opacity-80 text-white p-2 sm:p-3 md:p-6 lg:p-8 m-8 rounded-lg shadow-lg'>
            <div className='flex flex-col lg:flex-row'>
                <div className='flex-1 bg-black bg-opacity-80 shadow-lg rounded-sm mx-2 my-2 p-4 sm:p-3 md:p-6 lg:p-8'>
                    <ReservationList />
                </div>
                <div className='flex-1 bg-black bg-opacity-80 shadow-lg rounded-sm mx-2 my-2 p-2 md:p-6 lg:p-8'>
                    <BookingCalendar
                        availableDates={availableDates}
                        selectedDates={selectedDates}
                        handleDateChange={handleDateChange}
                    />
                    <div className='border-t-2 mt-2 pt-2'>
                        <RequestForm
                            arrival_date={selectedDates[0]}
                            departure_date={selectedDates[1]}
                            refreshData={fetchData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
