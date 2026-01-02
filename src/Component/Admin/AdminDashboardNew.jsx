  // import React, { useState, useEffect } from 'react';
  // import { useNavigate } from 'react-router-dom';
  // import AdminSidebar from './AdminSidebar';
  // import AdminHeader from './AdminHeader';
  // import DashboardOverview from './DashboardOverview';
  // import CustomersManagement from './CustomersManagement';
  // import ProductsManagement from './ProductsManagement';
  // import InvoiceList from './InvoiceList';
  // import PaymentsReport from './PaymentsReport';
  // import Settings from './Settings';

  // const AdminDashboard = () => {
  //   const [activeSection, setActiveSection] = useState('overview');
  //   const [bills, setBills] = useState([]);
  //   const [customers, setCustomers] = useState([]);
  //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!localStorage.getItem('adminLoggedIn')) {
  //       navigate('/admin');
  //     }
  //     setBills(JSON.parse(localStorage.getItem('bills') || '[]'));
  //     setCustomers(JSON.parse(localStorage.getItem('customers') || '[]'));
  //   }, [navigate]);

  //   const renderContent = () => {
  //     switch(activeSection) {
  //       case 'overview':
  //         return <DashboardOverview bills={bills} customers={customers} />;
  //       case 'customers':
  //         return <CustomersManagement customers={customers} setCustomers={setCustomers} />;
  //       case 'products':
  //         return <ProductsManagement />;
  //       case 'invoices':
  //         return <InvoiceList bills={bills} setBills={setBills} />;
  //       case 'payments':
  //         return <PaymentsReport bills={bills} />;
  //       case 'settings':
  //         return <Settings />;
  //       default:
  //         return <DashboardOverview bills={bills} customers={customers} />;
  //     }
  //   };

  //   return (
  //     <div className="min-h-screen bg-gray-50 flex">
  //       {/* Sidebar */}
  //       <AdminSidebar 
  //         activeSection={activeSection} 
  //         setActiveSection={setActiveSection}
  //         isSidebarOpen={isSidebarOpen}
  //         setIsSidebarOpen={setIsSidebarOpen}
  //       />
        
  //       {/* Main Content */}
  //       <div className="flex-1 flex flex-col lg:ml-0">
  //         {/* Header */}
  //         <AdminHeader 
  //           isSidebarOpen={isSidebarOpen} 
  //           setIsSidebarOpen={setIsSidebarOpen} 
  //         />
          
  //         {/* Content */}
  //         <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
  //           {renderContent()}
  //         </main>
  //       </div>
  //     </div>
  //   );
  // };

  // export default AdminDashboard;