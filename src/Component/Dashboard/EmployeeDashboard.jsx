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

const EmployeeStatCard = ({ stat, isDarkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-2xl p-5 sm:p-6 transform hover:scale-[1.03] transition-all duration-300 relative overflow-hidden flex justify-between items-center cursor-pointer border shadow-sm
        ${!isDarkMode && !isHovered 
          ? 'bg-white text-gray-800 border-gray-200 hover:shadow-md' 
          : `${stat.color} text-white border-transparent shadow-lg`}
      `}
    >
      <div className={`relative z-10 ${(!isDarkMode && !isHovered) ? 'text-gray-900' : 'text-white'}`}>
        <p className={`text-sm font-bold mb-1 transition-colors ${!isDarkMode && !isHovered ? 'text-gray-500' : 'opacity-90'}`}>{stat.label}</p>
        <h3 className="text-3xl font-black">{stat.value}</h3>
      </div>
      <div className={`p-3 sm:p-4 rounded-2xl relative z-10 transition-colors duration-300
        ${!isDarkMode && !isHovered ? 'bg-gray-100' : 'bg-white/20 backdrop-blur-sm border border-white/10 shadow-inner'}
      `}>
        <stat.icon size={28} className={`transition-colors ${!isDarkMode && !isHovered ? stat.iconColor : 'text-white'}`} />
      </div>
    </div>
  );
};

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
    <div className="p-4 md:p-6 space-y-6 relative overflow-hidden h-full">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-full opacity-10 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50/50'
          }`}>
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        </div>
      </div>

      {/* Header Card */}
      <div className={`rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-500 border relative z-10 ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <LayoutDashboard size={40} className="text-blue-600" />
            <div>
              <h1 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Dashboard
              </h1>
              <p className={`text-base font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Welcome, {loggedInEmployee}
              </p>
            </div>
          </div>
          <div className="relative w-full sm:w-auto">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={`w-full sm:w-48 px-4 py-2 border rounded-lg text-sm font-medium focus:ring-2 transition-all cursor-pointer ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                }`}
            >
              <option value="today">Today</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="all">Full History</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {[
          { label: 'Total Sales', value: `₹${dashboardData.totalSales.toLocaleString()}`, icon: IndianRupee, color: 'bg-blue-600', iconColor: 'text-blue-500' },
          { label: 'Total Invoices', value: dashboardData.totalInvoices, icon: FileText, color: 'bg-emerald-600', iconColor: 'text-emerald-500' },
          { label: 'Paid Bills', value: dashboardData.paidBills, icon: CheckCircle2, color: 'bg-purple-600', iconColor: 'text-purple-500' },
          { label: 'Avg Sale', value: `₹${dashboardData.avgSale.toFixed(0)}`, icon: TrendingUp, color: 'bg-orange-600', iconColor: 'text-orange-500' }
        ].map((stat, i) => (
          <EmployeeStatCard key={i} stat={stat} isDarkMode={isDarkMode} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 relative z-10">
        {/* Daily Sales */}
        <div className={`rounded-xl shadow-lg p-6 backdrop-blur-sm transition-all duration-500 transform hover:scale-[1.02] border group ${isDarkMode ? 'bg-gray-800/90 border-gray-700 hover:shadow-2xl hover:shadow-gray-900/50' : 'bg-white/90 border-gray-100 hover:shadow-2xl hover:shadow-blue-200/50'}`}>
          <h3 className={`text-lg font-bold mb-4 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <BarChart3 className="text-blue-500" size={22} /> Daily Sales ({dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'Last 7 Days' : dateRange === 'month' ? 'Last 30 Days' : 'All Time'})
          </h3>
          <div className="space-y-6">
            {/* Chart Area */}
            <div className="space-y-3">
              {dashboardData.dailySales.length > 0 ? (
                dashboardData.dailySales.map((dayData, index) => (
                  <div key={dayData.date || index} className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{dayData.date}</span>
                    <div className="flex items-center gap-4 flex-1 justify-end">
                      <div className={`w-full max-w-[120px] md:max-w-[200px] rounded-full h-1.5 overflow-hidden ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min((dayData.amount / Math.max(...dashboardData.dailySales.map(d => d.amount))) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold min-w-[70px] text-right ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>₹{(dayData.amount || 0).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                Object.entries(salesByDay).slice(-7).map(([date, amount]) => (
                  <div key={date} className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{date}</span>
                    <div className="flex items-center gap-4 flex-1 justify-end">
                      <div className={`w-full max-w-[120px] md:max-w-[200px] rounded-full h-1.5 overflow-hidden ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${Math.min((amount / Math.max(...Object.values(salesByDay))) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold min-w-[70px] text-right ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>₹{amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Products Area (Inside the same card) */}
            <div className={`pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Products Sold {dateRange === 'today' ? 'Today' : 'this Period'}
                </h4>
                <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'text-gray-400 bg-gray-700' : 'text-gray-400 bg-gray-50'}`}>Top 10 Items</span>
              </div>

              <div className="overflow-x-auto">
                {dashboardData.topProducts.length > 0 ? (
                  <table className="w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <th className="text-left pb-1 pl-1">Name</th>
                        <th className="text-center pb-1">Qty</th>
                        <th className="text-right pb-1 pr-1">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.topProducts.map((p, i) => (
                        <tr key={i} className={`group transition-colors rounded-lg ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-blue-50/50'}`}>
                          <td className={`py-2 pl-2 text-sm font-medium rounded-l-lg border-y border-l border-transparent ${isDarkMode ? 'text-gray-300 group-hover:border-gray-600' : 'text-gray-700 group-hover:border-blue-100'}`}>{p.name}</td>
                          <td className={`py-2 text-center text-sm font-bold border-y border-transparent ${isDarkMode ? 'text-blue-400 group-hover:border-gray-600' : 'text-blue-600 group-hover:border-blue-100'}`}>{p.qty}</td>
                          <td className={`py-2 pr-2 text-right text-sm font-bold rounded-r-lg border-y border-r border-transparent ${isDarkMode ? 'text-gray-100 group-hover:border-gray-600' : 'text-gray-900 group-hover:border-blue-100'}`}>₹{p.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className={`text-center py-6 italic text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    No transactions recorded for this period
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bills */}
      <div className={`rounded-xl shadow-lg p-6 backdrop-blur-sm transition-all duration-500 transform hover:scale-[1.01] border relative z-10 ${isDarkMode ? 'bg-gray-800/90 border-gray-700 hover:shadow-2xl hover:shadow-gray-900/50' : 'bg-white/90 border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50'}`}>
        <h3 className={`text-lg font-bold mb-4 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <ClipboardList className="text-indigo-500" size={22} /> Recent Bills
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left p-3 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Invoice</th>
                <th className={`text-left p-3 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Customer</th>
                <th className={`text-left p-3 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</th>
                <th className={`text-left p-3 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</th>
                <th className={`text-left p-3 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBills.map((bill, index) => (
                <tr key={bill.id || index} className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <td className={`p-3 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{bill.invoiceNo || 'N/A'}</td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{bill.customerName || 'N/A'}</td>
                  <td className={`p-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{bill.date || 'N/A'}</td>
                  <td className={`p-3 text-sm font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>₹{(bill.amount || 0).toFixed(2)}</td>
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