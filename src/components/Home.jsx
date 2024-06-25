import React from 'react';
import NavBar from './NavBar';
import { useUser } from '../contexts/AuthContext';
import '../styles.css';

const Home = ({ children }) => {
    const user = useUser();

    return (
        <div className="home-background">
            <div className="container">
            <h1 className='welcome'>
                    Welcome, {user.name}!
                    <br />
                    Let’s make today awesome.
                </h1>
                <div className="welcome-container">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Home;
