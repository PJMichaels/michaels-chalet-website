import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import Modal from 'react-modal';
import axios from 'axios';
import EditRequestForm from './EditRequestForm';
import './DataTable.css';

const RequestTable = ({data, refreshData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        placeholder={`Search ${column.id}`}
      />
    );
  };

  const columns = useMemo(() => [
    {
      Header: 'Request Type',
      accessor: 'request_type',
      Cell: ({ value }) => value.toUpperCase(), // Display the value in uppercase
    },
    {
      Header: "Reservation ID",
      accessor: 'booking',
      Cell: ({ value }) => (value ? value : 'N/A'), // Customize the display of boolean values
    },
    {
      Header: 'Guest',
      accessor: 'created_by',
    },
    {
      Header: 'Arrival',
      accessor: 'arrival_date',
    },
    {
      Header: 'Departure',
      accessor: 'departure_date',
    },
    {
        Header: 'Group Size',
        accessor: 'group_size',
        Filter: ColumnFilter,
    },
    {
      Header: 'Request Message',
      accessor: 'request_message',
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <button 
            onClick={() => handleApprove(row.original)}
            className='bg-blue-500 text-white py-1 px-4 m-1 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Approve
          </button>
          <button 
            onClick={() => handleEdit(row.original)}
            className='bg-blue-500 text-white py-1 px-4 m-1 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Edit
          </button>
          <button 
            onClick={() => handleDelete(row.original.id)}
            className='bg-blue-500 text-white py-1 px-4 m-1 rounded-lg hover:bg-red-600 transition duration-300'
          >
            Delete
          </button>
        </div>
      ),
    },
  ], []);

  const handleApprove = async (row) => {
    try {
      var bookingResponse; 

      if (row.booking) {
        // First API request to create a new item in the booking database
        bookingResponse = await axios.patch(`api/bookings/${row.booking}/`, {
          created_by: row.created_by,
          arrival_date: row.arrival_date,
          departure_date: row.departure_date,
          group_size: row.group_size,
          status: 'scheduled',
          // Add any other necessary fields
        });
      }
      else {
        // First API request to create a new item in the booking database
      bookingResponse = await axios.post('api/bookings/', {
        created_by: row.created_by,
        arrival_date: row.arrival_date,
        departure_date: row.departure_date,
        group_size: row.group_size,
        status: 'scheduled',
        // Add any other necessary fields
      });
      }
      
  
      if (bookingResponse.status === 201 | bookingResponse.status === 200) { // Check if the first request was successful
        // Second API request to delete the item from the request endpoint
        const deleteResponse = await axios.delete(`api/requests/${row.id}/`);
  
        if (deleteResponse.status === 200) {
          // Refresh table data
          // const updatedData = await axios.get('api/bookings/');
          // setData(updatedData.data);
        } else {
          console.error('Error deleting the item');
        }
      } else {
        console.error('Error creating booking');
      }
    } catch (error) {
      console.error('Error during approve action:', error);
    }
    refreshData();
  };

  const handleEdit = (row) => {
    // const requestObject = data.find(item => item.id === row.id);
    setSelectedRow(row);
    setModalIsOpen(true);
    // refreshData();
  };

  const handleDelete = async (id) => {
    // Implement your delete functionality here
    console.log('Delete row with ID:', id);

    try {
      // Delete request on booking id
      const deleteResponse = await axios.delete(`api/requests/${id}/`);

      if (deleteResponse.status === 204) { // Check if the request was successful
        console.log('delete successful');
        
      } else {
        console.error('Error deleting request');
      }
    } catch (error) {
      console.error('Error during deletion action:', error);
    }
    refreshData();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // setSelectedRow(null); // comment out to get rid of null error
    refreshData();
  };

  const tableInstance = useTable({ columns, data }, useFilters, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Request"
        className='bg-none'
      >
        <EditRequestForm 
          requestObject= {selectedRow} 
          closeModal = {closeModal}  
        />
        {/* {selectedRow && <EditRequestForm requestObject={selectedRow} />} */}
      </Modal>
    </div>
  );
};

export default RequestTable;
