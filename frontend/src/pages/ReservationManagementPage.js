import React from 'react';
import BookingTable from '../components/BookingTable';
import RequestTable from '../components/RequestTable';

const ReservationManagementPage = () => {
  return (
    
    <div className="App">
      <h1>New Reservations Requests</h1>
      <RequestTable />
      <h1>Reservation Management</h1>
      <BookingTable />
    </div>
  );
};

export default ReservationManagementPage;