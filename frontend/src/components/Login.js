import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {     
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState('');    
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth(); // Use the useAuth hook to access your context

    // Extract the 'from' location from the state or default to the root
    const from = location.state?.from?.pathname || '/';

    // Create the submit method.
    const submit = async e => {
        e.preventDefault();
        setError('');          

        try {
            // Convert email to lowercase before calling login
            const success = await auth.login(email.toLowerCase(), password);
            if (success) {
                // Navigate to the previous page or to the home page if no previous page is found
                navigate(from, { replace: true });
            } else {
                setError('Invalid email or password'); // Set the error message
            }
        } catch (error) {
            console.error('Login error', error);
            setError('Invalid email or password'); // Set the error message
        }     
    };    
        
    return ( 
        <div className="bg-black bg-opacity-80 p-8 rounded-xl shadow-lg max-w-sm lg:max-w-md mx-auto my-10">
            <form onSubmit={submit} className="space-y-6">
                <h3 className='text-white text-2xl font-semibold'>Sign In</h3>
                
                <div>
                    <label className='text-white mb-2'>Email</label>
                    <input 
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter Email" 
                        name="email"  
                        type="text" 
                        value={email}
                        required 
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className='text-white mb-2'>Password</label>
                    <input 
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="password" 
                        type="password"     
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}
                
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
