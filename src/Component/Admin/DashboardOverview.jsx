import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardOverview = () => {
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

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
  const getTotalRevenue = () =>
    bills.reduce((total, bill) => total + (bill.grandTotal || 0), 0);

  const getPaidAmount = () =>
    bills
      .filter(bill => bill.paymentStatus === 'paid')
      .reduce((total, bill) => total + (bill.grandTotal || 0), 0);

  const getMonthlyGrowth = () => {
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const monthRevenue = month =>
      bills
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
      value: bills.length,
      change: 'All time',
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

  const recentBills = bills.slice(-6).reverse();

  /* ================= UI ================= */
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></span>
          Live Data
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-xl border transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-between items-center">
              <div className={`${s.bg} p-4 rounded-xl flex items-center justify-center`}>
                <span className={`text-3xl ${s.iconColor}`}>{s.icon}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-gray-500">{s.change}</p>
              </div>
            </div>
            <h3 className="mt-5 font-medium text-gray-700">{s.title}</h3>
          </div>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-2xl border shadow-xl overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
        </div>

        <div className="p-6">
          {recentBills.length === 0 ? (
            <div className="text-center py-16 text-gray-500 italic">
              No invoices yet
            </div>
          ) : (
            <div className="space-y-4">
              {recentBills.map(bill => (
                <div
                  key={bill.id}
                  className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{bill.customerName}</p>
                    <p className="text-sm text-gray-500">
                      #{bill.id} • {new Date(bill.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ₹{bill.grandTotal?.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs capitalize font-medium ${
                        bill.paymentStatus === 'paid'
                          ? 'text-green-600'
                          : bill.paymentStatus === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {bill.paymentStatus || 'pending'}
                    </p>
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
