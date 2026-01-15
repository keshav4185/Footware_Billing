import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardOverview = () => {
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [dateRange, setDateRange] = useState('today');

  /* ================= BACKEND FETCH ================= */
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [invoiceRes, customerRes, productRes] = await Promise.all([
        axios.get('http://localhost:8080/api/billing/invoices'),
        axios.get('http://localhost:8080/api/billing/customers'),
        axios.get('http://localhost:8080/api/billing/products'),
      ]);

      const mappedBills = invoiceRes.data.map(inv => ({
        id: inv.id,
        grandTotal: inv.totalAmount,
        date: inv.invoiceDate,
        paymentStatus: inv.paymentStatus?.toLowerCase(),
        customerName: inv.customer?.name || 'Unknown Customer',
      }));

      setBills(mappedBills);
      setCustomers(customerRes.data);
      setProducts(productRes.data);
    } catch (error) {
      console.error('Dashboard API Error:', error);
    }
  };

  /* ================= UI LOGIC ================= */
  const getFilteredBills = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return bills.filter(bill => {
      const billDate = new Date(bill.date);
      
      switch(dateRange) {
        case 'today':
          billDate.setHours(0, 0, 0, 0);
          return billDate.getTime() === today.getTime();
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return billDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return billDate >= monthAgo;
        case 'year':
          const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
          return billDate >= yearAgo;
        default:
          return true;
      }
    });
  };

  const filteredBills = getFilteredBills();

  const getTotalRevenue = () =>
    filteredBills.reduce((total, bill) => total + (bill.grandTotal || 0), 0);

  const getPaidAmount = () =>
    filteredBills
      .filter(bill => bill.paymentStatus === 'paid')
      .reduce((total, bill) => total + (bill.grandTotal || 0), 0);

  const getMonthlyGrowth = () => {
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const monthRevenue = month =>
      filteredBills
        .filter(b => new Date(b.date).getMonth() === month)
        .reduce((t, b) => t + (b.grandTotal || 0), 0);

    const current = monthRevenue(currentMonth);
    const last = monthRevenue(lastMonth);

    if (last === 0) return 0;
    return ((current - last) / last * 100).toFixed(1);
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${getTotalRevenue().toLocaleString()}`,
      change: `+${getMonthlyGrowth()}%`,
      icon: '💰',
      bg: 'bg-gradient-to-tr from-emerald-50 to-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Total Invoices',
      value: filteredBills.length,
      change: dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'Last 7 Days' : dateRange === 'month' ? 'Last 30 Days' : dateRange === 'year' ? 'Last Year' : 'All time',
      icon: '📊',
      bg: 'bg-gradient-to-tr from-blue-50 to-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Active Customers',
      value: customers.length,
      change: 'All time',
      icon: '👥',
      bg: 'bg-gradient-to-tr from-purple-50 to-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Collection Rate',
      value: `${getTotalRevenue() > 0
        ? ((getPaidAmount() / getTotalRevenue()) * 100).toFixed(1)
        : 0}%`,
      change: 'Payment efficiency',
      icon: '📈',
      bg: 'bg-gradient-to-tr from-teal-50 to-teal-100',
      iconColor: 'text-teal-600'
    }
  ];

  const recentBills = filteredBills.slice(-6).reverse();

  /* ================= UI ================= */
  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-3xl ">📊</span> Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Welcome back! Here's your business summary.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-green-700">Live Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${s.bg} p-3 rounded-lg`}>
                <span className={`text-2xl ${s.iconColor}`}>{s.icon}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{s.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">{s.value}</p>
            <p className="text-xs text-gray-500">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="text-xl">📋</span> Recent Invoices
          </h3>
        </div>

        <div className="p-6">
          {recentBills.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">📄</div>
              <p className="text-gray-500">No invoices yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBills.map(bill => (
                <div
                  key={bill.id}
                  className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 transition-all duration-200"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{bill.customerName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Invoice #{bill.id} • {new Date(bill.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">
                      ₹{bill.grandTotal?.toLocaleString()}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        bill.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : bill.paymentStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {bill.paymentStatus || 'pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
