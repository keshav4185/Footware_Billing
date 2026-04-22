import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  UserRoundCheck, 
  BarChart3, 
  UserCircle,
  MessageSquare
} from 'lucide-react';

const AdminSidebar = ({ activeSection, setActiveSection, isSidebarOpen, setIsSidebarOpen, isDarkMode }) => {
  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Dashboard', color: isDarkMode ? 'text-blue-400' : 'text-blue-600' },
    { id: 'inbox', icon: MessageSquare, label: 'Inbox', color: isDarkMode ? 'text-pink-400' : 'text-pink-600' },
    { id: 'customers', icon: Users, label: 'Customers', color: isDarkMode ? 'text-green-400' : 'text-green-600' },
    { id: 'invoices', icon: FileText, label: 'Invoice List', color: isDarkMode ? 'text-orange-400' : 'text-orange-600' },
    { id: 'employees', icon: UserRoundCheck, label: 'Employees', color: isDarkMode ? 'text-[#B564C3]' : 'text-[#3D0448]' },
    { id: 'reports', icon: BarChart3, label: 'Reports', color: isDarkMode ? 'text-teal-400' : 'text-teal-600' },
    { id: 'profile', icon: UserCircle, label: 'Profile', color: isDarkMode ? 'text-[#B564C3]' : 'text-[#3D0448]' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen shadow-xl z-50 flex flex-col w-64 lg:w-72 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      } ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      
        {/* Logo */}
        <div className={`p-4 lg:p-6 border-b flex-shrink-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-gradient-to-r from-[#3D0448] to-[#B564C3] text-white w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center font-bold text-sm lg:text-base">
              A
            </div>
            <div>
              <h2 className={`text-lg lg:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Admin Panel</h2>
              <p className={`text-xs lg:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Smart Billing</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false); // close sidebar on mobile
              }}
              className={`w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 text-sm lg:text-base ${
                activeSection === item.id
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-[#3D0448]/60 to-[#B564C3]/60 border-l-4 border-[#B564C3] text-white'
                    : 'bg-gradient-to-r from-[#3D0448]/10 to-[#B564C3]/10 border-l-4 border-[#3D0448] text-[#3D0448]'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <span className={`flex items-center justify-center ${activeSection === item.id ? (isDarkMode ? 'text-white' : 'text-[#3D0448]') : item.color}`}>
                <item.icon size={20} />
              </span>
              <span className="font-medium truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className={`p-3 lg:p-4 border-t flex-shrink-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        </div>
      </div>    
    </>
  );
};

export default AdminSidebar;
