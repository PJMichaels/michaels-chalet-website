import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../context/AuthContext';
// import './BookingForm.css'


const RequestForm = ({arrival_date, departure_date, refreshData}) => {
    const {isLoading, userID, userName } = useAuth();
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
        console.log(userID);
        e.preventDefault();
        // Post booking request to Django backend
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
                // This error should really be in a modal long term
                console.error("An error occurred while posting data: ", error);
            });
    };

    // If loading, show a loading message
    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
         <form onSubmit={handleSubmit}>
                <label>Guest Name: {userName}</label>
                {/* <input type="text" name="createdBy" onChange={handleChange} required /> */}
                <div>
                    <label>Number of Guests: {formData.groupSize}</label><br></br>
                    <input type="range" min='1' max='6' defaultValue='2' name="groupSize" onChange={handleChange} required />
                </div>
                <label>Request Message:</label><br></br>
                <textarea 
                    name="requestMessage" 
                    onChange={handleChange} 
                    className='text-black w-full m-2 p-2'
                    required>
                </textarea>
                <button 
                    type='submit'
                    className= 'bg-blue-500 text-white w-full py-1 px-4 m-1 rounded-lg hover:bg-blue-600 transition duration-300'
                >
                    Request Stay
                </button>
         </form>
     </div>
    );
};

export default RequestForm;