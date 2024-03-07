import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        groups: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('api/users/');
            console.log(response.data)
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createUser = async () => {
        try {
            console.log(formData)
            
            await axios.post('api/users/', {
                username: formData.username,
                email: formData.email,
                groups: [formData.groups],
                password: formData.password,
                confirm_password: formData.confirm_password
            });
            console.log("Created new user" + formData.username)
            fetchUsers();
        } catch (error) {
            console.error('Error creating user', error);
        }
    };

    const updateUser = async () => {
        // Need to change the PW update, such that this is not always required,
        // aka PATCH vs PUT, and probably so that it is a separate process w modal
        try {
            if (formData.password === formData.confirm_password) {
                await axios.put(`api/users/${selectedUser}/`, {
                    username: formData.username,
                    email: formData.email,
                    groups: [formData.groups],
                    password: formData.password
                });
                console.log('Updated user' + formData.username)
                fetchUsers();
            }
            else {
                console.log("Password and Confirm Password values do not match.")
            };
            
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`api/users/${userId}/`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleEditUser = async (userID) => {
        const user = users.find(user => user.id === userID);
        formData.email = user.email;
        formData.username = user.username;
        // also set role value!
        setSelectedUser(user.id);
    };

    return (
        <div className="content-container">
            <h1>Admin User Management</h1>
            <div>
                <label>Email</label><input name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} />
                <label>Username</label><input name="username" placeholder="Username" value={formData.username} onChange={handleFormChange} />
                <label>Password</label><input name="password" type='password' placeholder="Password" value={formData.password} onChange={handleFormChange} />
                <label>Confirm Password</label><input name="confirm_password" type='password' placeholder="Confirm Password" value={formData.confirm_password} onChange={handleFormChange} />
                <select name="groups" value={formData.groups} onChange={handleFormChange}>
                    <option value="">Select Role</option>
                    <option value={"Admin"}>Admin</option>
                    <option value={"Guest"}>Guest</option>
                    <option value={"LimitedGuest"}>LimitedGuest</option>
                </select>
                <button onClick={createUser}>Create User</button>
                <button onClick={updateUser}>Update User</button>
            </div>
            <div>
                <h2>User List</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.username} - {user.groups}
                            <button onClick={() => handleEditUser(user.id)}>Edit</button>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserManagementPage;