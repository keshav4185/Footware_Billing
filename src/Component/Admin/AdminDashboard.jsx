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
    if (!localStorage.getItem('adminLoggedIn')) navigate('/admin');
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
    } else setProducts(savedProducts);
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
        return <Settings />;
      default:
        return <DashboardOverview bills={bills} customers={customers} products={products} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative bg-gray-50">
      
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col relative z-0 transition-all duration-300
                      ml-0 sm:ml-64 lg:ml-72">
        {/* Header */}
        <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
