// src/components/ReservationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchMyBookingsData, fetchMyRequestsData, postBookingChangeRequest } from '../utilities/api_funcs';
import EditMyBookingForm from './EditMyBookingForm';
import EditMyRequestForm from './EditMyRequestForm';

function ReservationList() {
    const [bookingData, setBookingData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedObject, setSelectedObject] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [bookingData, requestData] = await Promise.all([fetchMyBookingsData(), fetchMyRequestsData()]);
            setBookingData(bookingData);
            setRequestData(requestData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteRequest = (id) => {
        axios.delete(`/api/requests/${id}/`)
            .then(() => {
                console.log('Cancelled Request');
                fetchData();
            })
            .catch(err => {
                setError(err.message);
            });
    };

    const requestCancellation = (bookingObject) => {
        postBookingChangeRequest(bookingObject, 'cancellation').then((response) => {
            console.log(response);
            fetchData();
        });
    };

    const requestChange = (toChangeObject) => {
        setSelectedObject(toChangeObject);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        fetchData();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className='text-2xl border-b-2 py-2'>Pending Requests</h1>
            <div className='text-black my-2'>
                <ListGroup>
                    {requestData.length > 0 ? (
                        requestData.map((request) => (
                            <ListGroup.Item key={request.id} className='flex flex-col md:flex-row'>
                                <div className='flex-1'>
                                    <p>Booking Dates: {request.arrival_date} - {request.departure_date}</p>
                                    <p>Group Size: {request.group_size}</p>
                                    <p>Request Type: {request.request_type}</p>
                                </div>
                                <p className='flex-1'>Message: <br />{request.request_message}</p>
                                <div className='flex-1 flex flex-col md:flex-row'>
                                    <button 
                                        onClick={() => requestChange(request)} 
                                        className='bg-blue-500 text-white w-full m-1 py-1 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteRequest(request.id)}
                                        className='bg-red-500 text-white w-full m-1 py-1 px-4 rounded-lg hover:bg-red-600 transition duration-300'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>No Pending Requests</ListGroup.Item>
                    )}
                </ListGroup>
            </div>
            <h1 className='text-2xl border-b-2 py-2'>Confirmed Reservations</h1>
            <div className='text-black my-2'>
                <ListGroup>
                    {bookingData.length > 0 ? (
                        bookingData.map((booking) => (
                            <ListGroup.Item key={booking.id} className='flex flex-col md:flex-row'>
                                <div className='flex-1 lg:flex-3'>
                                    <p>Booking Dates: {booking.arrival_date} - {booking.departure_date}</p>
                                    <p>Group Size: {booking.group_size}</p>
                                </div>
                                <p className='flex-1 lg:flex-3'>Message: <br />{booking.request_message}</p>
                                <div className='flex-1 flex flex-col md:flex-row'>
                                    <button 
                                        onClick={() => requestChange(booking)}
                                        className='bg-blue-500 text-white w-full m-1 py-1 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => requestCancellation(booking)}
                                        className='bg-red-500 text-white w-full m-1 py-1 px-4 rounded-lg hover:bg-red-600 transition duration-300'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>No Bookings</ListGroup.Item>
                    )}
                </ListGroup>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Request"
                className='bg-none'
            >
                {selectedObject && selectedObject.hasOwnProperty('request_type') ? 
                    <div>
                        <EditMyRequestForm requestObject={selectedObject} closeModal={closeModal} />
                    </div> :
                    <div>
                        <EditMyBookingForm bookingObject={selectedObject} closeModal={closeModal} />
                    </div>
                }
            </Modal>
        </div>
    );
}

export default ReservationList;
