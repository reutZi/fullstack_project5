import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Link } from '@mui/material';

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
            const response = await axios.get(`http://localhost:5000/users?username=${data.username}`);
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
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="100vh"
        >
            <Typography variant="h4" component="h2" gutterBottom>
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '300px' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username?.message}
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="verifyPassword"
                    label="Verify Password"
                    type="password"
                    {...register('verifyPassword')}
                    error={!!errors.verifyPassword}
                    helperText={errors.verifyPassword?.message}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
                <Typography variant="body2" align="center">
                    Already have an account? <Link component={NavLink} to="/login">Login</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;
