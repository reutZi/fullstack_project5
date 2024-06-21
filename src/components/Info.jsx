import React from 'react';
import { useUser } from '../contexts/AuthContext';
import '../styles.css';

const Info = () => {
    const user = useUser();

    return (
        <div className="info-container">
            <div className="info-box">
                <h1 className="info-title">User Info</h1>
                <div className="info-item"><strong>Name:</strong> {user.name}</div>
                <div className="info-item"><strong>Username:</strong> {user.username}</div>
                <div className="info-item"><strong>Email:</strong> {user.email}</div>
                <div className="info-item"><strong>Phone:</strong> {user.phone}</div>
                <div className="info-item"><strong>Website:</strong> {user.website}</div>
                <h2>Address</h2>
                <div className="info-item"><strong>Street:</strong> {user.address.street}</div>
                <div className="info-item"><strong>Suite:</strong> {user.address.suite}</div>
                <div className="info-item"><strong>City:</strong> {user.address.city}</div>
                <div className="info-item"><strong>Zipcode:</strong> {user.address.zipcode}</div>
                <div className="info-item"><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</div>
                <h2>Company</h2>
                <div className="info-item"><strong>Name:</strong> {user.company.name}</div>
                <div className="info-item"><strong>CatchPhrase:</strong> {user.company.catchPhrase}</div>
                <div className="info-item"><strong>BS:</strong> {user.company.bs}</div>
            </div>
        </div>
    );
};

export default Info;
