import React from 'react';
import { Box, Typography, Grid, Paper, useTheme, Toolbar } from '@mui/material';
import Header from '../components/Header';
import DashboardCard from '../components/Dashboard';
import SideNav from '../components/SideBar';

const HomePage = () => {
  const currentUser = { name: 'Admin Two', role: 'superadmin' }; // Replace with real auth

  return (
    <>
      <Box component="main" >
        <Toolbar />
        <Typography variant="h5" sx={{ mb: 3, color: '#333' }}>
          Welcome, {currentUser.name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Manage Students"
              description="Create, view, edit or delete student records"
              route="/students"
            />
          </Grid>
         
            <Grid item xs={12} sm={6} md={4}>
              <DashboardCard
                title="Manage Staff"
                description="Add, modify, or delete staff accounts"
                route="/staff"
              />
            </Grid>
    
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="My Profile"
              description="View or update your personal profile"
              route="/profile"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;