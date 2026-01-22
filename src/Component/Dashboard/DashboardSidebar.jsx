import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChartBar, 
  FaPlus, 
  FaFileInvoice, 
  FaUsers, 
  FaBox, 
  FaSignOutAlt 
} from 'react-icons/fa';

const DashboardSidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('employee');
    localStorage.removeItem('loggedInEmployee');
    navigate('/Account');
  };

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const menuItems = [
    { id: 'analytics', icon: <FaChartBar />, label: 'Dashboard' },
    { id: 'create-bill', icon: <FaPlus />, label: 'Create Bill' },
    { id: 'billings', icon: <FaFileInvoice />, label: 'My Billings' },
    { id: 'customers', icon: <FaUsers />, label: 'Customers' },
    // { id: 'products', icon: <FaBox />, label: 'Products' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col p-4 z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="mb-8">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="bg-green-600 text-white p-2 rounded-lg">
              <FaChartBar />
            </span>
            <span>SMART SALES</span>
          </div>
        </div>
        
        <nav className="flex-1">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={`flex items-center gap-3 p-3 mb-1 rounded-lg cursor-pointer transition-colors ${
                activeSection === item.id 
                  ? 'bg-green-600 text-white' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleMenuClick(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
        
        <div className="mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;