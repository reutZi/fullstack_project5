// src/components/Register.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    verifyPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});

const Register = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            console.log("i got here");
            const response = await axios.get(`http://localhost:5000/users?username=${data.username}`);
            if (response.data.length > 0) {
                alert('Username already exists');
            } else {
                console.log("i also got here");
                navigate('/userdetails', { state: { userData: data } });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign Up</h2>
            <input {...register('username')} placeholder="Username" />
            <p>{errors.username?.message}</p>

            <input type="password" {...register('password')} placeholder="Password" />
            <p>{errors.password?.message}</p>

            <input type="password" {...register('verifyPassword')} placeholder="Verify Password" />
            <p>{errors.verifyPassword?.message}</p>

            <button type="submit">Register</button>

            <p>
                Already have an account? <NavLink to="/login">Login</NavLink>
            </p>
        </form>
    );
};

export default Register;
