// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button,
//   Menu,
//   MenuItem,
//   Avatar,
// } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";

// const Header = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const { user, token, logout } = useAuth();

//   const handleMenu = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);
//   const handleLogout = () => {
//     setAnchorEl(null);
//     logout();
//     // Clear JWT
//   };

//   return (
//    <AppBar position="fixed" sx={{ backgroundColor: '#1e3a8a', boxShadow: 'none', borderBottom: '1px solid #E0E0E0' }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1, color: '#facc15' }}>
//           Student Management
//         </Typography>
//         {token ? (
//           <IconButton onClick={handleLogout} sx={{ color: '#333' }}>
//             <Avatar />
//           </IconButton>
//         ) : (
//           <Button  sx={{ color: '#facc15' }}>
//             Login
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor:"#1e3a8a"}}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1,color:"#facc15" }}>
        Student Management
      </Typography>
      <IconButton color="inherit">
        <Avatar />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Header;
