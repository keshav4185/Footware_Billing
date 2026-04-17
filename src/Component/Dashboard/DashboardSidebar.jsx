import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Plus,
  FileText,
  Users,
  Package,
  LogOut
} from 'lucide-react';

const DashboardSidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen, isDarkMode }) => {
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
    { id: 'analytics', icon: <LayoutDashboard size={20} />, label: 'Dashboard', color: isDarkMode ? 'text-blue-400' : 'text-blue-600' },
    { id: 'create-bill', icon: <Plus size={20} />, label: 'Create Bill', color: isDarkMode ? 'text-purple-400' : 'text-purple-600' },
    { id: 'billings', icon: <FileText size={20} />, label: 'My Billings', color: isDarkMode ? 'text-orange-400' : 'text-orange-600' },
    { id: 'customers', icon: <Users size={20} />, label: 'Customers', color: isDarkMode ? 'text-green-400' : 'text-green-600' },
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
        fixed md:relative top-0 left-0 h-full w-64 flex flex-col p-4 z-50 transform transition-all duration-300 ease-in-out border-r
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        ${isDarkMode
          ? 'bg-gray-800 border-gray-700 text-white shadow-2xl shadow-black/50'
          : 'bg-white border-gray-200 text-gray-800 shadow-xl shadow-blue-100/50'
        }
      `}>
        <div className="mb-0">
          <div className="flex items-center gap-3 font-bold text-xl px-2 py-6">
            <div className={`p-2 rounded-xl shadow-md rotate-3 group-hover:rotate-0 transition-transform ${isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
              }`}>
              <LayoutDashboard size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SMART SALES</span>
              <span className={`text-[10px] font-medium tracking-widest uppercase ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>Billing Pro</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 mt-4 space-y-2">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-200 group ${activeSection === item.id
                ? isDarkMode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : isDarkMode
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
              onClick={() => handleMenuClick(item.id)}
            >
              <span className={`${activeSection === item.id ? 'text-white' : item.color} transition-transform group-hover:scale-110`}>
                {item.icon}
              </span>
              <span className="font-semibold tracking-tight">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className={`mt-auto pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div
            className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-200 group ${isDarkMode
              ? 'text-gray-400 hover:bg-red-900/40 hover:text-red-400'
              : 'text-gray-600 hover:bg-red-50 hover:text-red-700'
              }`}
            onClick={handleLogout}
          >
            <LogOut size={20} className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} group-hover:scale-110 transition-transform`} />
            <span className="font-semibold tracking-tight">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;