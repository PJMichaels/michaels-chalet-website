// src/pages/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import UsersTable from '../components/UsersTable';
import { fetchUserData } from '../utilities/api_funcs';
import CreateUserForm from '../components/CreateUserForm';

const UserManagementPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userData] = await Promise.all([fetchUserData()]);
      setUserData(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchData();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bg-black bg-opacity-80 p-4 sm:p-3 md:p-6 lg:p-8 m-8 rounded-lg shadow-lg'>
      <h1 className='text-white text-2xl border-b-2 mb-0'>User Management</h1>
      <button
        onClick={handleCreateUser}
        className='text-white bg-blue-500 hover:bg-blue-600 transition duration-300 rounded-lg my-3 py-1 w-full md:w-40 lg:w-40'
      >
        Add New User
      </button>
      <UsersTable data={userData} refreshData={fetchData} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create User"
        className='bg-none'
      >
        <CreateUserForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default UserManagementPage;