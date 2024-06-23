import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../contexts/AuthContext';
import '../styles.css';

const NavBar = () => {
    const logout = useLogout();

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <div className="nav-links">
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/todos">Todos</NavLink></li>
                    <li><NavLink to="/posts">Posts</NavLink></li>
                    <li><NavLink to="/albums">Albums</NavLink></li>
                    <li><NavLink to="/info">Info</NavLink></li>
                </div>
                <li><button onClick={logout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default NavBar;
