// src/components/AdminCalendar.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminCalendar = ({activeDates, blockedDates, bookedDates, handleDateChange }) => {

    // blocked dates are grey but selectable still to unblock etc..
    // booked dates are disabled and a different color.. these cannot be unblocked here

    // change this to just color "blocked dates" not disable them
    // function isDateDisabled({ date, view }) {
    //     if (view !== 'month') {
    //         return false;
    //     }
    //     return blockedDates.includes(date.toDateString());
    // };

    // Add color to differentiate bookings vs blocked dates
    // function tileClassName({ date, view }) {
    //     activeDates.some((activeDate) => activeDate.toISOString() === date.toISOString())
    //   ? "highlighted-date"
    //   : null
    // }

    // Define tileClassName function outside of the JSX
    const getTileClassName = ({ date, view }) => {
        if (view === "month") {

          // Default style for all tiles (if you want a default background color for all)
        //   let tileClasses = "p-2 text-center bg-gray-100"; // Tailwind classes for default background and padding

          // Highlight active dates in blue
          if (activeDates.some((activeDate) => activeDate.toDateString() === date.toDateString())) {
            return "bg-blue-500 text-white rounded-lg"; // Tailwind for blue background and rounded circle
          }
          // Highlight blocked dates in gray
          if (blockedDates.some((blockedDate) => blockedDate.toDateString() === date.toDateString())) {
            return "bg-gray-400 text-white rounded-md"; // Tailwind for gray background
          }
          // Highlight booked dates in purple and disable them
          if (bookedDates.some((bookedDate) => bookedDate === date.toDateString())) {
            return "bg-purple-500 text-white rounded-md opacity-60 pointer-events-none"; // Tailwind for purple background and disable interaction
          }
        }
        return null;
      };

    return (
        <div className="booking-calendar p-4 sm:p-3 md:p-6 lg:p-8">
            <Calendar
                onClickDay={handleDateChange}
                // value={activeDates}
                // tileDisabled={isDateDisabled}
                tileClassName={getTileClassName}
                className='w-full'
            />
        </div>
    );
};

export default AdminCalendar;
