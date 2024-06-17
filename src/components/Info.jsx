import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Box, Typography, Paper, Grid } from '@mui/material';

const Info = () => {
    const { user } = useContext(AuthContext);

    return (
        <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ padding: 2, width: '100%', maxWidth: 600 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    User Info
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Username:</strong> {user.username}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Website:</strong> {user.website}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2">Address</Typography>
                        <Typography variant="body1"><strong>Street:</strong> {user.address.street}</Typography>
                        <Typography variant="body1"><strong>Suite:</strong> {user.address.suite}</Typography>
                        <Typography variant="body1"><strong>City:</strong> {user.address.city}</Typography>
                        <Typography variant="body1"><strong>Zipcode:</strong> {user.address.zipcode}</Typography>
                        <Typography variant="body1"><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2">Company</Typography>
                        <Typography variant="body1"><strong>Name:</strong> {user.company.name}</Typography>
                        <Typography variant="body1"><strong>CatchPhrase:</strong> {user.company.catchPhrase}</Typography>
                        <Typography variant="body1"><strong>BS:</strong> {user.company.bs}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Info;
