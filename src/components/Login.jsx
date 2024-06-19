import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import AuthContext from '../contexts/AuthContext';

const API_URL = 'http://localhost:5000/users';

const schema = yup.object().shape({
    userName: yup.string().required('Username is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

const Login = () => {
    const { login } = useContext(AuthContext);
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
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="100vh"
        >
            <Typography variant="h4" component="h2" gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '300px' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="userName"
                    label="Username"
                    {...register('userName')}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                <Typography variant="body2" align="center">
                    Don't have an account? <Link component={NavLink} to="/register">Sign up</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
