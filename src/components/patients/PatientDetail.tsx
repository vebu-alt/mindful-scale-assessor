
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  ChevronLeft,
  BarChart2,
  ClipboardCheck
} from 'lucide-react';
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

// Mock assessment data - in a real app, this would come from Firebase/backend
const patientAssessments = [
  {
    id: '1',
    type: 'phq9',
    name: 'PHQ-9 (Depression)',
    date: '2023-06-01',
    score: 14,
    maxScore: 27,
    severity: 'Moderate',
    color: '#fb923c'
  },
  {
    id: '2',
    type: 'gad7',
    name: 'GAD-7 (Anxiety)',
    date: '2023-06-15',
    score: 12,
    maxScore: 21,
    severity: 'Moderate',
    color: '#fb923c'
  },
  {
    id: '3',
    type: 'phq9',
    name: 'PHQ-9 (Depression)',
    date: '2023-07-01',
    score: 10,
    maxScore: 27,
    severity: 'Moderate',
    color: '#fb923c'
  },
  {
    id: '4',
    type: 'gad7',
    name: 'GAD-7 (Anxiety)',
    date: '2023-07-15',
    score: 8,
    maxScore: 21,
    severity: 'Mild',
    color: '#facc15'
  },
  {
    id: '5',
    type: 'phq9',
    name: 'PHQ-9 (Depression)',
    date: '2023-08-01',
    score: 7,
    maxScore: 27,
    severity: 'Mild',
    color: '#facc15'
  },
  {
    id: '6',
    type: 'gad7',
    name: 'GAD-7 (Anxiety)',
    date: '2023-08-15',
    score: 6,
    maxScore: 21,
    severity: 'Mild',
    color: '#facc15'
  },
];

// Graph data transformation
const phq9Data = patientAssessments
  .filter(a => a.type === 'phq9')
  .map(a => ({
    date: a.date,
    score: a.score,
    maxScore: a.maxScore
  }));

const gad7Data = patientAssessments
  .filter(a => a.type === 'gad7')
  .map(a => ({
    date: a.date,
    score: a.score,
    maxScore: a.maxScore
  }));

// Mock patient data
const patientData = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  dateOfBirth: 'Jan 15, 1985',
  firstVisit: 'Mar 10, 2023',
  lastVisit: 'Aug 15, 2023',
  totalAssessments: patientAssessments.length
};

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="space-y-8">
      <div>
        <Link 
          to="/patients" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          <span>Back to Patients</span>
        </Link>
        
        <div className="glass-panel p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={24} className="text-gray-500" />
              </div>
              
              <div>
                <h1 className="text-2xl font-semibold">{patientData.name}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail size={14} className="mr-1" />
                    <span>{patientData.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone size={14} className="mr-1" />
                    <span>{patientData.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="btn-secondary">
                Message
              </button>
              <button className="btn-primary">
                <ClipboardCheck size={16} className="mr-2" />
                New Assessment
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm">Date of Birth</span>
              </div>
              <p className="font-medium">{patientData.dateOfBirth}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm">First Visit</span>
              </div>
              <p className="font-medium">{patientData.firstVisit}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center text-gray-500 mb-2">
                <Clock size={16} className="mr-2" />
                <span className="text-sm">Last Visit</span>
              </div>
              <p className="font-medium">{patientData.lastVisit}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center text-gray-500 mb-2">
                <ClipboardCheck size={16} className="mr-2" />
                <span className="text-sm">Total Assessments</span>
              </div>
              <p className="font-medium">{patientData.totalAssessments}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium flex items-center">
            <BarChart2 size={20} className="mr-2 text-primary" />
            Progress Tracking
          </h2>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
              <span>Depression (PHQ-9)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
              <span>Anxiety (GAD-7)</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { date: '2023-06-01', phq9: 14, gad7: null },
                { date: '2023-06-15', phq9: null, gad7: 12 },
                { date: '2023-07-01', phq9: 10, gad7: null },
                { date: '2023-07-15', phq9: null, gad7: 8 },
                { date: '2023-08-01', phq9: 7, gad7: null },
                { date: '2023-08-15', phq9: null, gad7: 6 },
              ]}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                }}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.toLocaleString('default', { month: 'long' })} ${d.getDate()}, ${d.getFullYear()}`;
                }}
                formatter={(value, name) => {
                  if (name === 'phq9') return [value, 'Depression Score'];
                  if (name === 'gad7') return [value, 'Anxiety Score'];
                  return [value, name];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="phq9" 
                stroke="#3b82f6" 
                fill="#3b82f680" 
                activeDot={{ r: 8 }} 
                connectNulls
              />
              <Area 
                type="monotone" 
                dataKey="gad7" 
                stroke="#60a5fa" 
                fill="#60a5fa80" 
                activeDot={{ r: 8 }} 
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <h3 className="text-lg font-medium mb-4">Assessment History</h3>
        
        <div className="divide-y divide-gray-100">
          {patientAssessments.map((assessment) => (
            <div key={assessment.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: assessment.color }}
                ></div>
                <div>
                  <p className="font-medium">{assessment.name}</p>
                  <p className="text-sm text-gray-500">{assessment.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="font-medium">{assessment.score}/{assessment.maxScore}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500">Severity</p>
                  <p 
                    className="font-medium"
                    style={{ color: assessment.color }}
                  >
                    {assessment.severity}
                  </p>
                </div>
                
                <button className="text-primary hover:underline text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
