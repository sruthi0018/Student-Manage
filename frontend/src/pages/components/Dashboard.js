import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, description, route,}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        height: '100%',
        borderRadius: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardActionArea onClick={() => navigate(route)} sx={{ height: '100%' }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#4b5563' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DashboardCard;
