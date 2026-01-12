import React from 'react';

const AdminSidebar = ({ activeSection, setActiveSection, isSidebarOpen, setIsSidebarOpen }) => {
  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Dashboard', color: 'text-blue-600' },
    { id: 'create-invoice', icon: '📝', label: 'Create Invoice', color: 'text-indigo-600' },
    { id: 'customers', icon: '👥', label: 'Customers', color: 'text-green-600' },
    { id: 'invoices', icon: '📄', label: 'Invoice List', color: 'text-orange-600' },
    { id: 'employees', icon: '👨‍💼', label: 'Employees', color: 'text-indigo-600' },
    { id: 'reports', icon: '📈', label: 'Reports', color: 'text-teal-600' },
    { id: 'profile', icon: '👤', label: 'Profile', color: 'text-indigo-600' },
    { id: 'settings', icon: '⚙️', label: 'Settings', color: 'text-gray-600' }
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
      <div className={`fixed left-0 top-0 h-screen bg-white shadow-xl z-50 flex flex-col w-64 lg:w-72 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      }`}>
      
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center font-bold text-sm lg:text-base">
              A
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-gray-800">Admin Panel</h2>
              <p className="text-xs lg:text-sm text-gray-500">Smart Billing</p>
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
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <span className={`text-lg lg:text-xl ${activeSection === item.id ? 'text-blue-600' : item.color}`}>
                {item.icon}
              </span>
              <span className="font-medium truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-3 lg:p-4 border-t border-gray-200 flex-shrink-0">
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
