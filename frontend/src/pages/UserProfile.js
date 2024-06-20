import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { fetchMyUserData } from '../utilities/api_funcs';

const UserProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', phone: '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmedPassword: '' });

  // Function to fetch data from both APIs
  const fetchData = async () => {
  setLoading(true);
  setError(null);
  try {
    const [userData] = await Promise.all([fetchMyUserData()]);
    setUserData(userData);
    setProfileData(userData);
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

const handleProfileChange = (e) => {
  const { name, value } = e.target;
  setProfileData(prevState => ({ ...prevState, [name]: value }));
};

const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData(prevState => ({ ...prevState, [name]: value }));
};

const handleProfileSubmit = (e) => {
  e.preventDefault();
  // console.log("Placeholder for API call")
  // Post booking request to Django backend
  axios.put('/api/profile/', {
      "email": profileData.email,
      "name": profileData.name,
      "phone": profileData.phone,
  })
      .then((response) => {
          console.log(response.data);
          closeModal();
      })
      .catch((error) => {
          // This error should really be in a modal long term
          console.error("An error occurred while posting data: ", error);
      });
  
};

const handlePasswordSubmit = (e) => {
  e.preventDefault();
  // console.log("Placeholder for API call")
  // Post booking request to Django backend
  if (passwordData.newPassword === passwordData.confirmedPassword) {
    axios.put('/api/profile/change-password/', {
      "old_password": passwordData.oldPassword,
      "new_password": passwordData.newPassword,
  })
      .then((response) => {
          console.log(response.data);
          closeModal();
      })
      .catch((error) => {
          // This error should really be in a modal long term
          console.error("An error occurred while updating password: ", error);
      });
  }
  else {
    console.log('Your new and confirm password fields do not match');
  }
  
};

// const handlePasswordSubmit = async () => {
//   try {
//     await changeUserPassword(passwordData);
//     setPasswordModalOpen(false);
//   } catch (error) {
//     console.error('Password change error', error);
//   }
// };

  const closeModal = () => {
    setProfileModalOpen(false);
    setPasswordModalOpen(false);
    fetchData();
  };

  // If loading, show a loading message
  if (loading) return <div className="text-center text-white">Loading...</div>;

  // If there's an error, show an error message
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-10">
      <h1 className="text-white text-2xl font-semibold mb-6 border-b-2 py-2">Profile Details:</h1>
      <div className="space-y-4">
        <div className="text-white text-lg">
          <span className="font-medium">Name:</span> {userData.name}
        </div>
        <div className="text-white text-lg">
          <span className="font-medium">Email:</span> {userData.email}
        </div>
        <div className="text-white text-lg">
          <span className="font-medium">Phone Number:</span> {userData.phone}
        </div>
        <div className="space-x-4 mt-4">
          <button 
            onClick={() => setProfileModalOpen(true)} 
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update Details
          </button>
          <button 
            onClick={() => setPasswordModalOpen(true)} 
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300"
          >
            Change Password
          </button>
        </div>
      </div>

      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={closeModal}
        contentLabel="Update Profile"
        className="bg-none"
      >
        <div className="max-w-xl mx-auto mt-11 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-6">Update Profile Details</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                  <label className="block text-lg font-medium mb-2">Email:</label>
                  <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              <div>
                  <label className="block text-lg font-medium mb-2">Name:</label>
                  <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              <div>
                  <label className="block text-lg font-medium mb-2">Phone:</label>
                  <input
                      type="text"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              <button 
                  type="submit" 
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                  Update
              </button>
          </form>
          <button 
              onClick={closeModal} 
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
              Cancel
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isPasswordModalOpen}
        onRequestClose={closeModal}
        contentLabel="Change Password"
        className="bg-none"
      >
        <div className="max-w-xl mx-auto mt-11 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                  <label className="block text-lg font-medium mb-2">Old Password:</label>
                  <input
                      type="password"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              <div>
                  <label className="block text-lg font-medium mb-2">New Password:</label>
                  <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              <div>
                  <label className="block text-lg font-medium mb-2">Confirm Password:</label>
                  <input
                      type="password"
                      name="confirmedPassword"
                      value={passwordData.confirmedPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
              <button 
                  type="submit" 
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                  Change Password
              </button>
          </form>
          <button 
              onClick={closeModal} 
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
              Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfilePage;