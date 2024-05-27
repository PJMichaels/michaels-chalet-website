import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import EditRequestForm from './EditRequestForm';
import './DataTable.css';

const BookingTable = ({data, refreshData}) => {
  // const [data, setData] = useState([]);
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
      Header: 'ID',
      accessor: 'id',
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
      Header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <button onClick={() => handleEdit(row.original)}>Edit</button>
          <button onClick={() => handleDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ], []);


  const handleEdit = (row) => {
    // const requestObject = data.find(item => item.id === row.id);
    setSelectedRow(row);
    setModalIsOpen(true);
    refreshData();
  };


  const handleDelete = async (id) => {
    // Implement your delete functionality here
    console.log('Delete row with ID:', id);

    try {
      // Delete request on booking id
      const deleteResponse = await axios.delete(`api/bookings/${id}/`);

      if (deleteResponse.status === 204) { // Check if the request was successful
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
      >
        <h2>Edit Request</h2>
        <EditRequestForm requestObject= {selectedRow} closeModal = {closeModal} />
        {/* {selectedRow && <EditRequestForm requestObject={selectedRow} />} */}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default BookingTable;
