import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
// import './BookingForm.css'

const BookingForm = ({start_date, end_date}) => {
    const [formData, setFormData] = useState({
        startDate: start_date.toDateString(),
        endDate: end_date.toDateString(),
        note: "",
        group_size: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

const navigate = useNavigate();

  const redirectToPage = () => {
    navigate('/reservations/');}

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post booking request to Django backend
        Axios.post('/api/bookings/', {
            "name": formData.name,
            "group_size": formData.group_size,
            "start_date": formatDate(start_date),
            "end_date": formatDate(end_date),
            "note": formData.note
        })
            .then((response) => {
                console.log(response.data);
                redirectToPage();
            })
            .catch((error) => {
                // This error should really be in a modal long term
                console.error("An error occurred while posting data: ", error);
            });
    };

    return (
        <div className="booking-form">
         <form onSubmit={handleSubmit}>
                 <label>Guest Name:</label>
                 <input type="text" name="name" onChange={handleChange} required />
                 <label>Number of Guests: {formData.group_size}</label>
                 <input type="range" min='1' max='6' name="group_size" onChange={handleChange} required />
                 <label>Request Message:</label>
                 <textarea name="note" onChange={handleChange} required></textarea>
             <button className="button" type="submit">Request Booking</button>
         </form>
     </div>
    );
};

export default BookingForm;