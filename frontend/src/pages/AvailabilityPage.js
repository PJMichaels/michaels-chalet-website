import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import AvailabilityForm from "../components/AvailabilityForm";
import AdminCalendar from "../components/AdminCalendar";
import ProvisioningManagement from '../components/ProvisioningManagement';
import {dateRangeToArray} from "../utilities/calendarFuncs";
import './AvailabilityPage.css';

const AvailabilityPage = () => {
  // variables for available dates to be stored or error states
    // from available data, then assign values to those variables
    const [provisionedAPI, setProvisionedAPI] = useState([]);
    const [provisionedAPIError, setProvisionedAPIError] = useState(null);

    // Queries available api and populate variables
    useEffect(() => {
        axios.get('/api/availability/')
            .then((response) => {
                setProvisionedAPI(response.data);
            })
            .catch((err) => {
                setProvisionedAPIError(err.toString());
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts


    // variables for booking data to be stored or error states
    // from booking data, then assign values to those variables
    const [bookedAPI, setBookedAPI] = useState([]);
    const [bookedAPIError, setBookedAPIError] = useState(null);

    // this code actually populates variables
    useEffect(() => {
        // Assume your API endpoint is 'http://yourapi.com/bookings'
        axios.get('/api/bookings/')
            .then((response) => {
                setBookedAPI(response.data);
            })
            .catch((err) => {
                setBookedAPIError(err.toString());
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts


    var provisionedDates = [];
    var bookedDates = [];

    // populate bookedDates array with all date strings converted from ranges
    bookedAPI.forEach(booking => {
        bookedDates = bookedDates.concat(dateRangeToArray(booking.arrival_date, booking.departure_date));
    })
    
    // populate provisionedDates array with all date strings converted from ranges
    provisionedAPI.forEach(provisioned => {
        provisionedDates = provisionedDates.concat(dateRangeToArray(provisioned.start_date, provisioned.end_date));
    })

    
    const [selectedDates, setDates] = React.useState([new Date(), new Date()]);


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
    <ProvisioningManagement/>
   </div>
   </div>
  );
};

export default AvailabilityPage;