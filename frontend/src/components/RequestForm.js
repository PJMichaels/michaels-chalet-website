import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
// import { useAuth } from './AuthContext';
// import './BookingForm.css'


const RequestForm = ({arrival_date, departure_date}) => {
    const [formData, setFormData] = useState({
        arrivalDate: arrival_date.toDateString(),
        departureDate: departure_date.toDateString(),
        requestMessage: "",
        groupSize: "2",
    });

    useEffect(() => {
        setFormData(formData => ({
            ...formData,
            arrivalDate: arrival_date.toDateString(),
            departureDate: departure_date.toDateString(),
        }));
    }, [arrival_date, departure_date]); // Update state when props change

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
        Axios.post('/api/requests/', {
            "created_by": formData.createdBy,
            "group_size": formData.groupSize,
            "arrival_date": formatDate(formData.arrivalDate),
            "departure_date": formatDate(formData.departureDate),
            "request_message": formData.requestMessage,
            "status": "new",
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
        <div className="content-container">
         <form onSubmit={handleSubmit}>
                 <label>Guest Name:</label>
                 <input type="text" name="createdBy" onChange={handleChange} required />
                 <label>Number of Guests: {formData.groupSize}</label>
                 <input type="range" min='1' max='6' defaultValue='2' name="groupSize" onChange={handleChange} required />
                 <label>Request Message:</label>
                 <textarea name="requestMessage" onChange={handleChange} required></textarea>
             <button className="button" type="submit">Request Stay</button>
         </form>
     </div>
    );
};

export default RequestForm;