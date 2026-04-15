import React, { useState } from 'react';
import DashboardSidebar from '../../Component/Dashboard/DashboardSidebar';
import DashboardContent from '../../Component/Dashboard/DashboardContent';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('employeeDarkMode') === 'true';
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newState = !prev;
      localStorage.setItem('employeeDarkMode', newState);
      return newState;
    });
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen font-sans relative transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <DashboardSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
      />
      <DashboardContent 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={toggleDarkMode}
      />
    </div>
  );
};

export default Dashboard;