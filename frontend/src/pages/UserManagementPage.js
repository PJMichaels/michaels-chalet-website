import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import UsersTable from '../components/UsersTable';
import { fetchUserData } from '../utilities/api_funcs';
import CreateUserForm from '../components/CreateUserForm';

const UserManagementPage = () => {

  // Add a create user button and form!!
  // Add phone number and admin_note to user model!
  // Use random hashes for all ids instead of a counter

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);


   // Function to fetch data from both APIs
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

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // setSelectedRow(null); // comment out to get rid of null error
    fetchData();
  };
  
  // If loading, show a loading message
  if (loading) return <div>Loading...</div>;

  // If there's an error, show an error message
  if (error) return <div>Error: {error}</div>;

  return (
    
    <div className='bg-black bg-opacity-80 p-4 m-8 rounded-sm shadow-lg'>
      <h1 className='text-white text-2xl border-b-2'>User Management</h1>
      <button 
        onClick={() => handleCreateUser()}
        className='float-right bg-blue-500 text-white py-1 px-4 m-2 rounded-lg hover:bg-blue-600 transition duration-300'
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
        <CreateUserForm closeModal = {closeModal}  />
        {/* {selectedRow && <EditRequestForm requestObject={selectedRow} />} */}
      </Modal>
    </div>
  );
};

export default UserManagementPage;