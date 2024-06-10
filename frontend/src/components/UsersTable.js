import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import Modal from 'react-modal';
import axios from 'axios';
import EditUserForm from './EditUserForm';
import './DataTable.css';

const UsersTable = ({data, refreshData}) => {
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
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
      Header: 'Groups',
      accessor: 'groups',
      Cell: ({ value }) => (value[0]), // Get Group at index 0
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
    // refreshData();
  };


  const handleDelete = async (id) => {
    // Implement your delete functionality here
    console.log('Delete row with ID:', id);

    try {
      // Delete request on booking id
      const deleteResponse = await axios.delete(`api/users/${id}/`);

      if (deleteResponse.status === 204) { // Check if the request was successful
        console.log('delete successful');
        
      } else {
        console.error('Error deleting user');
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
        contentLabel="Edit User"
      >
        <h2>Edit User Data</h2>
        <EditUserForm userObject= {selectedRow} closeModal = {closeModal}  />
        {/* {selectedRow && <EditRequestForm requestObject={selectedRow} />} */}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default UsersTable;
