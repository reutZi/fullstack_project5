// src/components/Home.js
import React from 'react';
import NavBar from './NavBar';

const Home = ({ children }) => {
    return (
        <div>
            <NavBar />
            <div>
                {children}
            </div>
        </div>
    );
};

export default Home;
