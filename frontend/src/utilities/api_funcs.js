// api_funcs.js

const API_ENDPOINT = 'http://yourapi.com/api/users';

export const fetchUsers = async () => {
    return fetch(API_ENDPOINT).then(res => res.json());
};

export const createUser = async (userData) => {
    return fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const updateUser = async (userId, userData) => {
    return fetch(`${API_ENDPOINT}/${userId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const deleteUser = async (userId) => {
    return fetch(`${API_ENDPOINT}/${userId}/`, {
        method: 'DELETE',
    });
};