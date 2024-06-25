import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLogout , useUser} from '../contexts/AuthContext';
import '../styles.css';

const NavBar = () => {
    const logout = useLogout();
    const user = useUser();

    return (
        <nav className="navbar">
            <ul className="nav-list">
            {user && 
                <div className="nav-links">
                    <li><NavLink to={`/users/${user.id}/home`}>Home</NavLink></li>
                    <li><NavLink to={`/users/${user.id}/todos`}>Todos</NavLink></li>
                    <li><NavLink to={`/users/${user.id}/posts`}>Posts</NavLink></li>
                    <li><NavLink to={`/users/${user.id}/albums`}>Albums</NavLink></li>
                    <li><NavLink to={`/users/${user.id}/info`}>Info</NavLink></li>
                </div>
                }
                <li><button onClick={logout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default NavBar;
