
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import AssessmentList from '@/components/assessments/AssessmentList';
import AssessmentForm from '@/components/assessments/AssessmentForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Assessments = () => {
  const { user, loading } = useAuth();
  const { type } = useParams<{ type: string }>();
  
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">
            {type ? 'Complete Assessment' : 'Assessments'}
          </h1>
          <p className="text-gray-600 mt-2">
            {type 
              ? 'Answer the following questions to complete the assessment' 
              : 'Select an assessment to administer to your patient'
            }
          </p>
        </div>
        
        {type ? <AssessmentForm /> : <AssessmentList />}
      </div>
    </Layout>
  );
};

export default Assessments;
