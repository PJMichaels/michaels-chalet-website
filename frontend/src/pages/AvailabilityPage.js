import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import AvailabilityForm from "../components/AvailabilityForm";
import AdminCalendar from "../components/AdminCalendar";
import ProvisionedList from '../components/ProvisionedList';
import {dateRangeToArray} from "../utilities/calendarFuncs";
import { fetchBookingsData, fetchProvisionedData } from '../utilities/api_funcs';
import './Calendar.css';

const AvailabilityPage = () => {
    // variables for available dates to be stored or error states
    // from available data, then assign values to those variables
    const [bookingData, setBookingData] = useState([]);
    const [provisionedData, setProvisionedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDates, setDates] = React.useState([new Date(), new Date()]);

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

    // create variables to store dates in array format for react-calendar
    var provisionedDates = [];
    var bookedDates = [];

    // populate bookedDates array with all date strings converted from ranges
    bookingData.forEach(booking => {
        bookedDates = bookedDates.concat(dateRangeToArray(booking.arrival_date, booking.departure_date));
    })
    
    // populate provisionedDates array with all date strings converted from ranges
    provisionedData.forEach(provisioned => {
        provisionedDates = provisionedDates.concat(dateRangeToArray(provisioned.start_date, provisioned.end_date));
    })


    const handleDateChange = newDates => {
        setDates(newDates);
    };

  return (
    <div className='bg-backdrop-bg text-white p-5'>
        <div className='flex'>
            {/* <div className="booking-container"> */}
            <div className='flex-5 bg-black bg-opacity-80 shadow-lg rounded-sm mx-2 my-2 p-8'>
                <ProvisionedList
                    provisionedData={provisionedData}
                    refreshData={fetchData}
                />
            </div>
            <div className='flex-3 bg-black bg-opacity-80 shadow-lg rounded-sm mx-1 my-2 p-8'>
                <div className='p-2 content-center'>
                    <AdminCalendar 
                        // evaluate availableDates vs provisionedDates here
                        availableDates={provisionedDates}
                        bookedDates={bookedDates}
                        selectedDates={selectedDates}
                        handleDateChange = {handleDateChange}
                    />
                </div>
                <div className='border-t-2 p-2'>
                    <AvailabilityForm 
                        start_date={selectedDates[0]}
                        end_date= {selectedDates[1]}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default AvailabilityPage;