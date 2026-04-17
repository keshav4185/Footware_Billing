import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  Sunrise,
  Sunset,
  LogOut,
  Menu,
  X,
  Package,
  Plus
} from 'lucide-react';
import CreateBill from './CreateBill';
import BillingsList from './BillingsList';
import CustomersList from './CustomersList';
import DashboardHome from './DashboardHome';
import EmployeeDashboard from './EmployeeDashboard';

const DashboardContent = ({ activeSection, sidebarOpen, setSidebarOpen, setActiveSection, isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [editingBill, setEditingBill] = React.useState(null);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products') || '[]'));
  }, []);

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: 'Good Morning', icon: Sunrise, color: 'text-orange-600' };
    if (hour < 17) return { text: 'Good Afternoon', icon: Sun, color: 'text-yellow-600' };
    if (hour < 21) return { text: 'Good Evening', icon: Sunset, color: 'text-purple-600' };
    return { text: 'Good Night', icon: Moon, color: 'text-blue-600' };
  };

  const getThemeClasses = () => {
    return isDarkMode
      ? 'bg-gray-900 text-white shadow-inner'
      : 'bg-gray-50 text-gray-800';
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
    switch (activeSection) {
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
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-gray-800">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                    <Package className="text-blue-600" size={24} /> Products List
                  </h2>
                  <p className="text-sm text-gray-600">Current available inventory</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {products.length} Items Total
                </div>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
                  <div className="text-5xl mb-4">📦</div>
                  <h3 className="font-bold text-gray-800 mb-2">No Products Available</h3>
                  <p className="text-gray-500">Contact Admin to add products</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="h-2 bg-blue-600 w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                          <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-xs font-bold">{product.category}</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Price:</span>
                            <span className="font-bold text-green-600 font-mono">₹{product.price?.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Available:</span>
                            <span className={`font-bold ${product.stock < 10 ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}>
                              {product.stock} units
                            </span>
                          </div>
                        </div>
                        {product.hsn && (
                          <div className="text-[10px] text-gray-400 font-mono text-center pt-3 border-t border-gray-50">
                            HSN: {product.hsn}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
        <div className={`absolute top-10 right-10 w-32 h-32 rounded-full opacity-20 animate-pulse ${isDarkMode ? 'bg-blue-400' : 'bg-yellow-400'
          }`}></div>
        <div className={`absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-15 animate-bounce ${isDarkMode ? 'bg-purple-400' : 'bg-pink-400'
          }`}></div>
        <div className={`absolute top-1/2 left-1/3 w-16 h-16 rounded-full opacity-10 animate-ping ${isDarkMode ? 'bg-indigo-400' : 'bg-green-400'
          }`}></div>
      </div>

      {/* Mobile Header with Theme */}
      <header className={`flex justify-between items-center p-4 shadow-sm md:hidden relative z-10 ${!isDarkMode ? 'bg-[#ba69c8] border-b border-[#a85db5]' : 'bg-[#6b2f7a] border-b border-[#5a2769]'
        }`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 flex items-center justify-center bg-white/20 hover:bg-white/30 text-white`}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2 text-white">
          {React.createElement(getGreeting().icon, { className: "animate-pulse text-white", size: 24 })}
          <h1 className={`text-lg font-bold text-white`}>SMART SALES Billing Pro</h1>
        </div>
        <button
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
          onClick={handleLogout}
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      {/* Desktop Header with Enhanced Greeting */}
      <header className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8 gap-4 p-4 md:p-8 relative z-10">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Employee Dashboard
              </h1>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center ${isDarkMode ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
              >
                {isDarkMode ? <Sun size={18} className="text-gray-300" /> : <Moon size={18} className="text-gray-300" />}
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