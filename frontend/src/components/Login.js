import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useAuth } from '../context/AuthContext'; // Import useAuth from your AuthContext


const Login = () => {     
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');     
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth(); // Use the useAuth hook to access your context

    // Extract the 'from' location from the state or default to the root
    const from = location.state?.from?.pathname || '/';

    // Create the submit method.
    const submit = async e => {
        e.preventDefault();          

        try {
            // Use the login function from your AuthContext
            await auth.login(email, password);

            // Navigate to the previous page or to the home page if no previous page is found
            navigate(from, { replace: true });
            
        } catch (error) {
            console.error('Login error', error);
            // Potentially update the state to show an error message to the user
        }    
    };    
        
    return (      
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={submit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input 
                            className="form-control mt-1" 
                            placeholder="Enter Email" 
                            name="email"  
                            type="text" 
                            value={email}
                            required 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input 
                            name="password" 
                            type="password"     
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
