import React from 'react';
import { useAuth } from '../context/AuthContext';
import EngineerDashboard from './EngineerDashboard';
import FarmerDashboard from './FarmerDashboard';

/**
 * Dashboard - Role-based router.
 * Engineer → full monitoring + task/recommendation management
 * Farmer → simplified view + task execution + feedback
 */
const Dashboard = () => {
    const { user } = useAuth();

    if (user?.role === 'engineer') {
        return <EngineerDashboard />;
    }

    return <FarmerDashboard />;
};

export default Dashboard;
