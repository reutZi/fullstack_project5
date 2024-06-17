// src/components/Register.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    verifyPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});

const Register = ({ history }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`http://localhost:5000/users?username=${data.username}`);
            if (response.data.length > 0) {
                alert('Username already exists');
            } else {
                await axios.post('http://localhost:5000/users', { username: data.username, password: data.password });
                history.push('/userdetails');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username')} placeholder="Username" />
            <p>{errors.username?.message}</p>

            <input type="password" {...register('password')} placeholder="Password" />
            <p>{errors.password?.message}</p>

            <input type="password" {...register('verifyPassword')} placeholder="Verify Password" />
            <p>{errors.verifyPassword?.message}</p>

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
