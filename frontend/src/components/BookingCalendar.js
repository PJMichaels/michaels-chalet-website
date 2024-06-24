// src/components/BookingCalendar.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = ({ availableDates, selectedDates, handleDateChange }) => {
    function isDateDisabled({ date, view }) {
        if (view !== 'month') {
            return false;
        }
        return !availableDates.includes(date.toDateString());
    };

    return (
        <div className="booking-calendar sm:p-0 md:p-6 lg:p-8">
            <Calendar 
                onChange={handleDateChange}
                value={selectedDates}
                tileDisabled={isDateDisabled}
                selectRange={true}
                className='w-full'
            />
        </div>
    );
};

export default BookingCalendar;
