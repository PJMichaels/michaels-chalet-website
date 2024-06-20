import React, { useState } from 'react';
import Axios from 'axios';

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
        Axios.post('/api/availability/', {
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
        <div>
         <form onSubmit={handleSubmit}>
                 <label>Reason For Availability:</label>
                 <br></br>
                 <textarea 
                    name="reason" 
                    className='text-black w-full m-2 p-2'
                    onChange={handleChange} 
                    required></textarea>
             <button 
                type="submit"
                className='bg-blue-500 text-white w-full py-1 px-4 m-1 rounded-lg hover:bg-blue-600 transition duration-300'
                >Provision Dates
            </button>
         </form>
     </div>
    );
};

export default AvailabilityForm;