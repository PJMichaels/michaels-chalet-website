import React, { useState } from 'react';
import Axios from 'axios';

const EditUserForm = ({userObject, closeModal}) => {

    // Should adapt username and email to be the same and remove option
    const [formData, setFormData] = useState({
        id: userObject.id,
        email: userObject.email,
        name: userObject.name,
        phone: userObject.phone,
        group: userObject.groups[0],
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.patch(`/api/users/${formData.id}/`, {
            'email': formData.email.toLowerCase(),
            'name' : formData.name,
            'phone': formData.phone,
            'groups': [formData.group],
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

    return (
        <div className="max-w-xl mx-auto mt-11 p-4 bg-white shadow-md rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Editing User:</label>
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
                        type="tel" 
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
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 m-1"
                >
                    Update User
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

export default EditUserForm;