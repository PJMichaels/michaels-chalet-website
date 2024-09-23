// src/pages/CalendarManagementPage.js
import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import AdminCalendar from "../components/AdminCalendar";
import { dateRangeToArray } from "../utilities/calendarFuncs";
import { fetchBookingsData, fetchBlockedDatesData, deleteBlockedDate, addBlockedDate, formatDate } from '../utilities/api_funcs';
// import './Calendar.css';
// import { act } from 'react';

const CalendarManagementPage = () => {
    const [bookingData, setBookingData] = useState([]); // need to actually get this working
    const [blockedDatesData, setBlockedDatesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeDates, setActiveDates] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [bookingData, blockedDatesData] = await Promise.all([fetchBookingsData(), fetchBlockedDatesData()]);
            setBookingData(bookingData);
            setBlockedDatesData(blockedDatesData);
            setActiveDates([]);
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

    var bookedDates = [];
    // bookedDates = [new Date("2024-09-30"), new Date("2024-10-01")]; // for development
    var blockedDates = [];

    bookingData.forEach(booking => {
        bookedDates = bookedDates.concat(dateRangeToArray(booking.arrival_date, booking.departure_date));
    });

    blockedDatesData.forEach(blockedItem => {
        let date = new Date(blockedItem.date);
        // normalize time to deal with timezone discrepancies
        date.setHours(0, 0, 0, 0);
        // handle odd zero index of day... without this, it gives a day early
        date.setDate(date.getDate() + 1);
        // blockedDates = blockedDates.concat(date.toDateString());
        blockedDates = blockedDates.concat(date);
    });

    const handleDateChange = (clickedDate) => {
        // update activeDates based on selection
        let newActiveDates = [];
    
        if (activeDates.some((date) => date.toISOString() === clickedDate.toISOString())) {
            // Remove the date if it's already in the array
            newActiveDates = activeDates.filter(
                (date) => date.getTime() !== clickedDate.getTime()
            );
        } else {
            newActiveDates = activeDates.concat(clickedDate);
        }
    
        setActiveDates(newActiveDates);
    };


    const blockActiveDates = (e) => {
        e.preventDefault();
        activeDates.forEach(date => {
            // if date is not already blocked
            if (!blockedDates.includes(date)) {
                addBlockedDate(date);
            }
        })
        fetchData();
    };

    const unblockActiveDates = (e) => {
        e.preventDefault();
        // generate a dict of date string to booked id
        const dateIdDict = blockedDatesData.reduce((acc, item) => {
            acc[item.date] = item.id;  // Set the date as the key and id as the value
            return acc;
          }, {});

        activeDates.forEach(date => {
            // if date is not already blocked
            const dateString = formatDate(date);

            if (dateIdDict.hasOwnProperty(dateString)) {
                console.log("Deleting date block for", dateString);
                deleteBlockedDate(dateIdDict[dateString]);
            }
        })
        fetchData();
    };

    const clearActiveDates = (e) => {
        e.preventDefault();
        setActiveDates([]);
    };

    return (
        <div className='bg-black bg-opacity-80 text-white p-4 sm:p-3 md:p-6 lg:p-8 m-8 rounded-lg shadow-lg'>
            <div className='flex flex-col lg:flex-row'>
                <div className='flex-1 bg-black bg-opacity-80 shadow-lg rounded-sm mx-2 my-2 p-4 sm:p-3 md:p-6 lg:p-8'>
                    {/* <ProvisionedList
                        provisionedData={provisionedData}
                        refreshData={fetchData}
                    /> */}
                </div>
                <div className='flex-1 bg-black bg-opacity-80 shadow-lg rounded-sm mx-2 my-2 sm:p-0 md:p-6 lg:p-8'>
                    <AdminCalendar
                        activeDates={activeDates}
                        setActiveDates={setActiveDates}
                        blockedDates={blockedDates}
                        bookedDates={bookedDates}
                        handleDateChange={handleDateChange}
                    />
                    <button
                        onClick={blockActiveDates}
                        className='bg-blue-500 text-white w-full py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 my-1'
                    >
                        Block Dates
                    </button>
                    <button
                        onClick={unblockActiveDates}
                        className='bg-blue-500 text-white w-full py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 my-1'
                    >
                        Unblock Dates
                    </button>
                    <button
                        onClick={clearActiveDates}
                        className='bg-gray-500 text-white w-full py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 my-1'
                    >
                        Clear Selected
                    </button>
                    {/* <div className='border-t-2 mt-2 pt-2'>
                        <AvailabilityTestForm
                            activeDates={activeDates}
                            setActiveDates={setActiveDates}
                            blockedDates={blockedDates}
                            blockedDatesData={blockedDatesData}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default CalendarManagementPage;
