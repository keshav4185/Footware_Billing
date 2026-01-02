import React from 'react';

const DashboardOverview = ({ bills, customers, products }) => {
  const getTotalRevenue = () => {
    return bills.reduce((total, bill) => total + (bill.grandTotal || 0), 0);
  };

  const getPaidAmount = () => {
    return bills.filter(bill => bill.paymentStatus === 'paid').reduce((total, bill) => total + (bill.grandTotal || 0), 0);
  };

  const getPendingAmount = () => {
    return bills.filter(bill => bill.paymentStatus === 'pending').reduce((total, bill) => total + (bill.grandTotal || 0), 0);
  };

  const getMonthlyGrowth = () => {
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    
    const currentMonthRevenue = bills.filter(bill => {
      const billDate = new Date(bill.date);
      return billDate.getMonth() === currentMonth;
    }).reduce((total, bill) => total + (bill.grandTotal || 0), 0);
    
    const lastMonthRevenue = bills.filter(bill => {
      const billDate = new Date(bill.date);
      return billDate.getMonth() === lastMonth;
    }).reduce((total, bill) => total + (bill.grandTotal || 0), 0);
    
    if (lastMonthRevenue === 0) return 0;
    return ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1);
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${getTotalRevenue().toLocaleString()}`,
      change: `+${getMonthlyGrowth()}%`,
      icon: '💰',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Total Invoices',
      value: bills.length.toLocaleString(),
      change: `+${bills.filter(bill => {
        const billDate = new Date(bill.date);
        const currentMonth = new Date().getMonth();
        return billDate.getMonth() === currentMonth;
      }).length} this month`,
      icon: '📊',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Active Customers',
      value: customers.length.toLocaleString(),
      change: 'All time',
      icon: '👥',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Collection Rate',
      value: `${getTotalRevenue() > 0 ? ((getPaidAmount() / getTotalRevenue()) * 100).toFixed(1) : 0}%`,
      change: 'Payment efficiency',
      icon: '📈',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600'
    }
  ];

  const recentBills = bills.slice(-6).reverse();
  const lowStockProducts = products.filter(product => product.stock < 10);
  const topCustomers = customers.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Live Data</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <span className={`text-2xl ${stat.iconColor}`}>{stat.icon}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
            </div>
            <h3 className="text-gray-700 font-medium mt-4">{stat.title}</h3>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Invoices */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
          </div>
          
          <div className="p-6">
            {recentBills.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h4>
                <p className="text-gray-500">Create your first invoice to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentBills.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        bill.paymentStatus === 'paid' ? 'bg-green-500' :
                        bill.paymentStatus === 'overdue' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{bill.customerName}</p>
                        <p className="text-sm text-gray-500">#{bill.id} • {bill.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{bill.grandTotal?.toLocaleString()}</p>
                      <p className={`text-xs font-medium capitalize ${
                        bill.paymentStatus === 'paid' ? 'text-green-600' :
                        bill.paymentStatus === 'overdue' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {bill.paymentStatus || 'pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => window.open('/dashboard', '_blank')}
                className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <div className="bg-blue-500 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <span className="text-white text-sm">📄</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">New Invoice</p>
                  <p className="text-xs text-gray-500">Create billing</p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
                <div className="bg-green-500 p-2 rounded-lg group-hover:bg-green-600 transition-colors">
                  <span className="text-white text-sm">👥</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Add Customer</p>
                  <p className="text-xs text-gray-500">New client</p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
                <div className="bg-purple-500 p-2 rounded-lg group-hover:bg-purple-600 transition-colors">
                  <span className="text-white text-sm">📦</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Manage Stock</p>
                  <p className="text-xs text-gray-500">Inventory</p>
                </div>
              </button>
            </div>
          </div>

          {/* Low Stock Alert */}
          {lowStockProducts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-red-500 text-lg">⚠️</span>
                <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
              </div>
              <div className="space-y-3">
                {lowStockProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-semibold">{product.stock} left</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Summary */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-100">Revenue</span>
                <span className="font-semibold">₹{bills.filter(bill => {
                  const billDate = new Date(bill.date);
                  const currentMonth = new Date().getMonth();
                  return billDate.getMonth() === currentMonth;
                }).reduce((total, bill) => total + (bill.grandTotal || 0), 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Invoices</span>
                <span className="font-semibold">{bills.filter(bill => {
                  const billDate = new Date(bill.date);
                  const currentMonth = new Date().getMonth();
                  return billDate.getMonth() === currentMonth;
                }).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Growth</span>
                <span className="font-semibold text-green-300">+{getMonthlyGrowth()}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;