import React, { useState } from 'react';

const InvoiceList = ({ bills, setBills }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Add sample data if no bills exist
  React.useEffect(() => {
    if (bills.length === 0) {
      const sampleBills = [
        {
          id: 'INV-001',
          customerName: 'John Doe',
          customerPhone: '9876543210',
          customerAddress: '123 Main St, City',
          date: new Date().toISOString().split('T')[0],
          products: [
            { name: 'Product A', qty: 2, price: 100 },
            { name: 'Product B', qty: 1, price: 200 }
          ],
          grandTotal: 400,
          paymentStatus: 'pending'
        },
        {
          id: 'INV-002',
          customerName: 'Jane Smith',
          customerPhone: '9876543211',
          customerAddress: '456 Oak Ave, Town',
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          products: [
            { name: 'Product C', qty: 3, price: 150 }
          ],
          grandTotal: 450,
          paymentStatus: 'paid'
        }
      ];
      setBills(sampleBills);
      localStorage.setItem('bills', JSON.stringify(sampleBills));
    }
  }, [bills, setBills]);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = (bill.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bill.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || bill.paymentStatus === statusFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const billDate = new Date(bill.date);
      const today = new Date();
      const diffTime = Math.abs(today - billDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch(dateFilter) {
        case 'today': return diffDays <= 1;
        case 'week': return diffDays <= 7;
        case 'month': return diffDays <= 30;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusChange = (billId, newStatus) => {
    const updatedBills = bills.map(bill =>
      bill.id === billId ? { ...bill, paymentStatus: newStatus } : bill
    );
    setBills(updatedBills);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  };

  const handleDeleteBill = (billId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      const updatedBills = bills.filter(bill => bill.id !== billId);
      setBills(updatedBills);
      localStorage.setItem('bills', JSON.stringify(updatedBills));
    }
  };

  const handlePrintBill = (bill) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${bill.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>INVOICE</h1>
            <h2>Smart Sales</h2>
          </div>
          <div class="invoice-details">
            <p><strong>Invoice No:</strong> ${bill.id}</p>
            <p><strong>Date:</strong> ${bill.date}</p>
            <p><strong>Customer:</strong> ${bill.customerName}</p>
            <p><strong>Phone:</strong> ${bill.customerPhone}</p>
            <p><strong>Address:</strong> ${bill.customerAddress}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Product/Service</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${bill.products?.map((product, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${product.name}</td>
                  <td>${product.qty}</td>
                  <td>₹${product.price}</td>
                  <td>₹${(product.qty * product.price).toFixed(2)}</td>
                </tr>
              `).join('') || ''}
            </tbody>
          </table>
          <div class="total">
            <p>Total Amount: ₹${bill.grandTotal?.toFixed(2) || '0.00'}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredBills.reduce((sum, bill) => sum + (bill.grandTotal || 0), 0);
  const paidAmount = filteredBills.filter(bill => bill.paymentStatus === 'paid').reduce((sum, bill) => sum + (bill.grandTotal || 0), 0);
  const pendingAmount = filteredBills.filter(bill => bill.paymentStatus === 'pending').reduce((sum, bill) => sum + (bill.grandTotal || 0), 0);

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Invoice List</h2>
          <p className="text-sm sm:text-base text-gray-600">Manage all your invoices</p>
        </div>
        <button
          onClick={() => window.open('/dashboard', '_blank')}
          className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all font-medium shadow-md text-sm sm:text-base"
        >
          + Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs sm:text-sm">Total</p>
              <p className="text-lg sm:text-2xl font-bold">{filteredBills.length}</p>
            </div>
            <span className="text-xl sm:text-3xl">📄</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs sm:text-sm">Amount</p>
              <p className="text-sm sm:text-xl font-bold">₹{totalAmount.toFixed(0)}</p>
            </div>
            <span className="text-xl sm:text-3xl">💰</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-xs sm:text-sm">Paid</p>
              <p className="text-sm sm:text-xl font-bold">₹{paidAmount.toFixed(0)}</p>
            </div>
            <span className="text-xl sm:text-3xl">✅</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs sm:text-sm">Pending</p>
              <p className="text-sm sm:text-xl font-bold">₹{pendingAmount.toFixed(0)}</p>
            </div>
            <span className="text-xl sm:text-3xl">⏳</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <svg className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <div className="text-xs text-gray-500 flex items-center">
            {filteredBills.length} of {bills.length} invoices
          </div>
        </div>

        {/* Invoice List */}
        {filteredBills.length === 0 ? (
          <div className="text-center py-6 sm:py-12">
            <div className="text-3xl sm:text-6xl mb-3">📄</div>
            <h3 className="text-sm sm:text-lg font-medium text-gray-800 mb-2">No invoices found</h3>
            <p className="text-xs sm:text-base text-gray-500">Create your first invoice to get started</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-0">
            {/* Mobile Cards */}
            <div className="block sm:hidden space-y-3">
              {filteredBills.map((bill) => (
                <div key={bill.id} className="bg-gray-50 rounded-lg p-3 border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">#{bill.id}</span>
                    <select
                      value={bill.paymentStatus || 'pending'}
                      onChange={(e) => handleStatusChange(bill.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(bill.paymentStatus || 'pending')}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm">{bill.customerName}</p>
                    <p className="text-xs text-gray-500">{bill.customerPhone}</p>
                    <p className="text-xs text-gray-500">{bill.date}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800 text-sm">₹{bill.grandTotal?.toFixed(2) || '0.00'}</span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handlePrintBill(bill)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                      >
                        🖨️
                      </button>
                      <button
                        onClick={() => handleDeleteBill(bill.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Invoice ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map((bill) => (
                    <tr key={bill.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">#{bill.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-800">{bill.customerName}</p>
                          <p className="text-sm text-gray-500">{bill.customerPhone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700 text-sm">{bill.date}</td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-gray-800">₹{bill.grandTotal?.toFixed(2) || '0.00'}</span>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={bill.paymentStatus || 'pending'}
                          onChange={(e) => handleStatusChange(bill.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(bill.paymentStatus || 'pending')}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="overdue">Overdue</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handlePrintBill(bill)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                          >
                            🖨️
                          </button>
                          <button
                            onClick={() => handleDeleteBill(bill.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceList;