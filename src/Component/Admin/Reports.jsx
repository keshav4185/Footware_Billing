import React, { useState } from 'react';
import PaymentsReport from './PaymentsReport';

const Reports = ({ bills, customers, products }) => {
  const [activeReport, setActiveReport] = useState('payments');

  const reportTypes = [
    { id: 'payments', label: 'Payments Report', icon: '💳' },
    { id: 'sales', label: 'Sales Report', icon: '📊' },
    { id: 'customers', label: 'Customer Report', icon: '👥' },
    { id: 'products', label: 'Product Report', icon: '📦' }
  ];

  const SalesReport = () => {
    const salesData = bills.reduce((acc, bill) => {
      const date = new Date(bill.date);
      const month = date.toISOString().slice(0, 7);
      if (!acc[month]) acc[month] = { revenue: 0, count: 0 };
      acc[month].revenue += bill.grandTotal || 0;
      acc[month].count += 1;
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg font-bold">Total Sales</h3>
            <p className="text-2xl sm:text-3xl font-bold">₹{bills.reduce((sum, bill) => sum + (bill.grandTotal || 0), 0).toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg font-bold">Total Orders</h3>
            <p className="text-2xl sm:text-3xl font-bold">{bills.length}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg font-bold">Avg Order Value</h3>
            <p className="text-2xl sm:text-3xl font-bold">₹{bills.length ? (bills.reduce((sum, bill) => sum + (bill.grandTotal || 0), 0) / bills.length).toFixed(2) : '0.00'}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg font-bold mb-4">Monthly Sales</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Month</th>
                  <th className="text-left py-2">Orders</th>
                  <th className="text-left py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(salesData).map(([month, data]) => (
                  <tr key={month} className="border-b">
                    <td className="py-2">{new Date(month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</td>
                    <td className="py-2">{data.count}</td>
                    <td className="py-2 font-bold">₹{data.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const CustomerReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-bold">Total Customers</h3>
          <p className="text-2xl sm:text-3xl font-bold">{customers.length}</p>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-bold">Active Customers</h3>
          <p className="text-2xl sm:text-3xl font-bold">{customers.filter(c => bills.some(b => b.customerName === c.name)).length}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-bold">New This Month</h3>
          <p className="text-2xl sm:text-3xl font-bold">{customers.filter(c => new Date(c.createdAt || Date.now()).getMonth() === new Date().getMonth()).length}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg font-bold mb-4">Top Customers</h3>
        <div className="space-y-3">
          {customers.slice(0, 10).map((customer, index) => (
            <div key={customer.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>
              <div className="mt-2 sm:mt-0 text-right">
                <p className="font-bold">₹{bills.filter(b => b.customerName === customer.name).reduce((sum, b) => sum + (b.grandTotal || 0), 0).toFixed(2)}</p>
                <p className="text-sm text-gray-500">{bills.filter(b => b.customerName === customer.name).length} orders</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-bold">Total Products</h3>
          <p className="text-2xl sm:text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-bold">Low Stock</h3>
          <p className="text-2xl sm:text-3xl font-bold">{products.filter(p => p.stock < 10).length}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-bold">Total Value</h3>
          <p className="text-2xl sm:text-3xl font-bold">₹{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-lg font-bold mb-4">Product Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Stock</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 10).map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2 font-medium">{product.name}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-2">₹{product.price}</td>
                  <td className="py-2 font-bold">₹{(product.price * product.stock).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReport = () => {
    switch(activeReport) {
      case 'payments': return <PaymentsReport bills={bills} />;
      case 'sales': return <SalesReport />;
      case 'customers': return <CustomerReport />;
      case 'products': return <ProductReport />;
      default: return <PaymentsReport bills={bills} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
          <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {reportTypes.map((report) => (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm ${
                activeReport === report.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{report.icon}</span>
              <span className="font-medium">{report.label}</span>
            </button>
          ))}
        </div>

        {renderReport()}
      </div>
    </div>
  );
};

export default Reports;