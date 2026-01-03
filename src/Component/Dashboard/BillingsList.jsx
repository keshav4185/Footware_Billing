import React from 'react';
import { createPortal } from 'react-dom';

const BillingsList = ({ isDarkMode, onEditBill }) => {
  const [billSearchTerm, setBillSearchTerm] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);
  const [selectedBill, setSelectedBill] = React.useState(null);
  const [showExchange, setShowExchange] = React.useState(false);
  const [exchangeBill, setExchangeBill] = React.useState(null);
  const [openDropdown, setOpenDropdown] = React.useState(null);

  const togglePaymentStatus = (billId) => {
    const bills = JSON.parse(localStorage.getItem('billings') || '[]');
    const updatedBills = bills.map(bill => 
      bill.id === billId 
        ? { ...bill, paymentStatus: bill.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid' }
        : bill
    );
    localStorage.setItem('billings', JSON.stringify(updatedBills));
    setBillSearchTerm(prev => prev + ' ');
    setBillSearchTerm(prev => prev.trim());
  };

  const viewBill = (bill) => {
    setSelectedBill(bill);
    setShowPreview(true);
  };

  const convertToWords = (num) => {
    const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
    const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
    
    if (num === 0) return 'ZERO RUPEES ONLY';
    
    let words = '';
    if (num >= 10000000) { words += ones[Math.floor(num / 10000000)] + ' CRORE '; num %= 10000000; }
    if (num >= 100000) { words += ones[Math.floor(num / 100000)] + ' LAKH '; num %= 100000; }
    if (num >= 1000) { words += ones[Math.floor(num / 1000)] + ' THOUSAND '; num %= 1000; }
    if (num >= 100) { words += ones[Math.floor(num / 100)] + ' HUNDRED '; num %= 100; }
    if (num >= 20) { words += tens[Math.floor(num / 10)] + ' '; num %= 10; }
    if (num > 0) words += ones[num] + ' ';
    
    return words.trim() + ' RUPEES ONLY';
  };

  const printBill = (bill) => {
    const printTab = window.open('', '_blank');
    printTab.document.write(`
      <!DOCTYPE html>
      <html>
      <head><title>Invoice</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: white; padding: 20px; }
        .invoice-container { max-width: 210mm; margin: 0 auto; background: white; border: 3px solid #000; }
        .header-section { border-bottom: 3px solid #000; padding: 20px; display: flex; justify-content: space-between; align-items: flex-start; min-height: 120px; }
        .logo-section { display: flex; align-items: flex-start; flex: 1; }
        .logo-box { width: 80px; height: 80px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: bold; margin-right: 20px; text-align: center; line-height: 1.1; background: #f9f9f9; }
        .company-info { flex: 1; }
        .company-name { font-size: 22px; font-weight: bold; margin-bottom: 8px; color: #000; }
        .company-details { font-size: 13px; line-height: 1.4; color: #333; margin-bottom: 12px; }
        .brand-line { font-size: 13px; font-weight: 500; color: #444; }
        .invoice-title { font-size: 32px; font-weight: bold; color: #000; text-align: right; padding-right: 10px; }
        .tax-header { background: #000; color: white; text-align: center; padding: 12px; font-size: 18px; font-weight: bold; letter-spacing: 2px; }
        .bill-details { display: flex; }
        .bill-to { width: 50%; padding: 20px; border-right: 3px solid #000; background: #fafafa; }
        .invoice-info { width: 50%; padding: 20px; background: white; }
        .bill-to h3 { font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #000; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .customer-details { font-size: 13px; line-height: 1.6; color: #333; }
        .customer-details strong { color: #000; }
        .invoice-info-table { width: 100%; }
        .invoice-info-table td { padding: 8px 5px; font-size: 13px; border-bottom: 1px solid #eee; }
        .invoice-info-table td:first-child { font-weight: bold; color: #000; }
        .payment-status { color: #dc2626; font-weight: bold; background: #fef2f2; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
        .payment-method { background: #16a34a; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
        .products-table { width: 100%; border-collapse: collapse; border: 3px solid #000; }
        .products-table th { background: #f5f5f5; padding: 12px 8px; text-align: center; font-size: 13px; font-weight: bold; border: 1px solid #000; color: #000; }
        .products-table td { padding: 12px 8px; text-align: center; font-size: 13px; border: 1px solid #000; background: white; }
        .product-name { text-align: left !important; padding-left: 12px; }
        .products-table tbody tr:nth-child(even) { background: #f9f9f9; }
        .totals-section { display: flex; border: 3px solid #000; border-top: none; }
        .words-section { width: 60%; padding: 20px; border-right: 3px solid #000; background: #fafafa; }
        .words-section strong { font-size: 14px; color: #000; }
        .words-text { font-size: 16px; font-weight: bold; color: #333; margin-top: 8px; }
        .amounts-section { width: 40%; background: white; }
        .amount-row { display: flex; justify-content: space-between; padding: 10px 20px; border-bottom: 1px solid #ddd; font-size: 13px; }
        .amount-row:last-child { border-bottom: none; }
        .amount-row span:first-child { font-weight: 500; color: #333; }
        .amount-row span:last-child { font-weight: bold; color: #000; }
        .total-amount { background: #f0f0f0; font-weight: bold; font-size: 16px; border-top: 2px solid #000; }
        .total-amount span { color: #000; font-weight: bold; }
        .signatures { display: flex; border: 3px solid #000; border-top: none; }
        .signature-box { width: 50%; padding: 50px 20px 20px; text-align: center; font-size: 14px; font-weight: bold; color: #000; background: #fafafa; min-height: 100px; position: relative; }
        .signature-box:first-child { border-right: 3px solid #000; }
        .signature-box::before { content: ''; position: absolute; top: 30px; left: 50%; transform: translateX(-50%); width: 150px; height: 1px; background: #000; }
      </style>
      </head>
      <body onload="window.print()">
        <div class="invoice-container">
          <div class="header-section">
            <div class="logo-section">
              <div class="logo-box">YOUR<br>LOGO</div>
              <div class="company-info">
                <div class="company-name">Smart Sales</div>
                <div class="company-details">123 Business Street, City - 400001<br>Phone: +91 98765 43210<br>GST: 27XXXXX1234X1ZX</div>
                <div class="brand-line">RELAXO adidas Bata Paragon FILA campus</div>
              </div>
            </div>
            <div class="invoice-title">INVOICE</div>
          </div>
          <div class="tax-header">TAX INVOICE</div>
          <div class="bill-details">
            <div class="bill-to">
              <h3>BILL TO:</h3>
              <div class="customer-details">
                <strong>Name:</strong> ${bill.customerName}<br>
                <strong>Phone:</strong> ${bill.customerPhone}<br>
                <strong>GST:</strong> ${bill.customerGst || 'N/A'}<br>
                <strong>Address:</strong> ${bill.customerAddress || 'N/A'}
              </div>
            </div>
            <div class="invoice-info">
              <table class="invoice-info-table">
                <tr><td>Invoice No.:</td><td>${bill.invoiceNo}</td></tr>
                <tr><td>Invoice Date:</td><td>${bill.date}</td></tr>
                <tr><td>Payment Method:</td><td><span class="payment-method">💵 Cash</span></td></tr>
                <tr><td>Payment Status:</td><td><span class="payment-status">${bill.paymentStatus || 'Unpaid'}</span></td></tr>
              </table>
            </div>
          </div>
          <table class="products-table">
            <thead><tr><th>Sr. No.</th><th>Name of Product/Service</th><th>HSN/SAC</th><th>Qty</th><th>Rate</th><th>Disc. (%)</th><th>Total</th></tr></thead>
            <tbody>
              <tr>
                <td>1</td>
                <td class="product-name">Service</td>
                <td>-</td>
                <td>1</td>
                <td>${bill.amount.toFixed(2)}</td>
                <td>0</td>
                <td>${bill.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div class="totals-section">
            <div class="words-section">
              <strong>Total in words:</strong><br>
              <div class="words-text">${convertToWords(Math.round(bill.amount))}</div>
            </div>
            <div class="amounts-section">
              <div class="amount-row"><span>Taxable Amount:</span><span>₹${bill.amount.toFixed(2)}</span></div>
              <div class="amount-row"><span>Discount:</span><span>₹0.00</span></div>
              <div class="amount-row"><span>CGST (9%):</span><span>₹0.00</span></div>
              <div class="amount-row"><span>SGST (9%):</span><span>₹0.00</span></div>
              <div class="amount-row total-amount"><span>Total Amount:</span><span>₹${bill.amount.toFixed(2)}</span></div>
            </div>
          </div>
          <div class="signatures">
            <div class="signature-box">Owner Signature</div>
            <div class="signature-box">Customer Signature</div>
          </div>
        </div>
      </body>
      </html>
    `);
    printTab.document.close();
  };

  const deleteBill = (billId) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      const bills = JSON.parse(localStorage.getItem('billings') || '[]');
      const updatedBills = bills.filter(bill => bill.id !== billId);
      localStorage.setItem('billings', JSON.stringify(updatedBills));
      alert('Bill deleted successfully!');
      setBillSearchTerm(prev => prev + ' ');
      setBillSearchTerm(prev => prev.trim());
    }
  };

  const handleExchange = (bill) => {
    setExchangeBill(bill);
    setShowExchange(true);
    setOpenDropdown(null);
  };

  const toggleDropdown = (billId) => {
    setOpenDropdown(openDropdown === billId ? null : billId);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const savedBills = JSON.parse(localStorage.getItem('billings') || '[]');
  const filteredBills = savedBills.filter(bill => 
    bill.invoiceNo.toLowerCase().includes(billSearchTerm.toLowerCase()) ||
    bill.customerName.toLowerCase().includes(billSearchTerm.toLowerCase()) ||
    bill.customerPhone.includes(billSearchTerm) ||
    bill.amount.toString().includes(billSearchTerm)
  );

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">📄</span> My Billings
            </h2>
            <p className="text-sm text-gray-600">View and manage your billing history</p>
          </div>
          <div className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search bills..."
              className="w-full md:w-80 pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              value={billSearchTerm}
              onChange={(e) => setBillSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
        
        {filteredBills.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-lg">{billSearchTerm ? 'No bills found matching your search.' : 'No bills found. Create your first bill!'}</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Invoice No.</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Payment</th>
                    <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map(bill => (
                    <tr key={bill.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-blue-600 cursor-pointer hover:text-blue-800 hover:underline" onClick={() => onEditBill(bill)}>{bill.invoiceNo}</td>
                      <td className="p-4 text-gray-800">{bill.customerName}</td>
                      <td className="p-4 text-gray-600">{bill.date}</td>
                      <td className="p-4 font-semibold text-green-600">₹{bill.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {bill.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => togglePaymentStatus(bill.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            (bill.paymentStatus || 'Unpaid') === 'Paid' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          <span>{(bill.paymentStatus || 'Unpaid') === 'Paid' ? '✅' : '❌'}</span>
                          {bill.paymentStatus || 'Unpaid'}
                        </button>
                      </td>
                      <td className="p-4 text-center relative dropdown-container">
                        <button 
                          className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 mx-auto"
                          onClick={() => toggleDropdown(bill.id)}
                        >
                          Actions ⋮
                        </button>
                        {openDropdown === bill.id && (
                          <div className="absolute right-4 top-12 bg-white border border-gray-200 rounded-lg shadow-lg min-w-32" style={{zIndex: 1000}}>
                            <button 
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2"
                              onClick={() => { viewBill(bill); setOpenDropdown(null); }}
                            >
                              👁️ View
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2"
                              onClick={() => { printBill(bill); setOpenDropdown(null); }}
                            >
                              🖨️ Print
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2"
                              onClick={() => { handleExchange(bill); }}
                            >
                              🔄 Exchange
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm flex items-center gap-2 text-red-600 border-t"
                              onClick={() => { deleteBill(bill.id); setOpenDropdown(null); }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredBills.map(bill => (
                <div key={bill.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-blue-600 cursor-pointer hover:text-blue-800 hover:underline" onClick={() => onEditBill(bill)}>{bill.invoiceNo}</h3>
                      <p className="text-gray-800 font-medium">{bill.customerName}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {bill.status}
                      </span>
                      <button 
                        onClick={() => togglePaymentStatus(bill.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          (bill.paymentStatus || 'Unpaid') === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <span>{(bill.paymentStatus || 'Unpaid') === 'Paid' ? '✅' : '❌'}</span>
                        {bill.paymentStatus || 'Unpaid'}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 text-sm">{bill.date}</span>
                    <span className="font-bold text-green-600">₹{bill.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                      onClick={() => viewBill(bill)}
                    >
                      👁️ View
                    </button>
                    <button 
                      className="flex-1 bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600 transition-colors"
                      onClick={() => printBill(bill)}
                    >
                      🖨️ Print
                    </button>
                    <button 
                      className="flex-1 bg-orange-500 text-white py-2 rounded text-sm hover:bg-orange-600 transition-colors"
                      onClick={() => handleExchange(bill)}
                    >
                      🔄 Exchange
                    </button>
                    <button 
                      className="flex-1 bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 transition-colors"
                      onClick={() => deleteBill(bill.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Exchange Modal */}
      {showExchange && exchangeBill && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{zIndex: 999999}} onClick={() => setShowExchange(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto m-2 md:m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🔄</span> Exchange Product
                </h3>
                <button onClick={() => setShowExchange(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Bill Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-3 text-gray-800">Original Bill</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Invoice No:</strong> {exchangeBill.invoiceNo}</p>
                    <p><strong>Customer:</strong> {exchangeBill.customerName}</p>
                    <p><strong>Phone:</strong> {exchangeBill.customerPhone}</p>
                    <p><strong>Date:</strong> {exchangeBill.date}</p>
                    <p><strong>Amount:</strong> ₹{exchangeBill.amount.toFixed(2)}</p>
                  </div>
                </div>
                
                {/* Exchange Form */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800">Exchange Details</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Product</label>
                    <input 
                      type="text" 
                      placeholder="Enter new product name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Amount</label>
                    <input 
                      type="number" 
                      placeholder="Enter new amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Reason</label>
                    <textarea 
                      placeholder="Reason for exchange"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difference Amount</label>
                    <input 
                      type="number" 
                      placeholder="Amount difference (+/-)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowExchange(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-all"
                >
                  Process Exchange
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Preview Modal */}
      {showPreview && selectedBill && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{zIndex: 999999}} onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto m-2 md:m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-3 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-xl md:text-2xl">👁️</span> Invoice Preview
                </h3>
                <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700 text-xl md:text-2xl">
                  ×
                </button>
              </div>
              
              {/* Invoice Preview Content */}
              <div className="border border-gray-300 md:border-2 rounded-lg p-3 md:p-6 bg-white text-xs md:text-sm">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 pb-3 md:pb-4 border-b border-black md:border-b-2">
                  <div className="flex items-start w-full md:w-auto mb-3 md:mb-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 border border-black md:border-2 flex items-center justify-center text-xs font-bold mr-3 md:mr-4 bg-gray-100">
                      YOUR<br/>LOGO
                    </div>
                    <div className="flex-1">
                      <h1 className="text-lg md:text-xl font-bold">Smart Sales</h1>
                      <p className="text-xs md:text-sm text-gray-600">
                        123 Business Street, City - 400001<br/>
                        Phone: +91 98765 43210<br/>
                        GST: 27XXXXX1234X1ZX
                      </p>
                      <p className="text-xs md:text-sm font-medium mt-2">RELAXO adidas Bata Paragon FILA campus</p>
                    </div>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto">
                    <h2 className="text-xl md:text-2xl font-bold">INVOICE</h2>
                  </div>
                </div>
                
                {/* Tax Invoice Header */}
                <div className="bg-black text-white text-center py-2 mb-4 font-bold text-sm md:text-lg">
                  TAX INVOICE
                </div>
                
                {/* Bill Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <div className="bg-gray-50 p-3 md:p-4 rounded">
                    <h3 className="font-bold mb-2 md:mb-3 border-b pb-1 md:pb-2">BILL TO:</h3>
                    <div className="text-xs md:text-sm space-y-1">
                      <p><strong>Name:</strong> {selectedBill.customerName}</p>
                      <p><strong>Phone:</strong> {selectedBill.customerPhone}</p>
                      <p><strong>GST:</strong> {selectedBill.customerGst || 'N/A'}</p>
                      <p><strong>Address:</strong> {selectedBill.customerAddress || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex justify-between">
                        <span className="font-bold">Invoice No.:</span>
                        <span>{selectedBill.invoiceNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Invoice Date:</span>
                        <span>{selectedBill.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Payment Method:</span>
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">💵 Cash</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Payment Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          (selectedBill.paymentStatus || 'Unpaid') === 'Paid' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>{selectedBill.paymentStatus || 'Unpaid'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Products - Mobile Card */}
                <div className="md:hidden mb-4">
                  <h4 className="font-bold mb-2">Products:</h4>
                  <div className="bg-gray-50 p-3 mb-2 rounded border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">1. Service</span>
                      <span className="font-bold">₹{selectedBill.amount.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                      <span>Qty: 1</span>
                      <span>Rate: ₹{selectedBill.amount.toFixed(2)}</span>
                      <span>Disc: 0%</span>
                    </div>
                  </div>
                </div>
                
                {/* Products Table - Desktop */}
                <div className="hidden md:block mb-6">
                  <table className="w-full border-collapse border-2 border-black">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-black p-2 text-sm">Sr. No.</th>
                        <th className="border border-black p-2 text-sm">Name of Product/Service</th>
                        <th className="border border-black p-2 text-sm">HSN/SAC</th>
                        <th className="border border-black p-2 text-sm">Qty</th>
                        <th className="border border-black p-2 text-sm">Rate</th>
                        <th className="border border-black p-2 text-sm">Disc. (%)</th>
                        <th className="border border-black p-2 text-sm">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-2 text-center text-sm">1</td>
                        <td className="border border-black p-2 text-sm">Service</td>
                        <td className="border border-black p-2 text-center text-sm">-</td>
                        <td className="border border-black p-2 text-center text-sm">1</td>
                        <td className="border border-black p-2 text-center text-sm">₹{selectedBill.amount.toFixed(2)}</td>
                        <td className="border border-black p-2 text-center text-sm">0%</td>
                        <td className="border border-black p-2 text-center text-sm">₹{selectedBill.amount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Totals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-gray-50 p-3 md:p-4 rounded">
                    <strong className="block mb-2">Total in words:</strong>
                    <div className="font-bold text-gray-700 text-xs md:text-sm">{convertToWords(Math.round(selectedBill.amount))}</div>
                  </div>
                  <div>
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex justify-between py-1 border-b">
                        <span>Taxable Amount:</span>
                        <span>₹{selectedBill.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Discount:</span>
                        <span>₹0.00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>CGST (9%):</span>
                        <span>₹0.00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>SGST (9%):</span>
                        <span>₹0.00</span>
                      </div>
                      <div className="flex justify-between py-2 bg-gray-100 px-3 font-bold text-sm md:text-lg border border-black md:border-2">
                        <span>Total Amount:</span>
                        <span>₹{selectedBill.amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Signatures */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-black md:border-t-2">
                  <div className="text-center">
                    <div className="border-t border-black mt-8 md:mt-12 pt-2 font-bold text-xs md:text-sm">Owner Signature</div>
                  </div>
                  <div className="text-center">
                    <div className="border-t border-black mt-8 md:mt-12 pt-2 font-bold text-xs md:text-sm">Customer Signature</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-6">
                <button 
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-gray-500 text-white py-2 md:py-3 rounded-lg font-medium hover:bg-gray-600 transition-all text-sm md:text-base"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default BillingsList;