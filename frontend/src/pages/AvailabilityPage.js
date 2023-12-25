import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import AvailabilityForm from "../components/AvailabilityForm";
import AdminCalendar from "../components/AdminCalendar";
import ProvisioningManagement from '../components/ProvisioningManagement';
import './AvailabilityPage.css';

const AvailabilityPage = () => {
  // variables for available dates to be stored or error states
    // from available data, then assign values to those variables
    const [provisionedAPI, setProvisionedAPI] = useState([]);
    const [provisionedAPIError, setProvisionedAPIError] = useState(null);

    // Queries available api and populate variables
    useEffect(() => {
        // Assume your API endpoint is 'http://yourapi.com/bookings'
        axios.get('/api/available/')
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
        // Assume your API endpoint is 'http://yourapi.com/bookings'
        axios.get('/api/bookings/')
            .then((response) => {
                setBookedAPI(response.data);
            })
            .catch((err) => {
                setBookedAPIError(err.toString());
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    // starts the calendar creation process
    const getAvailableDates = (provisionedRanges, bookedRanges) => {
        /*
        Function takes in two arrays of objects, where each object must
        contain a "start_date" and "end_date" key and date string value.
        */
        const expandDateRanges = (dates) => {
            let result = [];
        
            dates.forEach(range => {
                let current = new Date(range.start_date);
                let end = new Date(range.end_date);
        
                while (current <= end) {
                    // push after date change to account zero index of day in calendar
                    current.setDate(current.getDate() + 1);
                    result.push(current.toDateString());
                }
            });
            return result;
        };
    
        const bookedDates = expandDateRanges(bookedRanges);
        const provisionedDates = expandDateRanges(provisionedRanges);
        const availableDates = [];
    
        provisionedDates.forEach((date) => {
            if (!bookedDates.includes(date)) {
                availableDates.push(date);
            }
        })
        return availableDates;
    }

    const availableDates = getAvailableDates(provisionedAPI, bookedAPI);

    const [selectedDates, setDates] = React.useState([new Date(), new Date()]);


    const handleDateChange = newDates => {
        setDates(newDates);
    };

    // Actively working on this to add delete available provisioned to admin page
    // const deleteProvisioned = (id) => {
    //     axios.delete(`/api/available/${id}/`)
    //         .then(() => {
    //             // Remove the deleted booking from the state
    //             const updatedBookings = availableDates.filter(provisioned => provisioned.id !== id);
    //             setBookingData(updatedBookings);
    //         })
    //         .catch(err => {
    //             setBookedAPIError(err.toString());
    //         });
    // };

  return (
    <div>
    <div className="booking-container">
        <AvailabilityForm
             start_date={selectedDates[0]}
             end_date= {selectedDates[1]}
         />
         <AdminCalendar 
             availableDates={availableDates}
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