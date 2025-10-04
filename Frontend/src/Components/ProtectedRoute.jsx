import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        // If no user, redirect to login page
        return <Navigate to="/login" replace />;
    }
    
    // If there are allowedRoles and the user's role is not in the array, redirect
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to an "unauthorized" page or their default dashboard
        const defaultDashboard = user.role === 'admin' ? '/admin/dashboard' : '/analyst/dashboard';
        return <Navigate to={defaultDashboard} replace />;
    }

    // If authorized, render the child component
    return <Outlet />;
};

export default ProtectedRoute;