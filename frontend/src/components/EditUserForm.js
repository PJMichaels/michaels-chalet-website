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
            'email': formData.email,
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
        <div>
         <form onSubmit={handleSubmit}>
            <label>Editing User ID: {userObject.id}</label>
            <br></br>
            <label>Name:</label>
            <input type="text" defaultValue={formData.name} name="name" onChange={handleChange} required />
            <br></br>
            <label>Email:</label>
                <input type="email" defaultValue={formData.email} name="email" onChange={handleChange} required />
            <br></br>
            <label>Phone Number:</label>
                <input type="phone" defaultValue={formData.phone} name="phone" onChange={handleChange} required />
            <br></br>
            <label>Role:</label>
                <input type="radio" id="Admin" name="group" value={"Admin"} onChange={handleChange}/><label>Admin</label>
                <input type="radio" id="Guest" name="group" value={"Guest"} onChange={handleChange}/><label>Guest</label>
                <input type="radio" id="LimitedGuest" name="group" value={"LimitedGuest"} onChange={handleChange}/><label>LimitedGuest</label>
            <br></br>
            <button className="button" type="submit">Update User</button>
         </form>
     </div>
    );
};

export default EditUserForm;