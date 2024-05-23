import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import axios from 'axios';
import './DataTable.css';

const RequestTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch reservation data from API endpoint
    axios.get('/api/requests/')
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
          <button onClick={() => handleApprove(row.original)}>Approve</button>
          <button onClick={() => handleEdit(row.original)}>Edit</button>
          <button onClick={() => handleDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ], []);

  const handleApprove = async (row) => {
    try {
      // First API request to create a new item in the booking database
      const bookingResponse = await axios.post('api/bookings/', {
        created_by: row.created_by,
        arrival_date: row.arrival_date,
        departure_date: row.departure_date,
        group_size: row.group_size,
        status: 'scheduled',
        // Add any other necessary fields
      });
  
      if (bookingResponse.status === 201) { // Check if the first request was successful
        // Second API request to delete the item from the request endpoint
        const deleteResponse = await axios.delete(`api/requests/${row.id}/`);
  
        if (deleteResponse.status === 200) {
          // Refresh table data
          const updatedData = await axios.get('api/bookings/');
          setData(updatedData.data);
        } else {
          console.error('Error deleting the item');
        }
      } else {
        console.error('Error creating booking');
      }
    } catch (error) {
      console.error('Error during approve action:', error);
    }
  };

  const handleEdit = (row) => {
    // Implement your edit functionality here
    console.log('Edit row:', row);
  };

  const handleDelete = (id) => {
    // Implement your delete functionality here
    console.log('Delete row with ID:', id);
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

export default RequestTable;
