import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';

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
  const { login } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (!userData) {
        throw new Error('User data not found');
      }
      const newUser = {
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
      await axios.post('http://localhost:5000/users', newUser);
      login(newUser.username);
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
        Complete User Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '600px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Street"
              {...register('street')}
              error={!!errors.street}
              helperText={errors.street?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Suite"
              {...register('suite')}
              error={!!errors.suite}
              helperText={errors.suite?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="City"
              {...register('city')}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Zipcode"
              {...register('zipcode')}
              error={!!errors.zipcode}
              helperText={errors.zipcode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Latitude"
              {...register('lat')}
              error={!!errors.lat}
              helperText={errors.lat?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Longitude"
              {...register('lng')}
              error={!!errors.lng}
              helperText={errors.lng?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Phone"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Company Name"
              {...register('companyName')}
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Catch Phrase"
              {...register('catchPhrase')}
              error={!!errors.catchPhrase}
              helperText={errors.catchPhrase?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="BS"
              {...register('bs')}
              error={!!errors.bs}
              helperText={errors.bs?.message}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default UserDetails;
