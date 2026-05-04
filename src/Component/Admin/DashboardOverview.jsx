import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  LayoutDashboard,
  BarChart3,
  IndianRupee,
  Users,
  TrendingUp,
  PieChart as PieChartIcon,
  ClipboardList,
  FileText,
  Activity
} from 'lucide-react';

const StatCard = ({ s, isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const activeBg = 
    s.title === 'Total Revenue' ? 'bg-blue-600' :
    s.title === 'Total Invoices' ? 'bg-emerald-600' :
    s.title === 'Active Customers' ? 'bg-purple-600' : 'bg-orange-600';
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-2xl p-5 sm:p-6 transform hover:scale-[1.03] transition-all duration-300 relative overflow-hidden flex justify-between items-center cursor-pointer border shadow-sm
        ${!isDarkMode && !isHovered 
          ? 'bg-white text-gray-800 border-gray-200 hover:shadow-md' 
          : `${activeBg} text-white border-transparent shadow-lg`}
      `}
    >
      <div className={`relative z-10 ${(!isDarkMode && !isHovered) ? 'text-gray-900' : 'text-white'}`}>
        <p className={`text-sm font-bold mb-1 transition-colors ${!isDarkMode && !isHovered ? 'text-gray-500' : 'opacity-90'}`}>{s.title}</p>
        <h3 className="text-3xl font-black">{s.value}</h3>
        <p className={`text-xs mt-2 font-bold transition-colors ${!isDarkMode && !isHovered ? s.iconColor : 'text-white/80'}`}>{s.change}</p>
      </div>
      <div className={`p-3 sm:p-4 rounded-2xl relative z-10 transition-colors duration-300
        ${!isDarkMode && !isHovered ? s.bg : 'bg-white/20 backdrop-blur-sm border border-white/10 shadow-inner'}
      `}>
        <span className={`transition-colors duration-300 ${!isDarkMode && !isHovered ? s.iconColor : 'text-white'}`}>{s.icon}</span>
      </div>
    </div>
  );
};

const DashboardOverview = ({ bills: propsBills, customers: propsCustomers, products: propsProducts, isDarkMode }) => {
  const [bills, setBills] = useState(propsBills || []);
  const [customers, setCustomers] = useState(propsCustomers || []);
  const [products, setProducts] = useState(propsProducts || []);
  const [dateRange, setDateRange] = useState('today');

  /* ================= BACKEND FETCH ================= */
  const fetchDashboardData = async () => {
    try {
      const [invoiceRes, customerRes, productRes] = await Promise.all([
        api.get('/billing/invoices'),
        api.get('/billing/customers'),
        api.get('/billing/products'),
      ]);

      const mappedBills = invoiceRes.data.map(inv => {
        const isPaid = inv.balanceAmount === 0 || (inv.paymentStatus || '').toLowerCase() === 'paid';
        const isPartial = !isPaid && ((inv.advanceAmount || 0) > 0 || (inv.balanceAmount > 0 && inv.balanceAmount < inv.totalAmount));
        const displayStatus = isPaid ? 'PAID' : isPartial ? 'BALANCED' : 'UNPAID';

        return {
          id: inv.id,
          grandTotal: inv.totalAmount,
          advanceAmount: inv.advanceAmount || 0,
          balanceAmount: inv.balanceAmount,
          date: inv.invoiceDate,
          paymentStatus: inv.paymentStatus?.toLowerCase(),
          displayStatus: displayStatus,
          customerName: inv.customer?.name || 'Unknown Customer',
        };
      });

      setBills(mappedBills);
      // Deduplicate and filter customers to match CustomersManagement logic
      const rawCustomers = customerRes.data || [];
      const uniqueMap = new Map();
      rawCustomers.forEach(customer => {
        const phone = (customer.phone || '').trim();
        const name = (customer.name || '').trim();
        if (!phone || phone === '-' || !name || name === '-') return;
        if (!uniqueMap.has(phone) || (customer.gst && !uniqueMap.get(phone).gst)) {
          uniqueMap.set(phone, customer);
        }
      });
      
      setCustomers(Array.from(uniqueMap.values()));
      setProducts(productRes.data);
    } catch (error) {
      console.error('Dashboard API Error:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* ================= UI LOGIC ================= */
  const getFilteredBills = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return bills.filter(bill => {
      const billDate = new Date(bill.date);

      switch (dateRange) {
        case 'today': {
          billDate.setHours(0, 0, 0, 0);
          return billDate.getTime() === today.getTime();
        }
        case 'week': {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return billDate >= weekAgo;
        }
        case 'month': {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return billDate >= monthAgo;
        }
        case 'year': {
          const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
          return billDate >= yearAgo;
        }
        default:
          return true;
      }
    });
  };

  const filteredBills = getFilteredBills();

  const getTotalRevenue = () =>
    filteredBills.reduce((total, bill) => total + (bill.grandTotal || 0), 0);

  const getPaidAmount = () =>
    filteredBills.reduce((total, bill) => {
      if (bill.displayStatus === 'PAID') return total + (bill.grandTotal || 0);
      if (bill.displayStatus === 'BALANCED') {
        const paidPortion = (bill.grandTotal || 0) - (bill.balanceAmount || bill.grandTotal);
        return total + Math.max(paidPortion, bill.advanceAmount || 0);
      }
      return total;
    }, 0);

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
      icon: <IndianRupee size={24} />,
      bg: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100',
      iconColor: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      borderColor: isDarkMode ? 'border-blue-500/30' : 'border-blue-200'
    },
    {
      title: 'Total Invoices',
      value: filteredBills.length,
      change: dateRange === 'today' ? 'Today' : (dateRange === 'week' ? 'Last 7 Days' : 'Last 30 Days'),
      icon: <BarChart3 size={24} />,
      bg: isDarkMode ? 'bg-green-900/30' : 'bg-green-100',
      iconColor: isDarkMode ? 'text-green-400' : 'text-green-600',
      borderColor: isDarkMode ? 'border-green-500/30' : 'border-green-200'
    },
    {
      title: 'Active Customers',
      value: customers.length,
      change: 'All time',
      icon: <Users size={24} />,
      bg: isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100',
      iconColor: isDarkMode ? 'text-purple-400' : 'text-purple-600',
      borderColor: isDarkMode ? 'border-purple-500/30' : 'border-purple-200'
    },
    {
      title: 'Collection Rate',
      value: `${getTotalRevenue() > 0 ? ((getPaidAmount() / getTotalRevenue()) * 100).toFixed(1) : 0}%`,
      change: 'Payment efficiency',
      icon: <Activity size={24} />,
      bg: isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100',
      iconColor: isDarkMode ? 'text-orange-400' : 'text-orange-600',
      borderColor: isDarkMode ? 'border-orange-500/30' : 'border-orange-200'
    }
  ];

  const recentBills = filteredBills.slice(-6).reverse();

  // Chart data preparation
  const pieChartData = [
    {
      name: 'Paid',
      value: filteredBills.filter(b => b.displayStatus === 'PAID').length,
      color: '#10B981'
    },
    {
      name: 'Balanced',
      value: filteredBills.filter(b => b.displayStatus === 'BALANCED').length,
      color: '#F59E0B'
    },
    {
      name: 'Unpaid',
      value: filteredBills.filter(b => b.displayStatus === 'UNPAID').length,
      color: '#EF4444'
    }
  ].filter(item => item.value > 0);

  const lineChartData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayRevenue = bills
        .filter(b => {
          const billDate = new Date(b.date);
          return billDate.toDateString() === date.toDateString();
        })
        .reduce((sum, b) => sum + (b.grandTotal || 0), 0);

      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: dayRevenue,
        invoices: bills.filter(b => {
          const billDate = new Date(b.date);
          return billDate.toDateString() === date.toDateString();
        }).length
      });
    }
    return last7Days;
  };

  /* ================= UI ================= */
  return (
    <div className={`space-y-6 min-h-screen ${isDarkMode ? 'bg-transparent' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`rounded-xl shadow-lg p-6 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <LayoutDashboard size={32} className="text-[#3D0448]" /> Dashboard Overview
            </h1>
            <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Welcome back! Here's your business summary.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-medium ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-800'}`}
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'}`}>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Live Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} s={s} isDarkMode={isDarkMode} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Payment Status */}
        <div className={`rounded-xl shadow-lg border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="mb-4">
            <h3 className={`text-lg font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <PieChartIcon size={22} className="text-[#B564C3]" /> Payment Status Distribution
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Invoice payment breakdown</p>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className={`p-2 rounded-lg shadow-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'
                          }`}>
                          <p className="font-bold">{payload[0].name}: {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry) => (
                    <span className={`font-bold transition-colors ${isDarkMode ? 'text-gray-300' : ''}`} style={{ color: entry.color }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart - Revenue Trend */}
        <div className={`rounded-xl shadow-lg border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="mb-4">
            <h3 className={`text-lg font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <TrendingUp size={22} className="text-[#3D0448]" /> Revenue Trend (Last 7 Days)
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Daily revenue performance</p>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                <XAxis
                  dataKey="date"
                  stroke={isDarkMode ? '#9ca3af' : '#6B7280'}
                  fontSize={12}
                />
                <YAxis
                  stroke={isDarkMode ? '#9ca3af' : '#6B7280'}
                  fontSize={12}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke={isDarkMode ? '#9ca3af' : '#6B7280'}
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Invoices'
                  ]}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1f2937' : '#F9FAFB',
                    border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                    borderRadius: '8px',
                    color: isDarkMode ? '#f3f4f6' : '#374151'
                  }}
                  itemStyle={{ color: isDarkMode ? '#f3f4f6' : '#374151' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3D0448"
                  strokeWidth={3}
                  dot={{ fill: '#3D0448', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3D0448', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="invoices"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                  yAxisId="right"
                  name="Invoices"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className={`rounded-xl shadow-lg border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700 bg-gradient-to-r from-[#3D0448]/40 to-[#B564C3]/40' : 'border-gray-200 bg-gradient-to-r from-[#3D0448]/5 to-[#B564C3]/5'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <ClipboardList size={22} className="text-[#B564C3]" /> Recent Invoices
          </h3>
        </div>

        <div className="p-6">
          {recentBills.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className={`mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No invoices yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBills.map(bill => (
                <div
                  key={bill.id}
                  className={`flex justify-between items-center p-4 rounded-lg border transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                >
                  <div>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{bill.customerName}</p>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Invoice #{bill.id} • {new Date(bill.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ₹{bill.grandTotal?.toLocaleString()}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-sm ${
                        bill.displayStatus === 'PAID'
                          ? isDarkMode ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-green-100 text-green-700'
                          : bill.displayStatus === 'BALANCED'
                            ? isDarkMode ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800' : 'bg-yellow-100 text-yellow-700'
                            : isDarkMode ? 'bg-red-900/30 text-red-400 border border-red-800' : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {bill.displayStatus}
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
