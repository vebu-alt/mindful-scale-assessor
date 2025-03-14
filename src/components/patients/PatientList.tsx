
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Search, Plus, ArrowUpDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PatientCardProps {
  id: string;
  name: string;
  email: string;
  lastAssessment: string;
  status: 'normal' | 'warning' | 'severe';
}

const PatientCard: React.FC<PatientCardProps> = ({ id, name, email, lastAssessment, status }) => {
  const getStatusColor = (status: 'normal' | 'warning' | 'severe') => {
    switch (status) {
      case 'normal':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'severe':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="glass-panel card-hover p-5 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <User size={20} className="text-gray-500" />
          </div>
          <div 
            className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white", 
              getStatusColor(status)
            )} 
          />
        </div>
        
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-sm text-gray-600">Last assessment</p>
        <p className="text-sm font-medium">{lastAssessment}</p>
      </div>
      
      <Link 
        to={`/patients/${id}`}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronRight size={18} className="text-gray-500" />
      </Link>
    </div>
  );
};

const PatientList: React.FC = () => {
  // Mock patient data - would come from backend in a real app
  const patients = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', lastAssessment: '2 days ago', status: 'normal' as const },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', lastAssessment: 'Yesterday', status: 'severe' as const },
    { id: '3', name: 'Robert Johnson', email: 'robert.j@example.com', lastAssessment: '1 week ago', status: 'warning' as const },
    { id: '4', name: 'Emily Davis', email: 'emily.d@example.com', lastAssessment: '3 days ago', status: 'normal' as const },
    { id: '5', name: 'Michael Brown', email: 'michael.b@example.com', lastAssessment: 'Today', status: 'severe' as const },
    { id: '6', name: 'Sarah Wilson', email: 'sarah.w@example.com', lastAssessment: '5 days ago', status: 'normal' as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <button className="btn-primary">
          <Plus size={16} className="mr-2" />
          Add Patient
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="pl-10 w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <ArrowUpDown size={14} className="mr-2" />
            Sort
          </button>
          <button className="btn-secondary">Filter</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patients.map(patient => (
          <PatientCard key={patient.id} {...patient} />
        ))}
      </div>
    </div>
  );
};

export default PatientList;
