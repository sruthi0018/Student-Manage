import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomePage from './pages/layout/Home';
import StudentPage from './pages/layout/StudentListingPage';
import StaffPage from './pages/layout/StaffListingPage';
import Layout from './pages/layout/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import Unauthorized from './pages/layout/Unauthorized';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/students"
          element={
            user?.role === 'superadmin' || user?.permissions?.student?.view
              ? <StudentPage />
              : <Unauthorized />
          }
        />

        <Route path="/staff" element={<StaffPage />} />
      </Route>
    </Routes>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </Router>
);

export default App;
