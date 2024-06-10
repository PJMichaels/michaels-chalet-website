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
        <div>
         <form onSubmit={handleSubmit}>
            <label>Create New User:</label>
            <br></br>
            <label>Name:</label>
            <input type="text" defaultValue={formData.name} name="name" onChange={handleChange} required />
            <br></br>
            <label>Email:</label>
                <input type="email" defaultValue={formData.email} name="email" onChange={handleChange} required />
            <br></br>
            <label>Phone Number:</label>
                <input type="text" defaultValue={formData.phone} name="phone" onChange={handleChange} required />
            <br></br>
            <label>Role:</label>
                <input type="radio" id="Admin" name="group" value={"Admin"} onChange={handleChange}/><label>Admin</label>
                <input type="radio" id="Guest" name="group" value={"Guest"} checked onChange={handleChange}/><label>Guest</label>
                <input type="radio" id="LimitedGuest" name="group" value={"LimitedGuest"} onChange={handleChange}/><label>LimitedGuest</label>
            <br></br>
            <label>Password:</label>
            <input type="password" name="password" defaultValue={formData.password} onChange={handleChange}/>
            <br/>
            <label>Re-Enter Password:</label>
            <input type="password" name="checkPassword" defaultValue={formData.checkPassword} onChange={handleChange}/>
            <br/>
            <button className="button" type="submit">Create User</button>
         </form>
     </div>
    );
};

export default CreateUserForm;