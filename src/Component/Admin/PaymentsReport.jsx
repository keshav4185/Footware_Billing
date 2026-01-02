import React, { useState, useMemo } from 'react';

const PaymentsReport = ({ bills }) => {
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBills = useMemo(() => {
    return bills.filter(bill => {
      const billDate = new Date(bill.date);
      const today = new Date();
      const diffTime = Math.abs(today - billDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let matchesDate = true;
      switch(dateRange) {
        case 'today': matchesDate = diffDays <= 1; break;
        case 'week': matchesDate = diffDays <= 7; break;
        case 'month': matchesDate = diffDays <= 30; break;
        case 'quarter': matchesDate = diffDays <= 90; break;
        case 'year': matchesDate = diffDays <= 365; break;
        default: matchesDate = true;
      }
      
      const matchesStatus = statusFilter === 'all' || bill.paymentStatus === statusFilter;
      
      return matchesDate && matchesStatus;
    });
  }, [bills, dateRange, statusFilter]);

  const reportData = useMemo(() => {
    const totalAmount = filteredBills.reduce((sum, bill) => sum + (bill.grandTotal || 0), 0);
    const paidAmount = filteredBills.filter(bill => bill.paymentStatus === 'paid').reduce((sum, bill) => sum + (bill.grandTotal || 0), 0);
    const pendingAmount = filteredBills.filter(bill => bill.paymentStatus === 'pending').reduce((sum, bill) => sum + (bill.grandTotal || 0), 0);
    const overdueAmount = filteredBills.filter(bill => bill.paymentStatus === 'overdue').reduce((sum, bill) => sum + (bill.grandTotal || 0), 0);
    
    const paidCount = filteredBills.filter(bill => bill.paymentStatus === 'paid').length;
    const pendingCount = filteredBills.filter(bill => bill.paymentStatus === 'pending').length;
    const overdueCount = filteredBills.filter(bill => bill.paymentStatus === 'overdue').length;
    
    return {
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueAmount,
      totalCount: filteredBills.length,
      paidCount,
      pendingCount,
      overdueCount,
      collectionRate: totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0
    };
  }, [filteredBills]);

  const monthlyData = useMemo(() => {
    const months = {};
    bills.forEach(bill => {
      const date = new Date(bill.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!months[monthKey]) {
        months[monthKey] = { total: 0, paid: 0, pending: 0, overdue: 0, count: 0 };
      }
      
      months[monthKey].total += bill.grandTotal || 0;
      months[monthKey].count += 1;
      
      if (bill.paymentStatus === 'paid') months[monthKey].paid += bill.grandTotal || 0;
      else if (bill.paymentStatus === 'pending') months[monthKey].pending += bill.grandTotal || 0;
      else if (bill.paymentStatus === 'overdue') months[monthKey].overdue += bill.grandTotal || 0;
    });
    
    return Object.entries(months)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 6);
  }, [bills]);

  const exportReport = () => {
    const csvContent = [
      ['Invoice ID', 'Customer', 'Date', 'Amount', 'Status'],
      ...filteredBills.map(bill => [
        bill.id,
        bill.customerName,
        bill.date,
        bill.grandTotal?.toFixed(2) || '0.00',
        bill.paymentStatus || 'pending'
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg sm:text-3xl font-bold text-gray-800">Payments Report</h2>
          <p className="text-sm sm:text-lg text-gray-600">Track payment collections</p>
        </div>
        <button
          onClick={exportReport}
          className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all font-medium shadow-md text-sm sm:text-base"
        >
          📊 Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-3 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-3">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-3">Payment Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid Only</option>
              <option value="pending">Pending Only</option>
              <option value="overdue">Overdue Only</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <div className="text-xs sm:text-base text-gray-500">
              {filteredBills.length} of {bills.length} invoices
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mb-3 sm:mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 sm:p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs">Revenue</p>
                <p className="text-sm sm:text-3xl font-bold">₹{reportData.totalAmount.toFixed(0)}</p>
                <p className="text-green-100 text-xs">{reportData.totalCount}</p>
              </div>
              <span className="text-lg sm:text-4xl">💰</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs">Collected</p>
                <p className="text-sm sm:text-3xl font-bold">₹{reportData.paidAmount.toFixed(0)}</p>
                <p className="text-blue-100 text-xs">{reportData.paidCount}</p>
              </div>
              <span className="text-lg sm:text-4xl">✅</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 sm:p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-xs">Pending</p>
                <p className="text-sm sm:text-3xl font-bold">₹{reportData.pendingAmount.toFixed(0)}</p>
                <p className="text-yellow-100 text-xs">{reportData.pendingCount}</p>
              </div>
              <span className="text-lg sm:text-4xl">⏳</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 sm:p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-xs">Overdue</p>
                <p className="text-sm sm:text-3xl font-bold">₹{reportData.overdueAmount.toFixed(0)}</p>
                <p className="text-red-100 text-xs">{reportData.overdueCount}</p>
              </div>
              <span className="text-lg sm:text-4xl">🚨</span>
            </div>
          </div>
        </div>

        {/* Collection Rate */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-6 rounded-lg mb-3 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h3 className="text-base sm:text-xl font-bold text-gray-800">Collection Rate</h3>
              <p className="text-xs sm:text-base text-gray-600">Revenue collected percentage</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xl sm:text-4xl font-bold text-purple-600">{reportData.collectionRate.toFixed(1)}%</div>
              <div className="w-24 sm:w-40 bg-gray-200 rounded-full h-2 sm:h-3 mt-1 sm:mt-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(reportData.collectionRate, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-6">Monthly Breakdown</h3>
        
        {monthlyData.length === 0 ? (
          <div className="text-center py-4 sm:py-8 text-gray-500">
            <div className="text-3xl sm:text-5xl mb-3">📊</div>
            <p className="text-sm sm:text-lg">No data available</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-0">
            {/* Mobile Cards */}
            <div className="block sm:hidden space-y-2">
              {monthlyData.map(([month, data]) => {
                const collectionRate = data.total > 0 ? (data.paid / data.total) * 100 : 0;
                return (
                  <div key={month} className="bg-gray-50 rounded-lg p-3 border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-800 text-sm">
                        {new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                      <span className="text-xs text-gray-500">{data.count} invoices</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                      <div>
                        <span className="text-gray-500">Total: </span>
                        <span className="font-bold">₹{data.total.toFixed(0)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Collected: </span>
                        <span className="text-green-600 font-medium">₹{data.paid.toFixed(0)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(collectionRate, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-700">{collectionRate.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Month</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Invoices</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Total</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Collected</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Pending</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Rate %</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map(([month, data]) => {
                    const collectionRate = data.total > 0 ? (data.paid / data.total) * 100 : 0;
                    return (
                      <tr key={month} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-medium text-gray-800">
                          {new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </td>
                        <td className="py-4 px-4 text-gray-700">{data.count}</td>
                        <td className="py-4 px-4 font-bold text-gray-800">₹{data.total.toFixed(2)}</td>
                        <td className="py-4 px-4 text-green-600 font-medium">₹{data.paid.toFixed(2)}</td>
                        <td className="py-4 px-4 text-yellow-600 font-medium">₹{data.pending.toFixed(2)}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(collectionRate, 100)}%` }}
                              ></div>
                            </div>
                            <span className="font-medium text-gray-700">{collectionRate.toFixed(1)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-6">Recent Transactions</h3>
        
        {filteredBills.length === 0 ? (
          <div className="text-center py-4 sm:py-8 text-gray-500">
            <div className="text-3xl sm:text-5xl mb-3">💳</div>
            <p className="text-sm sm:text-lg">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-4">
            {filteredBills.slice(0, 10).map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-2 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full ${
                    bill.paymentStatus === 'paid' ? 'bg-green-500' :
                    bill.paymentStatus === 'overdue' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{bill.customerName}</p>
                    <p className="text-xs text-gray-500">#{bill.id} • {bill.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 text-sm sm:text-lg">₹{bill.grandTotal?.toFixed(0) || '0'}</p>
                  <p className={`text-xs font-medium ${
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
  );
};

export default PaymentsReport;