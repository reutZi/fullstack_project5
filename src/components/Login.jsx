import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useLogin } from '../contexts/AuthContext';
import '../styles.css';

const API_URL = 'http://localhost:5000/users';

const schema = yup.object().shape({
    userName: yup.string().required('Username is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

const Login = () => {
    const login = useLogin();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`${API_URL}?username=${data.userName}`);

            if (!response.status === 200) {
                throw new Error('Username does not exist');
            }

            const user = response.data[0];

            if (user.website === data.password) {
                login(user.username);
            } else {
                throw new Error('Invalid password.');
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <input
                    type="text"
                    id="userName"
                    placeholder="Username"
                    {...register('userName')}
                    className={`input ${errors.userName ? 'input-error' : ''}`}
                />
                {errors.userName && <p>{errors.userName.message}</p>}
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register('password')}
                    className={`input ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit" className="button">Login</button>
                <p>
                    Don't have an account? <NavLink to="/register">Sign up</NavLink>
                </p>
            </form>
        </div>
    );
};

export default Login;
