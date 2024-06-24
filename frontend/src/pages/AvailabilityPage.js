// src/pages/AvailabilityPage.js
import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import AvailabilityForm from "../components/AvailabilityForm";
import AdminCalendar from "../components/AdminCalendar";
import ProvisionedList from '../components/ProvisionedList';
import { dateRangeToArray } from "../utilities/calendarFuncs";
import { fetchBookingsData, fetchProvisionedData } from '../utilities/api_funcs';
import './Calendar.css';

const AvailabilityPage = () => {
    const [bookingData, setBookingData] = useState([]);
    const [provisionedData, setProvisionedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDates, setDates] = useState([new Date(), new Date()]);

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

    var provisionedDates = [];
    var bookedDates = [];

    bookingData.forEach(booking => {
        bookedDates = bookedDates.concat(dateRangeToArray(booking.arrival_date, booking.departure_date));
    });
    
    provisionedData.forEach(provisioned => {
        provisionedDates = provisionedDates.concat(dateRangeToArray(provisioned.start_date, provisioned.end_date));
    });

    const handleDateChange = newDates => {
        setDates(newDates);
    };

    return (
        <div className='bg-black bg-opacity-80 text-white p-4 sm:p-3 md:p-6 lg:p-8 m-8 rounded-lg shadow-lg'>
            <div className='flex flex-col lg:flex-row'>
                <div className='flex-1 bg-black bg-opacity-80 shadow-lg rounded-sm mx-2 my-2 p-4 sm:p-3 md:p-6 lg:p-8'>
                    <ProvisionedList
                        provisionedData={provisionedData}
                        refreshData={fetchData}
                    />
                </div>
                <div className='flex-1 bg-black bg-opacity-80 shadow-lg rounded-sm mx-2 my-2 sm:p-0 md:p-6 lg:p-8'>
                    <AdminCalendar
                        availableDates={provisionedDates}
                        bookedDates={bookedDates}
                        selectedDates={selectedDates}
                        handleDateChange={handleDateChange}
                    />
                    <div className='border-t-2 mt-2 pt-2'>
                        <AvailabilityForm
                            start_date={selectedDates[0]}
                            end_date={selectedDates[1]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityPage;
