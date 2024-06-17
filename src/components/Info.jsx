// src/components/Info.js
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const Info = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>User Info</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
        </div>
    );
};

export default Info;
