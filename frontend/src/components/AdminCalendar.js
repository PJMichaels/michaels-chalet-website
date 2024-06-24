// src/components/AdminCalendar.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminCalendar = ({ availableDates, bookedDates, selectedDates, handleDateChange }) => {

    function isDateDisabled({ date, view }) {
        if (view !== 'month') {
            return false;
        }
        return availableDates.includes(date.toDateString());
    };

    function tileClassName({ date, view }) {
        if (view === 'month' && bookedDates.includes(date.toDateString())) {
            return 'booked-date';
        }
    }

    return (
        <div className="booking-calendar p-4 sm:p-3 md:p-6 lg:p-8">
            <Calendar
                onChange={handleDateChange}
                value={selectedDates}
                tileDisabled={isDateDisabled}
                tileClassName={tileClassName}
                selectRange={true}
                className='w-full'
            />
        </div>
    );
};

export default AdminCalendar;
