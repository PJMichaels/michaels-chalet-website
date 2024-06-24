// src/components/BookingTable.js
import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import Modal from 'react-modal';
import axios from 'axios';
import EditBookingForm from './EditBookingForm';
import './DataTable.css';

const BookingTable = ({ data, refreshData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        placeholder={`Search ${column.Header}`}
      />
    );
  };

  const DateFilter = ({ column }) => {
    const { filterValue = ['', ''], setFilter } = column;
  
    return (
      <div>
        <input
          type="date"
          value={filterValue[0] || ''}
          onChange={e => {
            const val = e.target.value;
            setFilter((old = ['', '']) => [val, old[1]]);
          }}
          placeholder="From"
        />
        <input
          type="date"
          value={filterValue[1] || ''}
          onChange={e => {
            const val = e.target.value;
            setFilter((old = ['', '']) => [old[0], val]);
          }}
          placeholder="To"
        />
      </div>
    );
  };

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
      allowFilter: false,
    },
    {
      Header: 'Guest',
      accessor: 'created_by.name',
      Filter: ColumnFilter,
      allowFilter: true,
    },
    {
      Header: 'Arrival',
      accessor: 'arrival_date',
      // Filter: DateFilter,
      // filter: 'dateRange',
      allowFilter: false,
    },
    {
      Header: 'Departure',
      accessor: 'departure_date',
      // Filter: DateFilter,
      // filter: 'dateRange',
      allowFilter: false,
    },
    {
      Header: 'Group Size',
      accessor: 'group_size',
      allowFilter: false,
    },
    {
      Header: 'Request Message',
      accessor: 'request_message',
      allowFilter: false,
    },
    {
      Header: 'Price',
      accessor: 'price',
      allowFilter: false,
    },
    {
      Header: 'Payment Received?',
      accessor: 'payment_received',
      Cell: ({ value }) => (value ? 'Yes' : 'No'),
      allowFilter: false,
    },
    {
      Header: 'Admin Note',
      accessor: 'admin_note',
      allowFilter: false,
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div>
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

  const handleEdit = (row) => {
    setSelectedRow(row);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await axios.delete(`api/bookings/${id}/`);
      if (deleteResponse.status === 204) {
        console.log('delete successful');
      } else {
        console.error('Error deleting booking');
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

  const filterTypes = useMemo(() => ({
    dateRange: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        if (!filterValue[0] && !filterValue[1]) return true;
        if (filterValue[0] && filterValue[1]) {
          return rowValue >= filterValue[0] && rowValue <= filterValue[1];
        }
        if (filterValue[0]) {
          return rowValue >= filterValue[0];
        }
        if (filterValue[1]) {
          return rowValue <= filterValue[1];
        }
        return true;
      });
    },
    text: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
      });
    },
  }), []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'arrival_date',
            desc: false,
          },
        ],
      },
      filterTypes,
    },
    useFilters,
    useSortBy,
  );

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
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  <div>{column.allowFilter ? column.render('Filter') : null}</div>
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
        contentLabel="Edit Booking"
        className='bg-none'
      >
        <EditBookingForm requestObject={selectedRow} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default BookingTable;
