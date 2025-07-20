// src/pages/Unauthorized.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const Unauthorized = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" color="error">
        Unauthorized Access
      </Typography>
      <Typography>You do not have permission to view this page.</Typography>
    </Box>
  );
};

export default Unauthorized;
