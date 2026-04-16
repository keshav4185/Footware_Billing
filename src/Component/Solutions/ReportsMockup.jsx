import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
  BarChart3,
  IndianRupee,
  Users,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  Loader2,
  Calendar,
  ChevronRight
} from 'lucide-react';

const ReportsMockup = () => {
  const [bills, setBills] = useState([
    { id: "1001", grandTotal: 177.00, date: new Date().toISOString(), paymentStatus: "paid", customerName: "Keshav Pralhad Golande" },
    { id: "1002", grandTotal: 112.10, date: new Date().toISOString(), paymentStatus: "paid", customerName: "Amit Kumar Jha" },
    { id: "1003", grandTotal: 2450.00, date: new Date().toISOString(), paymentStatus: "pending", customerName: "Priya Sharma" },
    { id: "1004", grandTotal: 850.50, date: new Date(Date.now() - 86400000).toISOString(), paymentStatus: "paid", customerName: "Rahul Verma" },
    { id: "1005", grandTotal: 3200.00, date: new Date(Date.now() - 172800000).toISOString(), paymentStatus: "pending", customerName: "Sneha Patel" },
    { id: "1006", grandTotal: 450.00, date: new Date(Date.now() - 259200000).toISOString(), paymentStatus: "paid", customerName: "Vikram Singh" },
    { id: "1007", grandTotal: 1200.00, date: new Date(Date.now() - 345600000).toISOString(), paymentStatus: "paid", customerName: "Neha Gupta" },
    { id: "1008", grandTotal: 560.00, date: new Date(Date.now() - 432000000).toISOString(), paymentStatus: "pending", customerName: "Rohan Das" },
    { id: "1009", grandTotal: 2100.00, date: new Date(Date.now() - 518400000).toISOString(), paymentStatus: "paid", customerName: "Pooja Reddy" },
    { id: "1010", grandTotal: 890.00, date: new Date(Date.now() - 604800000).toISOString(), paymentStatus: "paid", customerName: "Arjun Nair" }
  ]);
  const [customers, setCustomers] = useState([
    { id: 1, name: "Keshav Pralhad Golande" },
    { id: 2, name: "Amit Kumar Jha" },
    { id: 3, name: "Priya Sharma" },
    { id: 4, name: "Rahul Verma" },
    { id: 5, name: "Sneha Patel" },
    { id: 6, name: "Vikram Singh" },
    { id: 7, name: "Neha Gupta" },
    { id: 8, name: "Rohan Das" },
    { id: 9, name: "Pooja Reddy" },
    { id: 10, name: "Arjun Nair" },
    { id: 11, name: "Vikas Kumar" },
    { id: 12, name: "Aarav Desai" }
  ]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('all');

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

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${getTotalRevenue().toLocaleString()}`,
      icon: <IndianRupee size={24} />,
      bg: 'bg-blue-600'
    },
    {
      title: 'Total Invoices',
      value: filteredBills.length,
      icon: <BarChart3 size={24} />,
      bg: 'bg-emerald-600'
    },
    {
      title: 'Active Customers',
      value: customers.length,
      icon: <Users size={24} />,
      bg: 'bg-purple-600'
    },
    {
      title: 'Collection Rate',
      value: `${getTotalRevenue() > 0 ? ((getPaidAmount() / getTotalRevenue()) * 100).toFixed(1) : 0}%`,
      icon: <Activity size={24} />,
      bg: 'bg-orange-600'
    }
  ];

  const pieChartData = [
    {
      name: 'Paid',
      value: filteredBills.filter(b => b.paymentStatus === 'paid').length,
      color: '#10B981'
    },
    {
      name: 'Unpaid',
      value: filteredBills.filter(b => b.paymentStatus !== 'paid').length,
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

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-10 bg-white rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
      {/* Premium Wrapper Shell */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Live Dashboard Preview</h2>
              {loading && <Loader2 className="animate-spin text-blue-600" size={24} />}
            </div>
            <p className="text-gray-500 font-medium">Real-time data synchronization directly from your admin backend.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            {['today', 'week', 'month', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-6 py-2 rounded-xl text-sm font-black transition-all uppercase tracking-widest ${
                  dateRange === range 
                  ? 'bg-white text-blue-600 shadow-lg shadow-blue-50' 
                  : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <div key={i} className={`${s.bg} rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}>
              <div className="relative z-10">
                <p className="text-xs font-black opacity-70 mb-2 uppercase tracking-[0.2em]">{s.title}</p>
                <h3 className="text-4xl font-black">{s.value}</h3>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/20 p-5 rounded-[1.5rem] backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Distribution */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                <PieChartIcon size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 leading-none">Payment Distribution</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Paid vs Unpaid Breakdown</p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 leading-none">Revenue Trend</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Last 7 Days Performance</p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    tickFormatter={(v) => `₹${v}`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#2563EB" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#2563EB', strokeWidth: 0 }} 
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <div className="mt-12 pt-8 text-center border-t border-gray-50">
          <Link 
            to="/Signin" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl group"
          >
            Access Full Dashboard <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportsMockup;
