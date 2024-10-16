// src/components/BookingCalendar.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = ({ unavailableDates, selectedDates, handleDateChange }) => {
    const minDaysOut = 2;
    const maxDaysOut = 90;

    
    
    function isDateDisabled({ date, view }) {
        if (view !== 'month') {
            return false;
        }
        return unavailableDates.includes(date.toDateString());
    };

    const earliestBookingDate = new Date();
    earliestBookingDate.setDate(earliestBookingDate.getDate() + minDaysOut);
    // earliestBookingDate.setHours(0, 0, 0, 0); // Normalize to midnight for comparison

    const latestBookingDate = new Date();
    latestBookingDate.setDate(latestBookingDate.getDate() + maxDaysOut);
    // latestBookingDate.setHours(0, 0, 0, 0); // Normalize to midnight for comparison

    console.log(earliestBookingDate);
    console.log(latestBookingDate);

    return (
        <div className="booking-calendar sm:p-0 md:p-6 lg:p-8">
            <Calendar 
                onChange={handleDateChange}
                value={selectedDates}
                tileDisabled={isDateDisabled}
                selectRange={true}
                minDate={earliestBookingDate}
                maxDate={latestBookingDate}
                className='w-full'
            />
        </div>
    );
};

export default BookingCalendar;
