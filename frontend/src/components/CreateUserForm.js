import React, { useState } from 'react';
import Axios from 'axios';

const CreateUserForm = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        group: 'Guest',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await Axios.post('/api/create-user/', {
                email: formData.email.toLowerCase(),
                name: formData.name,
                phone: formData.phone,
                group: formData.group,
            });
            console.log(response.data);
            setMessage('Created New User');
            closeModal();
        } catch (error) {
            console.error("An error occurred while posting data: ", error);
            setMessage('An error occurred while creating the user.');
        } finally {
            setLoading(false);
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
                        value={formData.name} 
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
                        value={formData.email} 
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
                        value={formData.phone} 
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
                                checked={formData.group === 'Guest'}
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
                    disabled={loading}
                >
                    {loading ? 'Creating User...' : 'Create User'}
                </button>
                <button 
                    onClick={closeModal}
                    className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300 m-1"
                >
                    Close
                </button>
                {message && (
                    <div className={`mt-4 text-sm ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateUserForm;
