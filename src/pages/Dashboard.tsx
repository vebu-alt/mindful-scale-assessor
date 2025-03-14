
import React from 'react';
import Layout from '@/components/Layout';
import DashboardContent from '@/components/dashboard/Dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
          <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <Layout>
      <DashboardContent />
    </Layout>
  );
};

export default Dashboard;
