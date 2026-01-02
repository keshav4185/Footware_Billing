import React, { useState } from 'react';
import DashboardSidebar from '../../Component/Dashboard/DashboardSidebar';
import DashboardContent from '../../Component/Dashboard/DashboardContent';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('create-bill');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans relative">
      <DashboardSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <DashboardContent 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
};

export default Dashboard;