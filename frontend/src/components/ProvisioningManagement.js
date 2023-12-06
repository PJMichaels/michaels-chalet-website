import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProvisioningManagement = () => {

// variables for booking data to be stored or error states
    // from booking data, then assign values to those variables
    const [availabilityData, setAvailabilityData] = useState([]);
    const [responseError, setResponseError] = useState(null);

    // this code actually populates variables
    useEffect(() => {
        // Assume your API endpoint is 'http://yourapi.com/bookings'
        axios.get('/api/available/')
            .then((response) => {
                setAvailabilityData(response.data);
            })
            .catch((err) => {
                setResponseError(err.toString());
            });
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    const deleteProvisioned = (id) => {
      axios.delete(`/api/available/${id}/`)
          .then(() => {
              // Remove the deleted booking from the state
              const updatedAvailability = availabilityData.filter(item => item.id !== id);
              setAvailabilityData(updatedAvailability);
          })
          .catch(err => {
            setResponseError(err.toString());
          });
  };
  

    
    return (
      <div className='reservations-container'>
          <div className='reservations-header'>
              <h1>Provisioned Dates</h1>
          </div>
          {responseError && <p className="error">Error: {responseError}</p>}
          {availabilityData.length > 0 ? (
              <ul>
                  {availabilityData.map((item, index) => (
                    
                      <li key={item.id}>
                        <div className='bookingItem'>
                          <div className='bookingLeftSide'>
                            <h2>{item.name}</h2>
                            <p>Provisioned Dates: {item.start_date} - {item.end_date}</p>
                          </div>
                          <div className='bookingRightSide'>
                            <p>Reason: <br></br>{item.reason}</p>
                            {/* Add other booking details you'd like to display here */}
                          </div>
                          <button onClick={() => deleteProvisioned(item.id)}>Delete</button>
                        </div>
                      </li>
                    
                  ))}
              </ul>
          ) : (
              <p className="no-bookings">No Provisioned Dates.</p>
          )}
      </div>
  );
};

export default ProvisioningManagement;