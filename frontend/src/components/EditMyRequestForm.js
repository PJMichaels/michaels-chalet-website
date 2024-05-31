import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// import './BookingForm.css'

const EditMyRequestForm = ({requestObject, closeModal}) => {

    // test to differentiate booking vs request
    // if (requestObject.includes('status')) {

    // }

    const [formData, setFormData] = useState({
        id: requestObject.id,
        arrivalDate: requestObject.arrival_date,
        departureDate: requestObject.departure_date,
        requestMessage: requestObject.request_message,
        groupSize: requestObject.group_size,
    });

    useEffect(() => {
        setFormData(formData => ({
            ...formData,
            arrivalDate: new Date(requestObject.arrival_date),
            departureDate: new Date(requestObject.departure_date)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Placeholder for API call")
        // Patch API call for request change
        Axios.patch(`/api/myrequests/${requestObject.id}/`, {
            "created_by": requestObject.created_by,
            "booking": requestObject.booking,
            "group_size": formData.groupSize,
            "arrival_date": formatDate(formData.arrivalDate),
            "departure_date": formatDate(formData.departureDate),
            "request_message": formData.requestMessage,
            "request_type": requestObject.request_type,
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
            <br></br>
            <button className="button" type="submit">Update Request</button>
         </form>
     </div>
    );
};

export default EditMyRequestForm;