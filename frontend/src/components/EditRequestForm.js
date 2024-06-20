import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../context/AuthContext';
// import './BookingForm.css'

const EditRequestForm = ({requestObject, closeModal}) => {

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
        // Post booking request to Django backend
        Axios.patch(`/api/requests/${formData.id}/`, {
            "group_size": formData.groupSize,
            "arrival_date": formatDate(formData.arrivalDate),
            "departure_date": formatDate(formData.departureDate),
            "request_message": formData.requestMessage,
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
        <div className="max-w-xl mx-auto mt-11 p-4 bg-white shadow-md rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    {requestObject.booking ? 
                        <label className="block text-gray-700 text-sm font-bold mb-2">Editing Booking ID: {requestObject.booking}</label> :
                        <label className="block text-gray-700 text-sm font-bold mb-2">Editing New Reservation Request</label>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Number of Guests: {formData.groupSize}</label>
                    <input 
                        type="range" 
                        min="1" 
                        max="8" 
                        defaultValue={requestObject.group_size} 
                        name="groupSize" 
                        onChange={handleChange} 
                        required 
                        className="w-full" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Arrival Date:</label>
                    <input 
                        type="date" 
                        defaultValue={formData.arrivalDate} 
                        name="arrivalDate" 
                        onChange={handleChange} 
                        required 
                        className="w-full px-3 py-2 border rounded-md" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Departure Date:</label>
                    <input 
                        type="date" 
                        defaultValue={formData.departureDate} 
                        name="departureDate" 
                        onChange={handleChange} 
                        required 
                        className="w-full px-3 py-2 border rounded-md" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Request Message:</label>
                    <textarea 
                        name="requestMessage" 
                        defaultValue={formData.requestMessage} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-3 py-2 border rounded-md"
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Update Reservation
                </button>
                <button 
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 float-end"
                    >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditRequestForm;