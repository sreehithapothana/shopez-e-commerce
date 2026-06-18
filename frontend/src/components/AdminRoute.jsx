import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { userInfo } = useContext(AuthContext);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.isAdmin) {
    // If a normal customer tries to access admin routes, boot them to home
    return <Navigate to="/customer/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
