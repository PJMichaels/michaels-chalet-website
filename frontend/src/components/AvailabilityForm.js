import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
// import './BookingForm.css'

const AvailabilityForm = ({start_date, end_date}) => {
    const [formData, setFormData] = useState({
        startDate: start_date.toDateString(),
        endDate: end_date.toDateString(),
        reason: "",
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

function refreshPage() {
    window.location.reload(false);
  }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post booking request to Django backend
        Axios.post('/api/available/', {
            "start_date": formatDate(start_date),
            "end_date": formatDate(end_date),
            "reason": formData.reason
        })
            .then((response) => {
                console.log(response.data);
                refreshPage();
            })
            .catch((error) => {
                // This error should really be in a modal long term
                console.error("An error occurred while posting data: ", error);
            });
    };

    return (
        <div className="booking-form">
         <form onSubmit={handleSubmit}>
                 <label>Reason For Availability:</label>
                 <textarea name="reason" onChange={handleChange} required></textarea>
             <button className="button" type="submit">Provision Dates</button>
         </form>
     </div>
    );
};

export default AvailabilityForm;