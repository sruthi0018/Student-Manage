import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const SideNav = () => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', top: 64, borderRight: '1px solid #E0E0E0',backgroundColor:"#1e3a8a" }
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton onClick={() => navigate('/')}>
          <ListItemText primary="Dashboard" sx={{color:"#facc15"}}/>
        </ListItemButton>
         <ListItemButton onClick={() => navigate('/staff')}>
          <ListItemText primary="Staff" sx={{color:"#facc15"}}/>
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/students')}>
          <ListItemText primary="Students" sx={{color:"#facc15"}}/>
        </ListItemButton>
       
      </List>
    </Drawer>
  );
};

export default SideNav;
