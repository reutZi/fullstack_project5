// src/components/Home.js
import React from 'react';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>This is the home page.</p>
        </div>
    );
};

export default Home;
