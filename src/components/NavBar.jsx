// src/components/NavBar.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const NavBar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/todos">Todos</NavLink>
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/albums">Albums</NavLink>
            <NavLink to="/info">Info</NavLink>
            <button onClick={logout}>Logout</button>
        </nav>
    );
};

export default NavBar;
