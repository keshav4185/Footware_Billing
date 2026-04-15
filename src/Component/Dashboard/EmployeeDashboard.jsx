import React from 'react';
import {
  LayoutDashboard,
  IndianRupee,
  FileText,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  ClipboardList,
  Search
} from 'lucide-react';
import { invoiceAPI } from '../../services/api';

const EmployeeDashboard = ({ isDarkMode }) => {
  const [dateRange, setDateRange] = React.useState('today');
  const [bills, setBills] = React.useState([]);
  const [loggedInEmployee, setLoggedInEmployee] = React.useState('');
  const [dashboardData, setDashboardData] = React.useState({
    totalSales: 0,
    totalBills: 0,
    totalInvoices: 0,
    paidBills: 0,
    avgSale: 0,
    topCustomers: [],
    recentBills: [],
    dailySales: [],
    topProducts: []
  });
  const [loading, setLoading] = React.useState(false);

  // Fetch dashboard summary from API
  const processDashboardData = (allInvoices) => {
    if (!allInvoices || !Array.isArray(allInvoices)) return;

    let invoicesData = [...allInvoices];
    let totalSales = 0;
    let totalInvoices = 0;
    let paidBillsCount = 0;

    // Filter by date range for statistics
    if (dateRange === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      invoicesData = invoicesData.filter(invoice => {
        const d = invoice.invoiceDate || invoice.date;
        const invoiceDate = new Date(d);
        invoiceDate.setHours(0, 0, 0, 0);
        return invoiceDate.getTime() === today.getTime();
      });
    } else if (dateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      weekAgo.setHours(0, 0, 0, 0);
      invoicesData = invoicesData.filter(invoice => {
        const d = invoice.invoiceDate || invoice.date;
        const invoiceDate = new Date(d);
        return invoiceDate >= weekAgo;
      });
    } else if (dateRange === 'month') {
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      monthAgo.setHours(0, 0, 0, 0);
      invoicesData = invoicesData.filter(invoice => {
        const d = invoice.invoiceDate || invoice.date;
        const invoiceDate = new Date(d);
        return invoiceDate >= monthAgo;
      });
    }

    // Calculate totals from filtered data
    totalSales = invoicesData.reduce((sum, inv) => sum + (inv.totalAmount || inv.grandTotal || 0), 0);
    totalInvoices = invoicesData.length;
    paidBillsCount = invoicesData.filter(invoice => {
      const status = (invoice.paymentStatus || '').toUpperCase();
      return status === 'PAID';
    }).length;

    // Recent Bills should be from ALL invoices, unfiltered
    const recentInvoices = allInvoices.slice(-5).reverse().map(invoice => ({
      id: invoice.id,
      invoiceNo: invoice.invoiceNumber || invoice.id,
      customerName: invoice.customer?.name || (invoice.customer ? invoice.customer.name : 'Walk-in Customer'),
      date: invoice.invoiceDate || invoice.date,
      amount: invoice.totalAmount || invoice.grandTotal,
      paymentStatus: (invoice.paymentStatus || '').toUpperCase() === 'PAID' ? 'Paid' : 'Unpaid'
    }));

    // Calculate average sale
    const avgSale = totalInvoices > 0 ? totalSales / totalInvoices : 0;

    // Aggregate chart data from filtered data
    const salesMap = {};
    invoicesData.forEach(inv => {
      const d = inv.invoiceDate || inv.date;
      const dateStr = new Date(d).toLocaleDateString();
      salesMap[dateStr] = (salesMap[dateStr] || 0) + (inv.totalAmount || inv.grandTotal || 0);
    });
    const manualDailySales = Object.entries(salesMap)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Aggregate product sales from filtered data
    const productAggregation = {};
    invoicesData.forEach(invoice => {
      // API format uses invoice.items, LocalStorage might use invoice.products
      const items = invoice.items || invoice.products || [];
      if (Array.isArray(items)) {
        items.forEach(item => {
          const name = item.itemName || item.name || 'Unknown Item';
          const qty = item.quantity || item.qty || 0;
          const rev = item.rowTotal || (item.price * item.qty) || 0;
          if (!productAggregation[name]) {
            productAggregation[name] = { name, qty: 0, total: 0 };
          }
          productAggregation[name].qty += qty;
          productAggregation[name].total += rev;
        });
      }
    });

    const topProducts = Object.values(productAggregation)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 10);

    setDashboardData({
      totalSales: totalSales,
      totalInvoices: totalInvoices,
      paidBills: paidBillsCount,
      avgSale: avgSale,
      topCustomers: [],
      recentBills: recentInvoices,
      dailySales: manualDailySales,
      topProducts: topProducts
    });
  };

  const fetchDashboardSummary = async () => {
    setLoading(true);
    try {
      const response = await invoiceAPI.getAll();
      if (response && response.data && response.data.length > 0) {
        processDashboardData(response.data);
      } else {
        // Fallback to localStorage if API returns empty
        const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
        processDashboardData(savedBills);
      }
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      // Fallback to localStorage on error
      const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
      processDashboardData(savedBills);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Get logged in employee data from localStorage
    const employeeData = JSON.parse(localStorage.getItem('employee') || '{}');
    const employeeName = localStorage.getItem('loggedInEmployee') || employeeData.name || 'Employee';
    setLoggedInEmployee(employeeName);

    // Fetch dashboard data
    fetchDashboardSummary();
  }, [dateRange]);

  const getFilteredBills = () => {
    // This is now handled by the API, but keeping for fallback
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return bills.filter(bill => {
      const billDate = new Date(bill.date);

      switch (dateRange) {
        case 'today':
          return billDate >= today;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return billDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return billDate >= monthAgo;
        default:
          return true;
      }
    });
  };

  const filteredBills = getFilteredBills();
  const salesByDay = filteredBills.reduce((acc, bill) => {
    const day = new Date(bill.date).toLocaleDateString();
    acc[day] = (acc[day] || 0) + bill.amount;
    return acc;
  }, {});

  return (
    <div className="p-4 md:p-6 space-y-6 relative overflow-hidden">
      {/* Dynamic Wave Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-10 animate-pulse-slow blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-15 animate-float blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-20 animate-bounce-slow blur-xl"></div>
        </div>
      </div>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 backdrop-blur-sm bg-white/90 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 transform hover:scale-[1.01] border border-gray-100 relative z-10 group">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <LayoutDashboard className="text-blue-600" size={28} /> Dashboard
            </h1>
            <p className="text-gray-600">Welcome, {loggedInEmployee}</p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-300/50 animate-slideInLeft group hover:rotate-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Sales</p>
              <p className="text-2xl font-bold animate-pulse">₹{dashboardData.totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <IndianRupee size={28} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-green-300/50 animate-slideInUp group hover:-rotate-1" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Invoices</p>
              <p className="text-2xl font-bold animate-pulse">{dashboardData.totalInvoices}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <FileText size={28} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-300/50 animate-slideInUp group hover:rotate-1" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Paid Bills</p>
              <p className="text-2xl font-bold animate-pulse">{dashboardData.paidBills}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <CheckCircle2 size={28} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-300/50 animate-slideInRight group hover:-rotate-1" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Avg Sale</p>
              <p className="text-2xl font-bold animate-pulse">₹{dashboardData.avgSale.toFixed(2)}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <TrendingUp size={28} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 relative z-10">
        {/* Daily Sales */}
        <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-white/90 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 group">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
            <BarChart3 className="text-blue-500" size={22} /> Daily Sales ({dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'Last 7 Days' : dateRange === 'month' ? 'Last 30 Days' : 'All Time'})
          </h3>
          <div className="space-y-6">
            {/* Chart Area */}
            <div className="space-y-3">
              {dashboardData.dailySales.length > 0 ? (
                dashboardData.dailySales.map((dayData, index) => (
                  <div key={dayData.date || index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">{dayData.date}</span>
                    <div className="flex items-center gap-4 flex-1 justify-end">
                      <div className="w-full max-w-[120px] md:max-w-[200px] bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min((dayData.amount / Math.max(...dashboardData.dailySales.map(d => d.amount))) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 min-w-[70px] text-right">₹{(dayData.amount || 0).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                Object.entries(salesByDay).slice(-7).map(([date, amount]) => (
                  <div key={date} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">{date}</span>
                    <div className="flex items-center gap-4 flex-1 justify-end">
                      <div className="w-full max-w-[120px] md:max-w-[200px] bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${Math.min((amount / Math.max(...Object.values(salesByDay))) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 min-w-[70px] text-right">₹{amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Products Area (Inside the same card) */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  Products Sold {dateRange === 'today' ? 'Today' : 'this Period'}
                </h4>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Top 10 Items</span>
              </div>

              <div className="overflow-x-auto">
                {dashboardData.topProducts.length > 0 ? (
                  <table className="w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <th className="text-left pb-1 pl-1">Name</th>
                        <th className="text-center pb-1">Qty</th>
                        <th className="text-right pb-1 pr-1">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.topProducts.map((p, i) => (
                        <tr key={i} className="group hover:bg-blue-50/50 transition-colors rounded-lg">
                          <td className="py-2 pl-2 text-sm text-gray-700 font-medium rounded-l-lg border-y border-l border-transparent group-hover:border-blue-100">{p.name}</td>
                          <td className="py-2 text-center text-sm font-bold text-blue-600 border-y border-transparent group-hover:border-blue-100">{p.qty}</td>
                          <td className="py-2 pr-2 text-right text-sm font-bold text-gray-900 rounded-r-lg border-y border-r border-transparent group-hover:border-blue-100">₹{p.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-6 text-gray-400 italic text-sm">
                    No transactions recorded for this period
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bills */}
      <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-white/90 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:scale-[1.01] border border-gray-100 relative z-10">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
          <ClipboardList className="text-indigo-500" size={22} /> Recent Bills
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Invoice</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Customer</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBills.map((bill, index) => (
                <tr key={bill.id || index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{bill.invoiceNo || 'N/A'}</td>
                  <td className="p-3 text-sm text-gray-800">{bill.customerName || 'N/A'}</td>
                  <td className="p-3 text-sm text-gray-600">{bill.date || 'N/A'}</td>
                  <td className="p-3 text-sm font-semibold text-green-600">₹{(bill.amount || 0).toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bill.paymentStatus === 'Paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {bill.paymentStatus || 'Unpaid'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;