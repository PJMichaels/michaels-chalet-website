// src/components/ProvisionedList.js
import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

function ProvisionedList({ provisionedData, refreshData }) {
    const [responseError, setResponseError] = useState(null);

    const deleteProvisioned = (id) => {
        axios.delete(`/api/availability/${id}/`)
            .then(() => {
                refreshData();
            })
            .catch(err => {
                setResponseError(err.toString());
            });
    };

    return (
        <div>
            <h1 className='text-2xl border-b-2 py-2'>Provisioned Dates</h1>
            <div className='text-black my-2'>
                <ListGroup>
                    {responseError && <p className="error">Error: {responseError}</p>}
                    {provisionedData.length > 0 ? (
                        provisionedData.map((item) => (
                            <ListGroup.Item key={item.id} className='flex flex-col md:flex-row'>
                                <div className='flex-1 lg:flex-3'>
                                    <p>Provisioned Dates: {item.start_date} - {item.end_date}</p>
                                    <p>Reason: <br />{item.reason}</p>
                                </div>
                                <div className='flex-1 flex flex-col md:flex-row'>
                                    <button
                                        onClick={() => deleteProvisioned(item.id)}
                                        className='bg-red-500 lg:bg-blue-500 text-white w-full m-1 py-1 px-4 rounded-lg hover:bg-red-600 transition duration-300'
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
