// src/components/RequestForm.js
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth } from '../context/AuthContext';

const RequestForm = ({ arrival_date, departure_date, refreshData }) => {
    const { isLoading, userID, userName } = useAuth();
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
    }, [arrival_date, departure_date]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('/api/myrequests/', {
            "created_by": userID,
            "group_size": formData.groupSize,
            "arrival_date": formatDate(formData.arrivalDate),
            "departure_date": formatDate(formData.departureDate),
            "request_message": formData.requestMessage,
            "request_type": "new",
        })
            .then((response) => {
                console.log(response.data);
                refreshData();
            })
            .catch((error) => {
                console.error("An error occurred while posting data: ", error);
            });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className='p-4 sm:p-3 md:p-6 lg:p-8'>
            <form onSubmit={handleSubmit}>
                <label className='block mb-2'>Guest Name: {userName}</label>
                <div className='mb-4'>
                    <label className='block mb-2'>Number of Guests: {formData.groupSize}</label>
                    <input 
                        type="range" 
                        min='1' 
                        max='6' 
                        defaultValue='2' 
                        name="groupSize" 
                        onChange={handleChange} 
                        className='w-full' 
                        required 
                    />
                </div>
                <label className='block mb-2'>Request Message:</label>
                <textarea 
                    name="requestMessage" 
                    onChange={handleChange} 
                    className='text-black w-full p-2 mb-4' 
                    required 
                />
                <button 
                    type='submit' 
                    className='bg-blue-500 text-white w-full py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
                >
                    Request Stay
                </button>
            </form>
        </div>
    );
};

export default RequestForm;
