import React from 'react';

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
    dailySales: []
  });
  const [loading, setLoading] = React.useState(false);

  // Fetch dashboard summary from API
  const fetchDashboardSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/billing/dashboard/summary?period=${dateRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dashboard API Response:', data);
      
      // Fetch recent invoices separately
      const invoicesResponse = await fetch('http://localhost:8080/api/billing/invoices', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      let recentInvoices = [];
      let paidBillsCount = 0;
      if (invoicesResponse.ok) {
        const invoicesText = await invoicesResponse.text();
        const invoicesData = JSON.parse(invoicesText);
        recentInvoices = invoicesData.slice(-5).map(invoice => ({
          id: invoice.id,
          invoiceNo: invoice.invoiceNumber,
          customerName: invoice.customer?.name,
          date: invoice.invoiceDate,
          amount: invoice.totalAmount,
          paymentStatus: invoice.paymentStatus === 'PAID' ? 'Paid' : 'Unpaid'
        }));
        paidBillsCount = invoicesData.filter(invoice => invoice.paymentStatus === 'PAID').length;
      }
      
      // Calculate average sale
      const avgSale = data.totalInvoices > 0 ? data.totalSales / data.totalInvoices : 0;
      
      setDashboardData({
        totalSales: data.totalSales || 0,
        totalInvoices: data.totalInvoices || 0,
        paidBills: paidBillsCount,
        avgSale: avgSale,
        topCustomers: data.topCustomers || [],
        recentBills: recentInvoices,
        dailySales: data.dailySales || []
      });
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      // Fallback to localStorage calculation
      const savedBills = JSON.parse(localStorage.getItem('billings') || '[]');
      setBills(savedBills);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Get logged in employee name
    const employeeName = localStorage.getItem('loggedInEmployee') || 'Employee';
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
      
      switch(dateRange) {
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
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-3xl">📊</span> Dashboard
            </h1>
            <p className="text-gray-600">Welcome, {loggedInEmployee}</p>
          </div>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Sales</p>
              <p className="text-2xl font-bold">₹{dashboardData.totalSales.toFixed(2)}</p>
            </div>
            <span className="text-3xl">💰</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Invoices</p>
              <p className="text-2xl font-bold">{dashboardData.totalInvoices}</p>
            </div>
            <span className="text-3xl">📄</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Paid Bills</p>
              <p className="text-2xl font-bold">{dashboardData.paidBills}</p>
            </div>
            <span className="text-3xl">✅</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg Sale</p>
              <p className="text-2xl font-bold">₹{dashboardData.avgSale.toFixed(2)}</p>
            </div>
            <span className="text-3xl">📈</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span> Daily Sales ({dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'Last 7 Days' : dateRange === 'month' ? 'Last 30 Days' : 'All Time'})
          </h3>
          <div className="space-y-3">
            {dashboardData.dailySales.length > 0 ? (
              dashboardData.dailySales.map((dayData, index) => (
                <div key={dayData.date || index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{dayData.date}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${Math.min((dayData.amount / Math.max(...dashboardData.dailySales.map(d => d.amount))) * 100, 100)}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">₹{(dayData.amount || 0).toFixed(2)}</span>
                  </div>
                </div>
              ))
            ) : (
              Object.entries(salesByDay).slice(-7).map(([date, amount]) => (
                <div key={date} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{date}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${Math.min((amount / Math.max(...Object.values(salesByDay))) * 100, 100)}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">₹{amount.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">👥</span> Top Customers
          </h3>
          <div className="space-y-3">
            {dashboardData.topCustomers.map((customer, index) => (
              <div key={customer.name || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{customer.name || 'N/A'}</p>
                    <p className="text-xs text-gray-500">{customer.bills || 0} bills</p>
                  </div>
                </div>
                <span className="font-bold text-green-600">₹{(customer.amount || 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bills */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">📋</span> Recent Bills
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bill.paymentStatus === 'Paid' 
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