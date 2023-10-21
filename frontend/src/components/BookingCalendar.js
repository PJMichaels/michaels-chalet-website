// BookingCalendar.js

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const BookingCalendar = ({availableDates, selectedDates, handleDateChange}) => {

    function isDateDisabled({ date, view }) {
        if (view !== 'month') {
          return false;
        }
      
        return !availableDates.includes(date.toDateString());
      };

    return (
      <div className="booking-calendar">
        <Calendar 
        onChange={handleDateChange}
        value={selectedDates}
        tileDisabled={isDateDisabled}
        selectRange={true}
        />
      </div>
    );
};

export default BookingCalendar;