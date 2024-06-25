import React, { useState } from 'react';
import Axios from 'axios';

const CreateUserForm = ({closeModal}) => {

    // Should adapt username and email to be the same and remove option
    const [formData, setFormData] = useState({
        email: null,
        name: null,
        phone: null,
        group: "Guest",
        password: null,
        checkPassword: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password && (formData.password === formData.checkPassword)) {
            // console.log('Passwords are equal and not null')
            Axios.post('/api/users/', {
            'email': formData.email,
            'name': formData.name,
            'phone': formData.phone,
            "groups": [formData.group],
            "password": formData.password,
        })
            .then((response) => {
                console.log(response.data);
                console.log('Created New User');
                closeModal();
            })
            .catch((error) => {
                // This error should really be in a modal long term
                console.error("An error occurred while posting data: ", error);
            });
        }
        
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md overflow-y-auto max-h-[90vh]">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2">Create New User:</label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <input 
                        type="text" 
                        defaultValue={formData.name} 
                        name="name" 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input 
                        type="email" 
                        defaultValue={formData.email} 
                        name="email" 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                    <input 
                        type="text" 
                        defaultValue={formData.phone} 
                        name="phone" 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input 
                                type="radio" 
                                id="Admin" 
                                name="group" 
                                value="Admin" 
                                onChange={handleChange} 
                                className="form-radio text-blue-500" 
                            />
                            <span className="ml-2 text-gray-700">Admin</span>
                        </label>
                        <label className="flex items-center">
                            <input 
                                type="radio" 
                                id="Guest" 
                                name="group" 
                                value="Guest" 
                                onChange={handleChange} 
                                className="form-radio text-blue-500" 
                                checked
                            />
                            <span className="ml-2 text-gray-700">Guest</span>
                        </label>
                        <label className="flex items-center">
                            <input 
                                type="radio" 
                                id="LimitedGuest" 
                                name="group" 
                                value="LimitedGuest" 
                                onChange={handleChange} 
                                className="form-radio text-blue-500" 
                            />
                            <span className="ml-2 text-gray-700">Limited Guest</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        defaultValue={formData.password} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Re-Enter Password:</label>
                    <input 
                        type="password" 
                        name="checkPassword" 
                        defaultValue={formData.checkPassword} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 m-1"
                >
                    Create User
                </button>
                <button 
                    onClick={() => closeModal()}
                    className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300 m-1"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CreateUserForm;