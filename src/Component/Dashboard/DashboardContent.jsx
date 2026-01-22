import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateBill from './CreateBill';
import BillingsList from './BillingsList';
import CustomersList from './CustomersList';
import DashboardHome from './DashboardHome';
import EmployeeDashboard from './EmployeeDashboard';

const DashboardContent = ({ activeSection, sidebarOpen, setSidebarOpen, setActiveSection }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [editingBill, setEditingBill] = React.useState(null);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto dark mode based on time
  React.useEffect(() => {
    const hour = currentTime.getHours();
    setIsDarkMode(hour >= 18 || hour < 6);
  }, [currentTime]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: 'Good Morning', icon: '🌅', color: 'text-orange-600' };
    if (hour < 17) return { text: 'Good Afternoon', icon: '☀️', color: 'text-yellow-600' };
    if (hour < 21) return { text: 'Good Evening', icon: '🌆', color: 'text-purple-600' };
    return { text: 'Good Night', icon: '🌙', color: 'text-blue-600' };
  };

  const getThemeClasses = () => {
    return isDarkMode 
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white'
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800';
  };

  const handleLogout = () => {
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('employee');
    localStorage.removeItem('loggedInEmployee');
    navigate('/Account');
  };

  const handleCreateBill = () => {
    setEditingBill(null);
    setSelectedCustomer(null);
    setActiveSection('create-bill');
  };

  const handleCreateInvoiceForCustomer = (customer) => {
    setSelectedCustomer(customer);
    setEditingBill(null);
    setActiveSection('create-bill');
  };

  const handleEditBill = (bill) => {
    setEditingBill(bill);
    setActiveSection('create-bill');
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'create-bill':
        return <CreateBill isDarkMode={isDarkMode} editingBill={editingBill} selectedCustomer={selectedCustomer} />;
      case 'billings':
        return <BillingsList isDarkMode={isDarkMode} onEditBill={handleEditBill} />;
      case 'customers':
        return <CustomersList isDarkMode={isDarkMode} onCreateInvoice={handleCreateInvoiceForCustomer} />;
      case 'analytics':
        return <EmployeeDashboard isDarkMode={isDarkMode} />;
      case 'products':
        return (
          <div className="p-4 md:p-6">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <span className="text-2xl">📦</span> Products
                </h2>
                <p className="text-sm text-gray-600">Manage your product inventory</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-dashed border-blue-300 text-center">
                  <div className="text-4xl mb-3">👟</div>
                  <h3 className="font-bold text-gray-800 mb-2">Product A</h3>
                  <p className="text-sm text-gray-600">Sample product description</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-dashed border-green-300 text-center">
                  <div className="text-4xl mb-3">👕</div>
                  <h3 className="font-bold text-gray-800 mb-2">Product B</h3>
                  <p className="text-sm text-gray-600">Sample product description</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-dashed border-purple-300 text-center">
                  <div className="text-4xl mb-3">➕</div>
                  <h3 className="font-bold text-gray-800 mb-2">Add Product</h3>
                  <p className="text-sm text-gray-600">Coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <DashboardHome handleCreateBill={handleCreateBill} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`flex-1 overflow-y-auto relative transition-all duration-500 ${getThemeClasses()}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 right-10 w-32 h-32 rounded-full opacity-20 animate-pulse ${
          isDarkMode ? 'bg-blue-400' : 'bg-yellow-400'
        }`}></div>
        <div className={`absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-15 animate-bounce ${
          isDarkMode ? 'bg-purple-400' : 'bg-pink-400'
        }`}></div>
        <div className={`absolute top-1/2 left-1/3 w-16 h-16 rounded-full opacity-10 animate-ping ${
          isDarkMode ? 'bg-indigo-400' : 'bg-green-400'
        }`}></div>
      </div>

      {/* Mobile Header with Theme */}
      <header className={`flex justify-between items-center p-4 shadow-sm md:hidden relative z-10 ${
        isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'
      }`}>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          <span className="text-xl">{sidebarOpen ? '✕' : '☰'}</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-pulse">{getGreeting().icon}</span>
          <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Smart Sales</h1>
        </div>
        <button 
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300 hover:scale-105 shadow-lg" 
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </header>

      {/* Desktop Header with Enhanced Greeting */}
      <header className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8 gap-4 p-4 md:p-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full animate-pulse ${
            isDarkMode ? 'bg-gray-800 shadow-2xl' : 'bg-white shadow-xl'
          }`}>
            <span className="text-4xl">{getGreeting().icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Employee Dashboard
              </h1>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{isDarkMode ? '☀️' : '🌙'}</span>
              </button>
            </div>
            <p className={`${getGreeting().color} font-medium flex items-center gap-2`}>
              {getGreeting().text}, {localStorage.getItem('loggedInEmployee') || JSON.parse(localStorage.getItem('employee') || '{}').name || 'Employee'}! 
              <span className="text-sm opacity-75">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="p-2 md:p-8 relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardContent;