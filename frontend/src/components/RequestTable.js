// src/components/RequestTable.js
import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import Modal from 'react-modal';
import axios from 'axios';
import EditRequestForm from './EditRequestForm';
import './DataTable.css';

const RequestTable = ({ data, refreshData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = useMemo(() => [
    {
      Header: 'Request Type',
      accessor: 'request_type',
      Cell: ({ value }) => value.toUpperCase(),
    },
    {
      Header: "Reservation ID",
      accessor: 'booking',
      Cell: ({ value }) => (value ? value : 'N/A'),
    },
    {
      Header: 'Guest',
      accessor: 'created_by.name',
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
            className='bg-teal-700 text-white w-full py-1 px-4 m-1 rounded-lg hover:bg-teal-800 transition duration-300'
          >
            Approve
          </button>
          <button
            onClick={() => handleEdit(row.original)}
            className='bg-blue-500 text-white w-full py-1 px-4 m-1 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className='bg-red-500 text-white w-full py-1 px-4 m-1 rounded-lg hover:bg-red-600 transition duration-300'
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
        bookingResponse = await axios.patch(`api/bookings/${row.booking}/`, {
          created_by: row.created_by.id,
          arrival_date: row.arrival_date,
          departure_date: row.departure_date,
          group_size: row.group_size,
          status: 'scheduled',
        });
      } else {
        bookingResponse = await axios.post('api/bookings/', {
          created_by: row.created_by.id,
          arrival_date: row.arrival_date,
          departure_date: row.departure_date,
          group_size: row.group_size,
          status: 'scheduled',
        });
      }

      if (bookingResponse.status === 201 || bookingResponse.status === 200) {
        const deleteResponse = await axios.delete(`api/requests/${row.id}/`);
        if (deleteResponse.status === 200) {
          console.log('delete successful');
        } else {
          console.error('Error deleting request');
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
    setSelectedRow(row);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await axios.delete(`api/requests/${id}/`);
      if (deleteResponse.status === 204) {
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
    <div className='overflow-x-auto'>
      <table {...getTableProps()} className='min-w-full'>
        <thead className='bg-gray-800 text-white'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className='p-2 text-left'>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className='bg-gray-700 text-white'>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className='p-2 border-t border-gray-600'>
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
        <EditRequestForm requestObject={selectedRow} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default RequestTable;
