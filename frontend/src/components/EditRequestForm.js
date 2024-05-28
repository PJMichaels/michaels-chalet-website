import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../context/AuthContext';
// import './BookingForm.css'

const EditRequestForm = ({requestObject, closeModal}) => {

    // test to differentiate booking vs request
    // if (requestObject.includes('status')) {

    // }
    const {isLoading, username } = useAuth();

    const [formData, setFormData] = useState({
        id: requestObject.id,
        arrivalDate: requestObject.arrival_date,
        departureDate: requestObject.departure_date,
        groupSize: requestObject.group_size,
        requestMessage: requestObject.request_message,
    });

    useEffect(() => {
        setFormData(formData => ({
            ...formData,
            arrivalDate: new Date(requestObject.arrival_date), //.toISOString().split('T')[0],
            departureDate: new Date(requestObject.departure_date) //.toISOString().split('T')[0],
        }));
    }, [requestObject.arrival_date, requestObject.departure_date]); // Update state when props change

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    function formatDate(date) {
        const d = new Date(date);
        d.setDate(d.getDate() + 1); // increment day to deal with zero index
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

// const navigate = useNavigate();

//   const redirectToPage = () => {
//     navigate('/reservation-management');}

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Placeholder for API call")
        // Post booking request to Django backend
        Axios.patch(`/api/requests/${formData.id}/`, {
            "group_size": formData.groupSize,
            "arrival_date": formatDate(formData.arrivalDate),
            "departure_date": formatDate(formData.departureDate),
            "request_message": formData.requestMessage
        })
            .then((response) => {
                console.log(response.data);
                closeModal();
            })
            .catch((error) => {
                // This error should really be in a modal long term
                console.error("An error occurred while posting data: ", error);
            });
        
    };

    return (
        <div>
         <form onSubmit={handleSubmit}>
                 {requestObject.booking ? <label>Editting Booking ID: {requestObject.booking}</label> : <label>Editting New Reservation Request</label>}
                 <br></br>
                 <label>Number of Guests: {formData.groupSize}</label>
                 <input type="range" min='1' max='8' defaultValue={requestObject.group_size} name="groupSize" onChange={handleChange} required /><br></br>
                 <label>Arrival Date:</label>
                 <input type="date" defaultValue={formData.arrivalDate} name="arrivalDate" onChange={handleChange} required />
                 <label>Departure Date:</label>
                 <input type="date" defaultValue={formData.departureDate} name="departureDate" onChange={handleChange} required />
                 <label>Request Message:</label>
                 <textarea name="requestMessage" defaultValue={formData.requestMessage} onChange={handleChange} required></textarea>
             <button className="button" type="submit">Update Reservation</button>
         </form>
     </div>
    );
};

export default EditRequestForm;