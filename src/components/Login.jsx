// src/components/Login.js
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthContext from '../contexts/AuthContext';

const schema = yup.object().shape({
    userName: yup.string().required(),
    password: yup.string().min(4).required(),
});

const Login = () => {
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`http://localhost:5000/users?username=${data.userName}`);

            if(!response.status === 200){
                throw new Error('User name does not exist');
            }

            console.log(response);

            const user = response.data[0];

            if (user.website === data.password ) {
                login(user.username);
            } else {
                throw new Error('Invalid password.');
            }
          } catch (error) {
            alert(error);
          }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>UserName</label>
                    <input type="text" {...register('userName')} />
                    {errors.userName && <p>{errors.userName.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register('password')} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
