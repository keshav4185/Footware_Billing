import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardOverview from './DashboardOverview';
import CustomersManagement from './CustomersManagement';
import ProductsManagement from './ProductsManagement';
import InvoiceList from './InvoiceList';
import CreateBill from '../Dashboard/CreateBill';
import EmployeesManagement from './EmployeesManagement';
import Reports from './Reports';
import Profile from './Profile';
import Settings from './Settings';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin');
    }
    setBills(JSON.parse(localStorage.getItem('bills') || '[]'));
    setCustomers(JSON.parse(localStorage.getItem('customers') || '[]'));
    
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    if (savedProducts.length === 0) {
      const defaultProducts = [
        { id: 1, name: 'Product A', price: 100, stock: 50, category: 'Electronics' },
        { id: 2, name: 'Product B', price: 200, stock: 30, category: 'Clothing' },
        { id: 3, name: 'Product C', price: 150, stock: 5, category: 'Books' }
      ];
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      setProducts(defaultProducts);
    } else {
      setProducts(savedProducts);
    }
  }, [navigate]);

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return <DashboardOverview bills={bills} customers={customers} products={products} />;
      case 'create-invoice':
        return <CreateBill isDarkMode={false} />;
      case 'customers':
        return <CustomersManagement customers={customers} setCustomers={setCustomers} />;
      case 'products':
        return <ProductsManagement products={products} setProducts={setProducts} />;
      case 'invoices':
        return <InvoiceList bills={bills} setBills={setBills} />;
      case 'employees':
        return <EmployeesManagement />;
      case 'reports':
        return <Reports bills={bills} customers={customers} products={products} />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview bills={bills} customers={customers} products={products} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-pink-300/15 to-yellow-300/15 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-blue-200/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-4 border-purple-200/30 rotate-45 animate-pulse-slow"></div>
      </div>
      
      {/* Sidebar */}
      <div className="relative z-10">
        <AdminSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 sm:ml-64 lg:ml-72 relative z-10">
        {/* Header */}
        <AdminHeader 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        
        {/* Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-8 overflow-y-auto backdrop-blur-sm">
          <div className="animate-fadeInUp">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;