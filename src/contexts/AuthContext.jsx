// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const user = localStorage.getItem('user');
            if (user) {
                setUser(user);
            }
        };
        checkAuth();
    }, []);

    const login = async (userName) => {
        try {
            const response = await axios.get(`http://localhost:5000/users?username=${userName}`);
            const user = response.data[0];
    
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                navigate('/home');
            } else {
                alert('Unauthorized user.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const handle = async (obj) => {
        obj.forech((key, value) => {
            prompt(key + " " + value);
        });
    }


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
