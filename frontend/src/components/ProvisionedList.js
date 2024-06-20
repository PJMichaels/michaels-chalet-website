import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';



function ProvisionedList({provisionedData, refreshData}) {

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
      // Edit below here
      <div>
        <h1 className='text-2xl border-b-2'>Provisioned Dates</h1>
        <div className='text-black my-2'>
          <ListGroup>
            {responseError && <p className="error">Error: {responseError}</p>}
            {provisionedData.length > 0 ? (
              provisionedData.map((item, index) => (
                <ListGroup.Item key={item.id} className='flex'>
                  <div className='flex-3'>
                    <p>Provisioned Dates: {item.start_date} - {item.end_date}</p>
                    <p>Reason: <br></br>{item.reason}</p>
                  </div>
                  <div className='flex-1'>
                    <button 
                      onClick={() => deleteProvisioned(item.id)} 
                      className= 'bg-blue-500 text-white w-full m-1 py-1 px-4 rounded-lg hover:bg-red-600 transition duration-300'
                    >
                      Delete
                    </button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No Provisioned Dates.</ListGroup.Item>
            )}
          </ListGroup>
        </div>
      </div>
  );
}

export default ProvisionedList;