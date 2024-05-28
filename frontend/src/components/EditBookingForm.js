import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../context/AuthContext';
// import './BookingForm.css'

const EditBookingForm = ({requestObject, closeModal}) => {

    // test to differentiate booking vs request
    // if (requestObject.includes('status')) {

    // }
    const {isLoading, username } = useAuth();

    const [formData, setFormData] = useState({
        id: requestObject.id,
        arrivalDate: requestObject.arrival_date,
        departureDate: requestObject.departure_date,
        requestMessage: requestObject.request_message,
        groupSize: requestObject.group_size,
        price: requestObject.price,
        paymentReceived: requestObject.payment_received,
        adminNote: requestObject.admin_note,
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
        Axios.patch(`/api/bookings/${formData.id}/`, {
            "group_size": formData.groupSize,
            "arrival_date": formatDate(formData.arrivalDate),
            "departure_date": formatDate(formData.departureDate),
            "request_message": formData.requestMessage,
            "price": formData.price,
            "payment_received": formData.paymentReceived,
            "admin_note": formData.adminNote,
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
            <label>Editing Booking ID: {requestObject.id}</label>
            <br></br>
            <label>Number of Guests: {formData.groupSize}</label>
                <input type="range" min='1' max='8' defaultValue={requestObject.group_size} name="groupSize" onChange={handleChange} required />
            <br></br>
            <label>Arrival Date:</label>
                <input type="date" defaultValue={formData.arrivalDate} name="arrivalDate" onChange={handleChange} required />
            <br></br>
            <label>Departure Date:</label>
                <input type="date" defaultValue={formData.departureDate} name="departureDate" onChange={handleChange} required />
            <br></br>
            <label>Request Message:</label>
                <textarea name="requestMessage" defaultValue={formData.requestMessage} onChange={handleChange} required></textarea>
            <label>Price:</label>
                <input type="number" defaultValue={formData.price} name="price" min="0.00" max="10000.00"  step="50" onChange={handleChange}/>
            <br></br>
            <label>Payment Received?:</label>
                <input type="radio" id="True" name="paymentReceived" value={true} onChange={handleChange}/><label>Yes</label>
                <input type="radio" id="False" name="paymentReceived" value={false} checked onChange={handleChange}/><label>No</label>
            <br></br>
            <label>Admin Note:</label>
                <textarea name="adminNote" defaultValue={formData.adminNote} onChange={handleChange}></textarea>
            <button className="button" type="submit">Update Reservation</button>
         </form>
     </div>
    );
};

export default EditBookingForm;