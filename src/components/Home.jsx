import React from 'react';
import NavBar from './NavBar';
import { useUser } from '../contexts/AuthContext';
import '../styles.css';

const Home = ({ children }) => {
    const user = useUser();

    return (
        <div>
            <NavBar />
            <div className="container">
                <h1>Welcome, {user.name}</h1>
                <div className="welcome-container">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Home;
