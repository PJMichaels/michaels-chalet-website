import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProvisioningManagement = ({provisionedData, refreshData}) => {

    // variables for booking data to be stored or error states
    const [responseError, setResponseError] = useState(null); // not sure this is needed.. also not used

    const deleteProvisioned = (id) => {
      axios.delete(`/api/availability/${id}/`)
          .then(() => {
              // reload data
              refreshData();
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
          {provisionedData.length > 0 ? (
              <ul>
                  {provisionedData.map((item, index) => (
                    
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