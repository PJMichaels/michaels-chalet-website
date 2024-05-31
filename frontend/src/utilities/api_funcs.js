// api_funcs.js
import axios from 'axios';


// Base URL for your API
const BASE_URL = '/api/';


// Function to fetch data from booking endpoint
export const fetchProvisionedData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/availability/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to fetch data from request endpoint
export const fetchRequestsData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/requests/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to fetch data from request endpoint
export const fetchMyRequestsData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/myrequests/`);
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


// Function to fetch data from booking endpoint
export const fetchMyBookingsData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mybookings/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
  

// Function to fetch data from booking endpoint
export const postBookingChangeRequest = async (bookingObject, request_type) => {
  try {
    const response = await axios.post(`${BASE_URL}/myrequests/`, {
      "booking": bookingObject.id,
      "created_by": bookingObject.created_by,
      "group_size": bookingObject.group_size,
      "arrival_date": bookingObject.arrival_date,
      "departure_date": bookingObject.departure_date,
      "request_message": bookingObject.request_message,
      "request_type": request_type,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// axios.post(`/api/myrequests/`, {
//   "booking": bookingObject.id,
//   "created_by": bookingObject.created_by,
//   "group_size": bookingObject.group_size,
//   "arrival_date": bookingObject.arrival_date,
//   "departure_date": bookingObject.departure_date,
//   "request_message": bookingObject.request_message,
//   "request_type": "cancellation"
// })
//   .then((response) => {
//       console.log(response.data);
//       fetchData();
//   })
//   .catch((error) => {
//       // This error should really be in a modal long term
//       console.error("An error occurred while posting data: ", error);
//   });
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