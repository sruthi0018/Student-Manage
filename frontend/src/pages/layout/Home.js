import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Toolbar,
} from '@mui/material';
import DashboardCard from '../components/Dashboard';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Box component="main" sx={{ p: 3, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Toolbar />
      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: '#ffffff' }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', color: "#1e3a8a" }}
        >
          Welcome, {user?.name || 'User'} 👋
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {(user?.role === 'superadmin' || user?.permissions?.student?.view) && (
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Manage Students"
              description="Create, view, edit or delete student records"
              route="/students"

            />
          </Grid>
        )}

        {user?.role === 'superadmin' && (
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Manage Staff"
              description="Create, view, edit or delete staff accounts"
              route="/staff"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
