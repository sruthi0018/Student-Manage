import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, description, route }) => {
  const navigate = useNavigate();
  return (
    <Card elevation={1} sx={{ height: '100%' }}>
      <CardActionArea onClick={() => navigate(route)}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#333' }}>{title}</Typography>
          <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DashboardCard;
