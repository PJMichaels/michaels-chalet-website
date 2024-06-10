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
    
    <div className="App">
      <h1>User Management</h1>
      <button onClick={() => handleCreateUser()}>Add User</button>
      <UsersTable data={userData} refreshData={fetchData} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create User"
      >
        <h2>Create User</h2>
        <CreateUserForm closeModal = {closeModal}  />
        {/* {selectedRow && <EditRequestForm requestObject={selectedRow} />} */}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default UserManagementPage;