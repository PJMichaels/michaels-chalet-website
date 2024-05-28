import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import AvailabilityForm from "../components/AvailabilityForm";
import AdminCalendar from "../components/AdminCalendar";
import ProvisioningManagement from '../components/ProvisioningManagement';
import {dateRangeToArray} from "../utilities/calendarFuncs";
import { fetchBookingsData, fetchProvisionedData } from '../utilities/api_funcs';
import './AvailabilityPage.css';

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
    <div>
        <div className="booking-container">
            <AvailabilityForm 
                start_date={selectedDates[0]}
                end_date= {selectedDates[1]}
            />
            <AdminCalendar 
                // evaluate availableDates vs provisionedDates here
                availableDates={provisionedDates}
                bookedDates={bookedDates}
                selectedDates={selectedDates}
                handleDateChange = {handleDateChange}
            />
        </div>
        <div>
            <ProvisioningManagement
                provisionedData={provisionedData}
                refreshData={fetchData}
            />
        </div>
    </div>
  );
};

export default AvailabilityPage;