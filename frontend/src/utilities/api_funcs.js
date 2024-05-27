// api_funcs.js
import axios from 'axios';


// Base URL for your API
const BASE_URL = '/api/';


// Function to fetch data from request endpoint
export const fetchRequestsData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/requests/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to fetch data from booking endpoint
export const fetchBookingsData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bookings/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


// export const fetchUsers = async () => {
//     return fetch(API_ENDPOINT).then(res => res.json());
// };

// export const createUser = async (userData) => {
//     return fetch(API_ENDPOINT, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//     });
// };

// export const updateUser = async (userId, userData) => {
//     return fetch(`${API_ENDPOINT}/${userId}/`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//     });
// };

// export const deleteUser = async (userId) => {
//     return fetch(`${API_ENDPOINT}/${userId}/`, {
//         method: 'DELETE',
//     });
// };