import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useLogin } from '../contexts/AuthContext';
import '../styles.css';

const API_URL = 'http://localhost:5000/users';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    street: yup.string().required('Street is required'),
    suite: yup.string().required('Suite is required'),
    city: yup.string().required('City is required'),
    zipcode: yup.string().required('Zipcode is required'),
    lat: yup.string().required('Latitude is required'),
    lng: yup.string().required('Longitude is required'),
    phone: yup.string().required('Phone is required'),
    companyName: yup.string().required('Company name is required'),
    catchPhrase: yup.string().required('Catch phrase is required'),
    bs: yup.string().required('BS is required'),
});

const UserDetails = () => {
    const location = useLocation();
    const { state } = location;
    const { userData } = state || {};
    const login = useLogin();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            if (!userData) {
                throw new Error('User data not found');
            }

            const response = await axios.get(`${API_URL}`);
            const users = response.data;
            const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;

            const newUser = {
                id: maxId + 1,
                name: data.name,
                username: userData.username,
                email: data.email,
                address: {
                    street: data.street,
                    suite: data.suite,
                    city: data.city,
                    zipcode: data.zipcode,
                    geo: {
                        lat: data.lat,
                        lng: data.lng,
                    },
                },
                phone: data.phone,
                website: userData.password,
                company: {
                    name: data.companyName,
                    catchPhrase: data.catchPhrase,
                    bs: data.bs,
                },
            };
            await axios.post(`${API_URL}`, newUser);
            login(newUser.username);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Complete User Details</h2>
            <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <input
                    type="text"
                    placeholder="Name"
                    {...register('name')}
                    className={`input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    className={`input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="text"
                    placeholder="Street"
                    {...register('street')}
                    className={`input ${errors.street ? 'input-error' : ''}`}
                />
                {errors.street && <p>{errors.street.message}</p>}
                <input
                    type="text"
                    placeholder="Suite"
                    {...register('suite')}
                    className={`input ${errors.suite ? 'input-error' : ''}`}
                />
                {errors.suite && <p>{errors.suite.message}</p>}
                <input
                    type="text"
                    placeholder="City"
                    {...register('city')}
                    className={`input ${errors.city ? 'input-error' : ''}`}
                />
                {errors.city && <p>{errors.city.message}</p>}
                <input
                    type="text"
                    placeholder="Zipcode"
                    {...register('zipcode')}
                    className={`input ${errors.zipcode ? 'input-error' : ''}`}
                />
                {errors.zipcode && <p>{errors.zipcode.message}</p>}
                <input
                    type="text"
                    placeholder="Latitude"
                    {...register('lat')}
                    className={`input ${errors.lat ? 'input-error' : ''}`}
                />
                {errors.lat && <p>{errors.lat.message}</p>}
                <input
                    type="text"
                    placeholder="Longitude"
                    {...register('lng')}
                    className={`input ${errors.lng ? 'input-error' : ''}`}
                />
                {errors.lng && <p>{errors.lng.message}</p>}
                <input
                    type="text"
                    placeholder="Phone"
                    {...register('phone')}
                    className={`input ${errors.phone ? 'input-error' : ''}`}
                />
                {errors.phone && <p>{errors.phone.message}</p>}
                <input
                    type="text"
                    placeholder="Company Name"
                    {...register('companyName')}
                    className={`input ${errors.companyName ? 'input-error' : ''}`}
                />
                {errors.companyName && <p>{errors.companyName.message}</p>}
                <input
                    type="text"
                    placeholder="Catch Phrase"
                    {...register('catchPhrase')}
                    className={`input ${errors.catchPhrase ? 'input-error' : ''}`}
                />
                {errors.catchPhrase && <p>{errors.catchPhrase.message}</p>}
                <input
                    type="text"
                    placeholder="BS"
                    {...register('bs')}
                    className={`input ${errors.bs ? 'input-error' : ''}`}
                />
                {errors.bs && <p>{errors.bs.message}</p>}
                <button type="submit" className="button">Submit</button>
            </form>
        </div>
    );
};

export default UserDetails;
