
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, ArrowUpRight, Users, ClipboardCheck, Clock, ArrowRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, onClick }) => (
  <div 
    className={`glass-panel p-6 ${onClick ? 'cursor-pointer card-hover' : ''}`}
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        
        {change && (
          <div className={`flex items-center mt-2 text-xs ${
            change.positive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{change.positive ? '+' : ''}{change.value}</span>
            <ArrowUpRight size={14} className="ml-1" 
              style={{ transform: change.positive ? 'none' : 'rotate(90deg)' }} 
            />
          </div>
        )}
      </div>
      
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </div>
  </div>
);

interface RecentAssessmentProps {
  patient: string;
  assessment: string;
  score: number;
  maxScore: number;
  severity: string;
  date: string;
  color: string;
}

const RecentAssessment: React.FC<RecentAssessmentProps> = ({
  patient,
  assessment,
  score,
  maxScore,
  severity,
  date,
  color
}) => (
  <div className="glass-panel p-5 card-hover">
    <div className="flex items-center justify-between mb-3">
      <p className="font-medium">{patient}</p>
      <span className="text-xs text-gray-500">{date}</span>
    </div>
    
    <p className="text-sm text-gray-600 mb-3">{assessment}</p>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-sm font-medium">{severity}</span>
      </div>
      
      <span className="text-sm font-medium">{score}/{maxScore}</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  // Mock data - in a real app, this would come from Firebase/backend
  const stats = [
    { 
      title: 'Total Patients', 
      value: '24', 
      icon: <Users size={20} className="text-primary" />,
      change: { value: '3', positive: true }
    },
    { 
      title: 'Assessments This Week', 
      value: '18', 
      icon: <ClipboardCheck size={20} className="text-primary" />,
      change: { value: '5', positive: true }
    },
    { 
      title: 'Average Response Time', 
      value: '2.4 days', 
      icon: <Clock size={20} className="text-primary" />,
      change: { value: '0.5 days', positive: false }
    },
    { 
      title: 'High Severity Cases', 
      value: '5', 
      icon: <BarChart size={20} className="text-primary" />,
      change: { value: '1', positive: false }
    }
  ];
  
  const recentAssessments = [
    {
      patient: 'John Doe',
      assessment: 'PHQ-9 (Depression)',
      score: 12,
      maxScore: 27,
      severity: 'Moderate',
      date: 'Today',
      color: '#fb923c'
    },
    {
      patient: 'Jane Smith',
      assessment: 'GAD-7 (Anxiety)',
      score: 16,
      maxScore: 21,
      severity: 'Severe',
      date: 'Yesterday',
      color: '#ef4444'
    },
    {
      patient: 'Michael Brown',
      assessment: 'PCL-5 (PTSD)',
      score: 28,
      maxScore: 80,
      severity: 'Below Threshold',
      date: '3 days ago',
      color: '#4ade80'
    },
    {
      patient: 'Sarah Johnson',
      assessment: 'PHQ-9 (Depression)',
      score: 8,
      maxScore: 27,
      severity: 'Mild',
      date: '5 days ago',
      color: '#facc15'
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex space-x-4">
          <button className="btn-primary">
            New Assessment
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Patient Overview</h2>
          <Link
            to="/patients"
            className="text-primary hover:underline flex items-center text-sm font-medium"
          >
            <span>View all patients</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-0.5 flex mb-6">
          <button className="flex-1 py-2 px-4 rounded-md bg-white shadow-sm text-sm font-medium">
            All Patients
          </button>
          <button className="flex-1 py-2 px-4 text-sm text-gray-600 hover:bg-white/50 rounded-md transition-colors">
            High Risk
          </button>
          <button className="flex-1 py-2 px-4 text-sm text-gray-600 hover:bg-white/50 rounded-md transition-colors">
            Recent Activity
          </button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {/* This would be a real component with patient data in a real app */}
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users size={16} className="text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">Patient {index + 1}</p>
                  <p className="text-sm text-gray-500">Last assessment: 3 days ago</p>
                </div>
              </div>
              <Link 
                to="/patients/1" 
                className="text-primary hover:underline text-sm"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Recent Assessments</h2>
          <Link
            to="/assessments"
            className="text-primary hover:underline flex items-center text-sm font-medium"
          >
            <span>View all assessments</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentAssessments.map((assessment, index) => (
            <RecentAssessment key={index} {...assessment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
