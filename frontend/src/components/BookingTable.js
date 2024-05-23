import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DataTable.css';

const BookingTable = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const redirectToPage = () => {
    navigate('/reservation-management/');}

  useEffect(() => {
    // Fetch reservation data from API endpoint
    axios.get('/api/bookings/')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
    // Implement your edit functionality here
    console.log('Edit row:', row);
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
  };

  // const handleDelete = async (row) => {
  //   try {
  //     // First API request to create a new item in the booking database
  //     console.log(row.id)
  //     // const deleteResponse = await axios.delete(`api/bookings/${row.id}/`);
  
  //     // if (deleteResponse.status === 200) { // Check if the request was successful
  //     //   // Second API request to delete the item from the request endpoint
  //     //   // const deleteResponse = await axios.delete(`api/requests/${row.id}/`);
  //     //   console.log('delete successful')
  
  //     // } else {
  //     //   console.error('Error deleting booking');
  //     // }
  //   } catch (error) {
  //     console.error('Error during deletion action:', error);
  //   }
  // };

  const tableInstance = useTable({ columns, data }, useFilters, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
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
  );
};

export default BookingTable;
