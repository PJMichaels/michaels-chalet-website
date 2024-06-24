// src/components/UsersTable.js
import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import Modal from 'react-modal';
import axios from 'axios';
import EditUserForm from './EditUserForm';
import './DataTable.css';

const UsersTable = ({ data, refreshData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        placeholder={`Search ${column.id}`}
        className='border rounded p-2'
      />
    );
  };

  const columns = useMemo(() => [
    // {
    //   Header: 'ID',
    //   accessor: 'id',
    //   allowFilter: false,
    // },
    {
      Header: 'Name',
      accessor: 'name',
      allowFilter: true,
      Filter: ColumnFilter,
    },
    {
      Header: 'Email',
      accessor: 'email',
      allowFilter: false,
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      allowFilter: false,
    },
    {
      Header: 'Groups',
      accessor: 'groups',
      allowFilter: false,
      Cell: ({ value }) => (value[0]), // Get Group at index 0
    },
    {
      Header: 'Actions',
      allowFilter: false,
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
      const deleteResponse = await axios.delete(`api/users/${id}/`);
      if (deleteResponse.status === 204) {
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
        contentLabel="Edit User"
        className='bg-none'
      >
        <EditUserForm userObject={selectedRow} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default UsersTable;
