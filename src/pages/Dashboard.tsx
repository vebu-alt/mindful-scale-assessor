
import React from 'react';
import Layout from '@/components/Layout';
import DashboardContent from '@/components/dashboard/Dashboard';
import MentalHealthChatbot from '@/components/ai/MentalHealthChatbot';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="ai-support">AI Support</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <DashboardContent />
        </TabsContent>
        <TabsContent value="ai-support">
          <MentalHealthChatbot />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Dashboard;
