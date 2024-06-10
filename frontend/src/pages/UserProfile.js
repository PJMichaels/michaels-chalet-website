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
  if (loading) return <div>Loading...</div>;

  // If there's an error, show an error message
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>My Profile Details:</h1>
      <div>
        <label>Name: {userData.name}</label><br/>
        <label>Email: {userData.email}</label><br/>
        <label>Phone Number: {userData.phone}</label><br/>
        <button onClick={() => setProfileModalOpen(true)}>Update Details</button>
        <button onClick={() => setPasswordModalOpen(true)}>Change Password</button>
      </div>

      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={closeModal}
        contentLabel="Update Profile"
      >
        <h2>Update Profile</h2>
        <form onSubmit={handleProfileSubmit}>
        <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
          />
          <br />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
          />
          <br />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleProfileChange}
          />
          <br />
          <button type="submit">Update</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <Modal
        isOpen={isPasswordModalOpen}
        onRequestClose={closeModal}
        contentLabel="Change Password"
      >
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
          />
          <br />
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
          <br />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmedPassword"
            value={passwordData.confirmedPassword}
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit">Change Password</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default UserProfilePage;