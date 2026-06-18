import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CustomerRoute = () => {
  const { userInfo } = useContext(AuthContext);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (userInfo.isAdmin) {
    // If an admin tries to access customer routes, boot them to the admin dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default CustomerRoute;
