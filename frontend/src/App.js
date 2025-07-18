import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomePage from './pages/layout/Home';
import StudentPage from './pages/layout/StudentListingPage';
import Header from './pages/components/Header';
import SideNav from './pages/components/SideBar';
import { Box, Toolbar } from '@mui/material';
import StaffPage from './pages/layout/StaffListingPage';


// function App() {
//   return (
//     <AuthProvider>
//     <Router>
//       <Routes>
//         <Route path="/" element={<Register/>} />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/home" element={<HomePage/>} />
//         <Route path="/students" element={<StudentPage/>} />

//       </Routes>
//     </Router>
//     </AuthProvider>
//   );
// }

// export default App;

const App = () => (
  <Router>
    <Header />
    <SideNav />
    <Box component="main" sx={{ ml: 26, p: 3 }}>
      <Toolbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </Box>
  </Router>
);

export default App;