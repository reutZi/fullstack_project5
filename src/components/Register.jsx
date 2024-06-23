import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles.css';

const API_URL = 'http://localhost:5000/users';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    verifyPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
});

const Register = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`${API_URL}?username=${data.username}`);
            if (response.data.length > 0) {
                alert('Username already exists');
            } else {
                navigate('/userdetails', { state: { userData: data } });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    {...register('username')}
                    className={`input ${errors.username ? 'input-error' : ''}`}
                />
                {errors.username && <p>{errors.username.message}</p>}
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register('password')}
                    className={`input ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input
                    type="password"
                    id="verifyPassword"
                    placeholder="Verify Password"
                    {...register('verifyPassword')}
                    className={`input ${errors.verifyPassword ? 'input-error' : ''}`}
                />
                {errors.verifyPassword && <p>{errors.verifyPassword.message}</p>}
                <button type="submit" className="button">Register</button>
                <p>
                    Already have an account? <NavLink to="/login">Login</NavLink>
                </p>
            </form>
        </div>
    );
};

export default Register;
