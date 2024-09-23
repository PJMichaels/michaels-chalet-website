// api_funcs.js
import axios from 'axios';


// Base URL for your API
const BASE_URL = '/api';


// Function to fetch data from blocked dates endpoint
export const fetchBlockedDatesData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blocked/`);
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

// Function to fetch users from user endpoint
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to fetch users from user endpoint
export const fetchMyUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const updateUserProfile = async (profileData) => {
//   try {
//     const response = await axios.put(`${BASE_URL}/profile/`, {
//       "email": profileData.email,
//       "name": profileData.name,
//       "phone": profileData.phone,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateUserProfile = async (profileData) => {
//   console.log(profileData);
//   try {
//     const response = await axios.get(`${BASE_URL}/mybookings/`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }

//   return axios.put(`${BASE_URL}/profile/`, profileData);
// };

export const changeUserPassword = async (passwordData) => {
  return axios.put(`${BASE_URL}/profile/change-password/`, passwordData);
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

export const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}
  
// Function to delete a blocked date from the blocked endpoint
export const deleteBlockedDate = async (id) => {
  // expects the blocked item id
  try {
    const response = await axios.delete(`/api/blocked/${id}/`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while deleting blocked date item: ", error);
    throw error;
  }
}

export const addBlockedDate = async (date) => {
  // expects a new Date object as input
  try {
    const response = await axios.post('/api/blocked/', {
      "date": formatDate(date),
  })
    return response.data;
  } catch (error) {
    console.error("An error occurred while creating new blocked date item: ", error);
    throw error;
  }
}

// Function to fetch data from booking endpoint
export const postBookingChangeRequest = async (bookingObject, request_type) => {
  try {
    const response = await axios.post(`${BASE_URL}/myrequests/`, {
      "booking": bookingObject.id,
      "created_by": bookingObject.created_by.id,
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