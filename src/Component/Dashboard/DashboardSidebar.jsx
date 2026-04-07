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
    { id: 'analytics', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'create-bill', icon: <Plus size={20} />, label: 'Create Bill' },
    { id: 'billings', icon: <FileText size={20} />, label: 'My Billings' },
    { id: 'customers', icon: <Users size={20} />, label: 'Customers' },
    // { id: 'products', icon: <Package size={20} />, label: 'Products' }
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
        <div className="mb-0">
          <div className="flex items-center gap-3 font-bold text-xl px-2 py-6">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md rotate-3 group-hover:rotate-0 transition-transform">
              <LayoutDashboard size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 tracking-tight">SMART SALES</span>
              <span className="text-[10px] text-blue-600 font-medium tracking-widest uppercase">Billing Pro</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 mt-4 space-y-1">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-200 group ${
                activeSection === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
              onClick={() => handleMenuClick(item.id)}
            >
              <span className={`${activeSection === item.id ? 'text-white' : 'text-blue-600 group-hover:scale-110'} transition-transform`}>
                {item.icon}
              </span>
              <span className="font-semibold tracking-tight">{item.label}</span>
            </div>
          ))}
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div 
            className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group" 
            onClick={handleLogout}
          >
            <LogOut size={20} className="text-gray-400 group-hover:text-red-600 transition-colors" />
            <span className="font-semibold tracking-tight">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;