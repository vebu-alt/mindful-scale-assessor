
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart, 
  ClipboardCheck, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed z-50 top-4 left-4 p-2 rounded-full bg-white shadow-md"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 z-40 w-64 bg-white border-r border-gray-100 transition-all duration-300 ease-in-out overflow-y-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <ClipboardCheck size={18} className="text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">MindScale</span>
            </Link>
          </div>
          
          {/* Sidebar Navigation */}
          <nav className="flex-1 pt-6 px-4 space-y-1">
            <Link 
              to="/dashboard" 
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive("/dashboard") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <BarChart size={20} />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/assessments" 
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive("/assessments") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <ClipboardCheck size={20} />
              <span>Assessments</span>
            </Link>
            
            <Link 
              to="/patients" 
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive("/patients") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <Users size={20} />
              <span>Patients</span>
            </Link>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
              <User size={20} />
              <span>Profile</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6 lg:p-10 max-w-7xl mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
