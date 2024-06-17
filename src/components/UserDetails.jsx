// src/components/UserDetails.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    website: yup.string().required(),
});

const UserDetails = ({ history }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const loggedUser = JSON.parse(localStorage.getItem('user'));
            await axios.put(`http://localhost:5000/users/${loggedUser.id}`, { ...loggedUser, ...data });
            history.push('/home');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Name" />
            <p>{errors.name?.message}</p>

            <input {...register('email')} placeholder="Email" />
            <p>{errors.email?.message}</p>

            <input {...register('phone')} placeholder="Phone" />
            <p>{errors.phone?.message}</p>

            <input {...register('website')} placeholder="Website" />
            <p>{errors.website?.message}</p>

            <button type="submit">Submit</button>
        </form>
    );
};

export default UserDetails;
