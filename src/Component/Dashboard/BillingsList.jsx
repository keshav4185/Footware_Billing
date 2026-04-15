import React from 'react';
import { createPortal } from 'react-dom';
import {
  FileText,
  Search,
  Calendar,
  Eye,
  Printer,
  Trash2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { invoiceAPI, companyAPI } from '../../services/api';

const BillingsList = ({ isDarkMode, onEditBill }) => {
  const [billSearchTerm, setBillSearchTerm] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);
  const [selectedBill, setSelectedBill] = React.useState(null);
  const [showExchange, setShowExchange] = React.useState(false);
  const [exchangeBill, setExchangeBill] = React.useState(null);
  const [invoices, setInvoices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [updateBill, setUpdateBill] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [companyLogo, setCompanyLogo] = React.useState(null);
  const [digitalSignature, setDigitalSignature] = React.useState(null);

  // ✅ CENTRALIZED MAPPING FUNCTION
  const mapInvoiceToUI = (invoice) => {
    if (!invoice) return null;

    const items = invoice.items || invoice.invoiceItems || [];
    const calculatedAmount = invoice.totalAmount || invoice.grandTotal || invoice.amount || 0;

    return {
      id: invoice.id,
      invoiceNo: invoice.invoiceNumber || invoice.invoiceNo || `INV-${invoice.id || 'N/A'}`,
      customerName: invoice.customer?.name || invoice.customerName || 'Walk-in Customer',
      customerPhone: invoice.customer?.phone || invoice.customerPhone || 'N/A',
      customerGst: invoice.customer?.gst || invoice.customerGst || 'N/A',
      customerAddress: invoice.customer?.address || invoice.customerAddress || 'N/A',
      date: invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString('en-GB') : (invoice.date || new Date().toLocaleDateString('en-GB')),
      amount: calculatedAmount,
      status: invoice.status || 'Completed',
      paymentStatus: (invoice.paymentStatus?.toUpperCase() === 'PAID' || (invoice.balanceAmount || 0) === 0) ? 'Paid' : 'Unpaid',
      items: Array.isArray(items) ? items : [],
      totals: {
        subtotal: invoice.subTotal || invoice.subtotal || invoice.totals?.subtotal || calculatedAmount,
        grandTotal: calculatedAmount,
        balanceAmount: invoice.balanceAmount !== undefined ? invoice.balanceAmount : (calculatedAmount - (invoice.advanceAmount || 0)),
        advanceAmount: invoice.advanceAmount || 0,
        cgstAmount: invoice.totalCgst || invoice.cgstAmount || invoice.totals?.cgstAmount || 0,
        sgstAmount: invoice.totalSgst || invoice.sgstAmount || invoice.totals?.sgstAmount || 0,
        totalDiscount: invoice.totalDiscount || invoice.totals?.totalDiscount || 0
      },
      employeeName: invoice.employee?.name || invoice.employeeName || 'Sales Person'
    };
  };

  // Fetch complete invoice data with all related entities
  const fetchCompleteInvoiceData = async (invoiceId) => {
    try {
      const response = await invoiceAPI.getById(invoiceId);
      const invoice = response.data || response;
      return mapInvoiceToUI(invoice);
    } catch (error) {
      console.error('Error fetching complete invoice data:', error);
      return null;
    }
  };

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await invoiceAPI.getAll();
      const data = response.data;

      // Handle different response formats
      let invoicesArray = [];
      if (Array.isArray(data)) {
        invoicesArray = data;
      } else if (data && Array.isArray(data.content)) {
        invoicesArray = data.content;
      } else if (data && Array.isArray(data.invoices)) {
        invoicesArray = data.invoices;
      } else {
        invoicesArray = [];
      }

      // Map invoices using centralized helper
      const mappedInvoices = invoicesArray.map((invoice) => mapInvoiceToUI(invoice)).filter(Boolean);

      setInvoices(mappedInvoices.sort((a, b) => b.id - a.id));

      setInvoices(mappedInvoices.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Error fetching invoices:', error);
      // Fallback to localStorage - IMPORTANT: use 'bills'
      const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
      setInvoices(savedBills);
    } finally {
      setLoading(false);
    }
  };

  // Update invoice
  const handleUpdateBill = (bill) => {
    setUpdateBill(bill);
    setShowUpdateModal(true);
  };

  const updateInvoice = async (updatedData) => {
    try {
      await invoiceAPI.update(updateBill.id, {
        invoiceNumber: updatedData.invoiceNumber,
        company: { id: updatedData.companyId },
        customer: { id: updatedData.customerId },
        items: updatedData.items,
        totals: updatedData.totals
      });
      alert('Invoice updated successfully!');
      fetchInvoices();
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating invoice:', error);
      alert('Error updating invoice: ' + (error.response?.data?.message || error.message));
    }
  };

  const togglePaymentStatus = (billId) => {
    const updatedInvoices = invoices.map(bill =>
      bill.id === billId
        ? { ...bill, paymentStatus: bill.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid' }
        : bill
    );
    setInvoices(updatedInvoices);
  };

  // Load invoices on component mount
  React.useEffect(() => {
    fetchInvoices();

    // Load saved logo and signature
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) {
      setCompanyLogo(savedLogo);
    }

    const savedSignature = localStorage.getItem('digitalSignature');
    if (savedSignature) {
      setDigitalSignature(savedSignature);
    }
  }, []);

  const viewBill = async (bill) => {
    console.log('Viewing bill:', bill.id);
    const completeData = await fetchCompleteInvoiceData(bill.id);
    console.log('Complete invoice data:', completeData);
    console.log('CGST Amount:', completeData?.totals?.cgstAmount);
    console.log('SGST Amount:', completeData?.totals?.sgstAmount);
    setSelectedBill(completeData || bill);
    setShowPreview(true);
  };

  // Calculation functions from CreateBill
  const calculateRowAmount = (product) => {
    const unitPrice = product.rate || product.price;
    const subtotal = product.quantity * unitPrice;
    const afterDiscount = subtotal * (1 - (product.discount || 0) / 100);
    return afterDiscount;
  };

  const calculateTotals = (items, cgstRate = 9, sgstRate = 9, advanceAmount = 0) => {
    let subtotal = 0, totalDiscount = 0;

    items.forEach(item => {
      const itemSubtotal = item.quantity * item.price;
      const itemDiscount = itemSubtotal * (item.discount || 0) / 100;
      subtotal += itemSubtotal;
      totalDiscount += itemDiscount;
    });

    const taxableAmount = subtotal - totalDiscount;
    const cgstAmount = taxableAmount * cgstRate / 100;
    const sgstAmount = taxableAmount * sgstRate / 100;
    const grandTotal = taxableAmount + cgstAmount + sgstAmount;
    const balanceAmount = grandTotal - advanceAmount;

    return {
      subtotal,
      totalDiscount,
      taxableAmount,
      cgstAmount,
      sgstAmount,
      grandTotal,
      balanceAmount
    };
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

  const printBill = async (bill) => {
    const completeData = await fetchCompleteInvoiceData(bill.id);
    const billData = completeData || bill;

    // Get logged-in employee data
    const employeeName = localStorage.getItem('loggedInEmployee') || billData.employeeName || 'Sales Person';

    // Use backend totals directly
    const calculatedTotals = {
      subtotal: billData.totals?.subtotal || billData.amount,
      totalDiscount: billData.totals?.totalDiscount || 0,
      taxableAmount: (billData.totals?.subtotal || billData.amount) - (billData.totals?.totalDiscount || 0),
      cgstAmount: billData.totals?.cgstAmount || 0,
      sgstAmount: billData.totals?.sgstAmount || 0,
      grandTotal: billData.totals?.grandTotal || billData.amount,
      balanceAmount: billData.totals?.balanceAmount || (billData.amount - (billData.totals?.advanceAmount || 0))
    };

    // Generate products HTML from actual items
    const productsHTML = billData.items && billData.items.length > 0
      ? billData.items.map((item, index) =>
        `<tr>
            <td class="border border-black p-2 text-center text-sm">${index + 1}</td>
            <td class="border border-black p-2 text-sm">${item.product?.name || 'Product'}</td>
            <td class="border border-black p-2 text-center text-sm">${item.quantity || 1}</td>
            <td class="border border-black p-2 text-center text-sm">₹${(item.price || 0).toFixed(2)}</td>
            <td class="border border-black p-2 text-center text-sm">${item.discount || 0}%</td>
            <td class="border border-black p-2 text-center text-sm">₹${calculateRowAmount(item).toFixed(2)}</td>
          </tr>`
      ).join('')
      : `<tr>
          <td class="border border-black p-2 text-center text-sm">1</td>
          <td class="border border-black p-2 text-sm">Service</td>
          <td class="border border-black p-2 text-center text-sm">1</td>
          <td class="border border-black p-2 text-center text-sm">₹${billData.amount.toFixed(2)}</td>
          <td class="border border-black p-2 text-center text-sm">0%</td>
          <td class="border border-black p-2 text-center text-sm">₹${billData.amount.toFixed(2)}</td>
        </tr>`;

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
              <div class="logo-box">${companyLogo ? `<img src="${companyLogo}" alt="Logo" style="width:100%;height:100%;object-fit:contain;">` : 'YOUR<br>LOGO'}</div>
              <div class="company-info">
                <div class="company-name">${billData.company?.name || 'Smart Sales'}</div>
                <div class="company-details">${billData.company?.address || '123 Business Street, City - 400001'}<br>Phone: ${billData.company?.phone || '+91 98765 43210'}<br>GST: ${billData.company?.gst || '27XXXXX1234X1ZX'}</div>
                <div class="brand-line">${billData.company?.brands || 'RELAXO adidas Bata Paragon FILA campus'}</div>
              </div>
            </div>
            <div class="invoice-title">INVOICE</div>
          </div>
          <div class="tax-header">TAX INVOICE</div>
          <div class="bill-details">
            <div class="bill-to">
              <h3>BILL TO:</h3>
              <div class="customer-details">
                <strong>Name:</strong> ${billData.customerName}<br>
                <strong>Phone:</strong> ${billData.customerPhone}<br>
                <strong>Address:</strong> ${billData.customerAddress || 'N/A'}
              </div>
            </div>
            <div class="invoice-info">
              <table class="invoice-info-table">
                <tr><td>Invoice No.:</td><td>${billData.invoiceNo || 'N/A'}</td></tr>
                <tr><td>Invoice Date:</td><td>${billData.date || new Date().toLocaleDateString()}</td></tr>
                <tr><td>Salesperson:</td><td><strong>${employeeName || 'Staff'}</strong></td></tr>
                <tr><td>Payment Method:</td><td><span class="payment-method">Cash</span></td></tr>
                <tr><td>Payment Status:</td><td><span class="payment-status">${billData.paymentStatus || 'Unpaid'}</span></td></tr>
              </table>
            </div>
          </div>
          <table class="products-table">
            <thead><tr><th>Sr. No.</th><th>Name of Product/Service</th><th>Qty</th><th>Rate</th><th>Disc. (%)</th><th>Total</th></tr></thead>
            <tbody>${productsHTML}</tbody>
          </table>
          <div class="totals-section">
            <div class="words-section">
              <strong>Total in words:</strong><br>
              <div class="words-text">${convertToWords(Math.round(calculatedTotals.grandTotal))}</div>
            </div>
            <div class="amounts-section">
              <div class="amount-row"><span>Taxable Amount:</span><span>₹${calculatedTotals.taxableAmount.toFixed(2)}</span></div>
              <div class="amount-row"><span>Discount:</span><span>₹${calculatedTotals.totalDiscount.toFixed(2)}</span></div>
              ${calculatedTotals.cgstAmount > 0 ? `<div class="amount-row"><span>CGST (9%):</span><span>₹${calculatedTotals.cgstAmount.toFixed(2)}</span></div>` : ''}
              ${calculatedTotals.sgstAmount > 0 ? `<div class="amount-row"><span>SGST (9%):</span><span>₹${calculatedTotals.sgstAmount.toFixed(2)}</span></div>` : ''}
              <div class="amount-row total-amount"><span>Total Amount:</span><span>₹${calculatedTotals.grandTotal.toFixed(2)}</span></div>
              <div class="amount-row"><span>Paid Amount:</span><span>₹${(billData.totals?.advanceAmount || 0).toFixed(2)}</span></div>
              <div class="amount-row" style="background: #fef3cd; border-top: 2px solid #f59e0b;"><span style="color: #92400e; font-weight: bold;">Balance Amount:</span><span style="color: #92400e; font-weight: bold;">₹${calculatedTotals.balanceAmount.toFixed(2)}</span></div>
            </div>
          </div>
          <div style="border: 3px solid #000; border-top: none; padding: 60px 20px 20px; text-align: right; background: #fafafa; min-height: 120px; position: relative;">
            ${digitalSignature ? `<img src="${digitalSignature}" alt="Signature" style="width: 150px; height: 60px; object-fit: contain; position: absolute; top: 20px; right: 50px;">` : ''}
            <div style="border-top: 1px solid #000; display: inline-block; min-width: 200px; padding-top: 10px; font-size: 14px; font-weight: bold; color: #000;">Authorized Signature</div>
          </div>
        </div>
      </body>
      </html>
    `);
    printTab.document.close();
  };

  const deleteBill = async (billId) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      try {
        const response = await fetch(`https://backend-billing-software-ahxt.onrender.com/api/billing/invoice/${billId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedInvoices = invoices.filter(bill => bill.id !== billId);
        setInvoices(updatedInvoices);
        alert('Bill deleted successfully!');
      } catch (error) {
        console.error('Error deleting invoice:', error);
        alert('Error deleting invoice: ' + error.message);
      }
    }
  };

  const handleExchange = (bill) => {
    setExchangeBill(bill);
    setShowExchange(true);
  };


  const savedBills = invoices;
  const filteredBills = savedBills.filter(bill => {
    const matchesSearch = bill.invoiceNo.toLowerCase().includes(billSearchTerm.toLowerCase()) ||
      bill.customerName.toLowerCase().includes(billSearchTerm.toLowerCase()) ||
      bill.customerPhone.includes(billSearchTerm) ||
      bill.amount.toString().includes(billSearchTerm);

    // Robust date matching
    let matchesDate = true;
    if (selectedDate) {
      const filterDate = new Date(selectedDate).toDateString();
      // Ensure bill.date is properly parsed for comparison
      const billDateStr = bill.date ? new Date(bill.date.split('/').reverse().join('-')).toDateString() : '';
      matchesDate = billDateStr === filterDate;
    }

    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-15 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 animate-float"></div>
      </div>

      <div className={`rounded-2xl shadow-sm border p-4 md:p-8 mb-6 relative z-10 transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h2 className={`text-2xl md:text-3xl font-black flex items-center gap-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-blue-900/40' : 'bg-blue-50'}`}>
                <FileText className="text-blue-500" size={24} />
              </div>
              My Billings
            </h2>
            <p className={`text-sm mt-1 font-medium italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>View and manage your billing history</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Date Filter */}
            <div className="relative w-full md:w-64 group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                placeholder="dd/mm/yyyy"
              />
            </div>

            {/* Search Filter */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="text"
                value={billSearchTerm}
                onChange={(e) => setBillSearchTerm(e.target.value)}
                placeholder="Search bills..."
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium placeholder:text-gray-400 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              />
            </div>
          </div>
        </div>

        {selectedDate && (
          <div className="flex items-center gap-3 mb-6 animate-fadeIn">
            <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-blue-100">
              <Calendar size={12} />
              {new Date(selectedDate).toLocaleDateString('en-GB')}
            </span>
            <button
              onClick={() => setSelectedDate('')}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100"
            >
              Clear Filter
            </button>
          </div>
        )}

        {loading ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-lg font-medium">Loading invoices...</p>
          </div>
        ) : filteredBills.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <FileText size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-200'}`} />
            <p className="text-lg font-medium">{billSearchTerm ? 'No bills found matching your search.' : 'No bills found. Create your first bill!'}</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className={`hidden md:block overflow-x-auto rounded-lg p-4 transition-all duration-300 ${isDarkMode ? 'bg-gray-700/30' : 'bg-white/50 hover:bg-white/70'}`}>
              <table className="w-full border-collapse">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Invoice No.</th>
                    <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Customer</th>
                    <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</th>
                    <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</th>
                    <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                    <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payment</th>
                    <th className={`text-center p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map(bill => (
                    <tr key={bill.id} className={`border-b transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                      <td className="p-4 font-medium text-blue-500 cursor-pointer hover:text-blue-400 hover:underline" onClick={() => onEditBill && onEditBill({ ...bill, isEdit: true })}>{bill.invoiceNo}</td>
                      <td className={`p-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{bill.customerName}</td>
                      <td className={`p-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{bill.date}</td>
                      <td className="p-4 font-semibold text-green-500">₹{bill.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {bill.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${(bill.paymentStatus || 'Unpaid') === 'Paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                          }`}>
                          {(bill.paymentStatus || 'Unpaid') === 'Paid' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {bill.paymentStatus || 'Unpaid'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => viewBill(bill)}
                            className="bg-blue-500 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                            title="View Invoice"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() => printBill(bill)}
                            className="bg-green-500 text-white p-2.5 rounded-lg hover:bg-green-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                            title="Print Invoice"
                          >
                            <Printer size={20} />
                          </button>
                          <button
                            onClick={() => deleteBill(bill.id)}
                            className="bg-red-500 text-white p-2.5 rounded-lg hover:bg-red-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                            title="Delete Invoice"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredBills.map((bill, index) => (
                <div key={bill.id} className={`rounded-lg p-4 border hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-slideInUp group ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:shadow-gray-900/30' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-blue-200/30'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-blue-500 cursor-pointer hover:text-blue-400 hover:underline" onClick={() => onEditBill && onEditBill({ ...bill, isEdit: true })}>{bill.invoiceNo}</h3>
                      <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{bill.customerName}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {bill.status}
                      </span>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${(bill.paymentStatus || 'Unpaid') === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}>
                        {(bill.paymentStatus || 'Unpaid') === 'Paid' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                        {bill.paymentStatus || 'Unpaid'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{bill.date}</span>
                    <span className="font-bold text-green-500">₹{bill.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                      onClick={() => viewBill(bill)}
                      title="View Invoice"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                      onClick={() => printBill(bill)}
                      title="Print Invoice"
                    >
                      <Printer size={20} />
                    </button>
                    <button
                      className="flex-1 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                      onClick={() => deleteBill(bill.id)}
                      title="Delete Invoice"
                    >
                      <Trash2 size={20} />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 999999 }} onClick={() => setShowExchange(false)}>
          <div className={`rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto m-2 md:m-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`} onClick={(e) => e.stopPropagation()}>
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                  <RefreshCw className="text-blue-600" size={24} /> Exchange Product
                </h3>
                <button onClick={() => setShowExchange(false)} className={`text-2xl transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Bill Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className={`font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>Original Bill</h4>
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
                  <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>Exchange Details</h4>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Exchange Product</label>
                    <input
                      type="text"
                      placeholder="Enter new product name"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>New Amount</label>
                    <input
                      type="number"
                      placeholder="Enter new amount"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Exchange Reason</label>
                    <textarea
                      placeholder="Reason for exchange"
                      rows="3"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                    ></textarea>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Difference Amount</label>
                    <input
                      type="number"
                      placeholder="Amount difference (+/-)"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                        }`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowExchange(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Process Exchange
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Update Modal */}
      {showUpdateModal && updateBill && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 999999 }} onClick={() => setShowUpdateModal(false)}>
          <div className={`rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto m-2 md:m-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`} onClick={(e) => e.stopPropagation()}>
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                  <span className="text-2xl">✏️</span> Update Invoice
                </h3>
                <button onClick={() => setShowUpdateModal(false)} className={`text-2xl transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                  ×
                </button>
              </div>

              <div className="space-y-4 update-form">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Invoice Number</label>
                  <input
                    name="invoiceNumber"
                    type="text"
                    defaultValue={updateBill.invoiceNo}
                    className={`w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
                      }`}
                    placeholder="Invoice number"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Customer Name</label>
                  <input
                    name="customerName"
                    type="text"
                    defaultValue={updateBill.customerName}
                    className={`w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
                      }`}
                    placeholder="Customer name"
                    readOnly
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Amount</label>
                  <input
                    name="amount"
                    type="number"
                    defaultValue={updateBill.amount}
                    className={`w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
                      }`}
                    placeholder="Amount"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Payment Status</label>
                  <select
                    name="paymentStatus"
                    defaultValue={updateBill.paymentStatus}
                    className={`w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-200 text-gray-800'
                      }`}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={(event) => {
                    const formData = new FormData(event.target.closest('.update-form'));
                    const updatedData = {
                      invoiceNumber: formData.get('invoiceNumber'),
                      companyId: updateBill.companyId,
                      customerId: updateBill.customerId,
                      items: updateBill.items,
                      totals: {
                        ...updateBill.totals,
                        grandTotal: parseFloat(formData.get('amount')) || updateBill.amount
                      }
                    };
                    updateInvoice(updatedData);
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Update Invoice
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Preview Modal */}
      {showPreview && selectedBill && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 999999 }} onClick={() => setShowPreview(false)}>
          <div className={`rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto m-2 md:m-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`} onClick={(e) => e.stopPropagation()}>
            <div className="p-3 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className={`text-lg md:text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                  <Eye className="text-blue-600" size={24} /> Invoice Preview
                </h3>
                <button onClick={() => setShowPreview(false)} className={`text-xl md:text-2xl transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                  ×
                </button>
              </div>

              {/* Invoice Preview Content */}
              <div className={`border rounded-lg p-3 md:p-6 text-xs md:text-sm ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-100' : 'border-gray-300 md:border-2 bg-white text-gray-800'}`}>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 pb-3 md:pb-4 border-b border-black md:border-b-2">
                  <div className="flex items-start w-full md:w-auto mb-3 md:mb-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xs font-bold mr-3 md:mr-4">
                      {companyLogo ? (
                        <img src={companyLogo} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        'YOUR LOGO'
                      )}
                    </div>
                    <div className="flex-1">
                      <h1 className="text-lg md:text-xl font-bold">{selectedBill.company?.name || 'Smart Sales'}</h1>
                      <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedBill.company?.address || '123 Business Street, City - 400001'}<br />
                        Phone: {selectedBill.company?.phone || '+91 98765 43210'}<br />
                        GST: {selectedBill.company?.gst || '27XXXXX1234X1ZX'}
                      </p>
                      <p className={`text-xs md:text-sm font-medium mt-2 ${isDarkMode ? 'text-gray-300' : ''}`}>{selectedBill.company?.brands || 'RELAXO adidas Bata Paragon FILA campus'}</p>
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
                  <div className={`p-3 md:p-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`font-bold mb-2 md:mb-3 border-b pb-1 md:pb-2 ${isDarkMode ? 'border-gray-600' : ''}`}>BILL TO:</h3>
                    <div className="text-xs md:text-sm space-y-1">
                      <p><strong>Name:</strong> {selectedBill.customerName}</p>
                      <p><strong>Phone:</strong> {selectedBill.customerPhone}</p>
                      <p><strong>Address:</strong> {selectedBill.customerAddress || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex justify-between">
                        <span className="font-bold">Invoice No.:</span>
                        <span>{selectedBill.invoiceNo || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Invoice Date:</span>
                        <span>{selectedBill.date || new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Salesperson:</span>
                        <span className="font-semibold text-blue-600">{localStorage.getItem('loggedInEmployee') || selectedBill.employeeName || 'Sales Person'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Payment Method:</span>
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Cash</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Payment Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${(selectedBill.paymentStatus || 'Unpaid') === 'Paid'
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
                  {selectedBill.items && selectedBill.items.length > 0 ? (
                    selectedBill.items.map((item, index) => (
                      <div key={index} className={`p-3 mb-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{index + 1}. {item.itemName || item.productName || item.product?.name || 'Product'}</span>
                          <span className="font-bold">₹{calculateRowAmount(item).toFixed(2)}</span>
                        </div>
                        <div className={`grid grid-cols-3 gap-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span>Qty: {item.quantity || 1}</span>
                          <span>Rate: ₹{(item.rate || item.price || 0).toFixed(2)}</span>
                          <span>Disc: {item.discount || 0}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={`p-3 mb-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">1. Service</span>
                        <span className="font-bold">₹{selectedBill.amount.toFixed(2)}</span>
                      </div>
                      <div className={`grid grid-cols-3 gap-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span>Qty: 1</span>
                        <span>Rate: ₹{selectedBill.amount.toFixed(2)}</span>
                        <span>Disc: 0%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Products Table - Desktop */}
                <div className="hidden md:block mb-6">
                  <table className={`w-full border-collapse border-2 ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>
                    <thead>
                      <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                        <th className={`border p-2 text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>Sr. No.</th>
                        <th className={`border p-2 text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>Name of Product/Service</th>
                        <th className={`border p-2 text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>Qty</th>
                        <th className={`border p-2 text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>Rate</th>
                        <th className={`border p-2 text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>Disc. (%)</th>
                        <th className={`border p-2 text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.items && selectedBill.items.length > 0 ? (
                        selectedBill.items.map((item, index) => (
                          <tr key={index} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                            <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>{index + 1}</td>
                            <td className={`border p-2 text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>{item.itemName || item.productName || item.product?.name || 'Product'}</td>
                            <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>{item.quantity || 1}</td>
                            <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>₹{(item.rate || item.price || 0).toFixed(2)}</td>
                            <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>{item.discount || 0}%</td>
                            <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>₹{calculateRowAmount(item).toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>1</td>
                          <td className={`border p-2 text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>Service</td>
                          <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>1</td>
                          <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>₹{selectedBill.amount.toFixed(2)}</td>
                          <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>0%</td>
                          <td className={`border p-2 text-center text-sm ${isDarkMode ? 'border-gray-500' : 'border-black'}`}>₹{selectedBill.amount.toFixed(2)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className={`p-3 md:p-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <strong className="block mb-2">Total in words:</strong>
                    <div className={`font-bold text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {convertToWords(Math.round(selectedBill.totals?.grandTotal || selectedBill.amount))}
                    </div>
                  </div>
                  <div>
                    <div className="space-y-2 text-xs md:text-sm">
                      {(() => {
                        // Use backend totals directly
                        const calculatedTotals = {
                          subtotal: selectedBill.totals?.subtotal || selectedBill.amount,
                          totalDiscount: selectedBill.totals?.totalDiscount || 0,
                          taxableAmount: (selectedBill.totals?.subtotal || selectedBill.amount) - (selectedBill.totals?.totalDiscount || 0),
                          cgstAmount: selectedBill.totals?.cgstAmount || 0,
                          sgstAmount: selectedBill.totals?.sgstAmount || 0,
                          grandTotal: selectedBill.totals?.grandTotal || selectedBill.amount,
                          balanceAmount: selectedBill.totals?.balanceAmount || (selectedBill.amount - (selectedBill.totals?.advanceAmount || 0))
                        };
                        return (
                          <>
                            <div className={`flex justify-between py-1 border-b ${isDarkMode ? 'border-gray-600' : ''}`}>
                              <span>Taxable Amount:</span>
                              <span>₹{calculatedTotals.taxableAmount.toFixed(2)}</span>
                            </div>
                            <div className={`flex justify-between py-1 border-b ${isDarkMode ? 'border-gray-600' : ''}`}>
                              <span>Discount:</span>
                              <span>₹{calculatedTotals.totalDiscount.toFixed(2)}</span>
                            </div>
                            {calculatedTotals.cgstAmount > 0 && (
                              <div className={`flex justify-between py-1 border-b ${isDarkMode ? 'border-gray-600' : ''}`}>
                                <span>CGST (9%):</span>
                                <span>₹{calculatedTotals.cgstAmount.toFixed(2)}</span>
                              </div>
                            )}
                            {calculatedTotals.sgstAmount > 0 && (
                              <div className={`flex justify-between py-1 border-b ${isDarkMode ? 'border-gray-600' : ''}`}>
                                <span>SGST (9%):</span>
                                <span>₹{calculatedTotals.sgstAmount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className={`flex justify-between py-2 px-3 font-bold text-sm md:text-lg border-2 ${isDarkMode ? 'bg-gray-700 border-gray-500 text-white' : 'bg-gray-100 border-black'}`}>
                              <span>Total Amount:</span>
                              <span>₹{calculatedTotals.grandTotal.toFixed(2)}</span>
                            </div>
                            <div className={`flex justify-between py-1 border-b ${isDarkMode ? 'border-gray-600' : ''}`}>
                              <span>Paid Amount:</span>
                              <span>₹{(selectedBill.totals?.advanceAmount || 0).toFixed(2)}</span>
                            </div>
                            <div className={`flex justify-between py-2 px-3 font-bold text-sm md:text-lg border ${isDarkMode ? 'bg-amber-900/40 border-amber-700 text-amber-300' : 'bg-orange-100 border-orange-300 text-orange-800'}`}>
                              <span>Balance Amount:</span>
                              <span>₹{calculatedTotals.balanceAmount.toFixed(2)}</span>
                            </div>
                          </>
                        );
                      })()
                      }
                    </div>
                  </div>
                </div>

                {/* Signatures */}
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-black md:border-t-2">
                  <div className="text-right relative" style={{ minHeight: '100px', paddingTop: '20px' }}>
                    {digitalSignature && (
                      <img src={digitalSignature} alt="Signature" className="w-32 h-16 object-contain absolute top-0 right-8" />
                    )}
                    <div className="border-t border-black pt-2 font-bold text-xs md:text-sm inline-block min-w-[200px]" style={{ marginTop: '60px' }}>
                      Authorized Signature
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 md:mt-6">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 md:py-3 rounded-lg font-medium transition-all text-sm md:text-base shadow-md hover:shadow-lg"
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