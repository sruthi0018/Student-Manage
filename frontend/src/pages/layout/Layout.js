// src/components/Layout.js
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from '../components/Header';
import SideNav from '../components/SideBar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        //   width: { sm: `calc(100% - ${drawerWidth}px)` },
        //   ml: { sm: `${drawerWidth}px` }, // Apply margin-left for the sidebar
        }}
      >
        <Toolbar />
     <Outlet/>
      </Box>
    </Box>
  );
};

export default Layout;