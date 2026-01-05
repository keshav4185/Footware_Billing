import React from 'react';
import { createPortal } from 'react-dom';

const CreateBill = ({ isDarkMode, editingBill }) => {
  const [showCustomerPopup, setShowCustomerPopup] = React.useState(false);
  const [pendingAction, setPendingAction] = React.useState(null);
  const [customerFormData, setCustomerFormData] = React.useState({
    name: '', phone: '', gst: '', address: ''
  });
  const [products, setProducts] = React.useState([
    { id: 1, name: '', qty: 1, price: 0, tax: 0, discount: 0 }
  ]);
  const [cgstEnabled, setCgstEnabled] = React.useState(true);
  const [sgstEnabled, setSgstEnabled] = React.useState(true);
  const [cgstRate, setCgstRate] = React.useState(9);
  const [sgstRate, setSgstRate] = React.useState(9);
  const [showPreview, setShowPreview] = React.useState(false);
  const [companyLogo, setCompanyLogo] = React.useState(null);
  const [advance, setAdvance] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [paymentStatus, setPaymentStatus] = React.useState('Unpaid');
  const [showCompanyWatermark, setShowCompanyWatermark] = React.useState(false);
  const [loggedInEmployee, setLoggedInEmployee] = React.useState('');
  const [companyDetails, setCompanyDetails] = React.useState({
    name: 'Smart Sales',
    address: '123 Business Street, City - 400001',
    phone: '+91 98765 43210',
    gst: '27XXXXX1234X1ZX',
    brands: 'RELAXO adidas Bata Paragon FILA campus'
  });

  const validateBasicForm = () => {
    if (!products.some(p => p.name.trim())) {
      alert('Please add at least one product!');
      return false;
    }
    return true;
  };
  
  const validateCustomerForm = () => {
    if (!customerFormData.name.trim()) {
      alert('Customer name is required!');
      return false;
    }
    return true;
  };

  const sendInvoice = () => {
    if (!customerFormData.phone) {
      alert('Customer phone number is required to send invoice!');
      return;
    }
    
    const totals = calculateTotals();
    const invoiceText = `🧾 *INVOICE FROM ${companyDetails.name.toUpperCase()}*\n\n` +
      `📋 Invoice No: INV-${Date.now().toString().slice(-6)}\n` +
      `📅 Date: ${new Date().toLocaleDateString()}\n` +
      `👤 Customer: ${customerFormData.name}\n` +
      `📞 Phone: ${customerFormData.phone}\n\n` +
      `💰 *BILL SUMMARY:*\n` +
      `Subtotal: ₹${totals.subtotal.toFixed(2)}\n` +
      `Discount: ₹${totals.totalDiscount.toFixed(2)}\n` +
      `${cgstEnabled ? `CGST (${cgstRate}%): ₹${totals.cgstAmount.toFixed(2)}\n` : ''}` +
      `${sgstEnabled ? `SGST (${sgstRate}%): ₹${totals.sgstAmount.toFixed(2)}\n` : ''}` +
      `*Total Amount: ₹${totals.grandTotal.toFixed(2)}*\n` +
      `Advance: ₹${advance.toFixed(2)}\n` +
      `*Balance: ₹${totals.balanceAmount.toFixed(2)}*\n\n` +
      `👨💼 Salesperson: ${loggedInEmployee}\n` +
      `🏢 ${companyDetails.name}\n` +
      `📍 ${companyDetails.address}\n` +
      `📞 ${companyDetails.phone}`;
    
    const whatsappUrl = `https://wa.me/91${customerFormData.phone}?text=${encodeURIComponent(invoiceText)}`;
    window.open(whatsappUrl, '_blank');
    alert('📱 Invoice sent via WhatsApp!');
  };

  const handleAction = (action) => {
    if (!validateBasicForm()) return;
    if (!validateCustomerForm()) return;
    
    if (action === 'print') openDirectPrintPreview();
    else if (action === 'preview') setShowPreview(true);
    else if (action === 'save') saveBill();
    else if (action === 'send') sendInvoice();
  };
  
  const saveBill = () => {
    try {
      const billData = {
        id: Date.now(),
        customer: customerFormData,
        products: products.filter(p => p.name.trim()),
        date: new Date().toISOString(),
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        paymentStatus: 'Unpaid',
        salesperson: loggedInEmployee
      };
      
      const bills = JSON.parse(localStorage.getItem('bills') || '[]');
      bills.push(billData);
      localStorage.setItem('bills', JSON.stringify(bills));
      
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const existing = customers.find(c => c.phone === customerFormData.phone);
      
      if (!existing) {
        customers.push({
          id: Date.now(),
          ...customerFormData,
          totalBills: 1,
          lastBillDate: new Date().toLocaleDateString()
        });
      }
      
      localStorage.setItem('customers', JSON.stringify(customers));
      alert('💾 Bill saved successfully!');
      
      setCustomerFormData({ name: '', phone: '', gst: '', address: '' });
      setProducts([{ id: 1, name: '', qty: 1, price: 0, tax: 0, discount: 0 }]);
    } catch (error) {
      alert('Error saving bill: ' + error.message);
    }
  };

  const addNewRow = () => {
    setProducts([...products, {
      id: products.length + 1,
      name: '', qty: 1, price: 0, tax: 0, discount: 0
    }]);
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deleteRow = (id) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const calculateRowAmount = (product) => {
    const subtotal = product.qty * product.price;
    const afterDiscount = subtotal * (1 - product.discount/100);
    return afterDiscount * (1 + product.tax/100);
  };

  const calculateTotals = () => {
    let subtotal = 0, totalDiscount = 0;
    
    products.forEach(p => {
      const itemSubtotal = p.qty * p.price;
      const itemDiscount = itemSubtotal * p.discount / 100;
      subtotal += itemSubtotal;
      totalDiscount += itemDiscount;
    });
    
    const taxableAmount = subtotal - totalDiscount;
    const cgstAmount = cgstEnabled ? taxableAmount * cgstRate / 100 : 0;
    const sgstAmount = sgstEnabled ? taxableAmount * sgstRate / 100 : 0;
    const grandTotal = taxableAmount + cgstAmount + sgstAmount;
    const balanceAmount = grandTotal - advance;
    
    return { subtotal, totalDiscount, taxableAmount, cgstAmount, sgstAmount, grandTotal, balanceAmount };
  };

  React.useEffect(() => {
    // Get logged in employee name
    const employeeName = localStorage.getItem('loggedInEmployee') || 'Sales Person';
    setLoggedInEmployee(employeeName);
    
    if (editingBill) {
      setCustomerFormData({
        name: editingBill.customerName || '',
        phone: editingBill.customerPhone || '',
        gst: editingBill.customerGst || '',
        address: editingBill.customerAddress || ''
      });
      setProducts([{
        id: 1,
        name: 'Service',
        qty: 1,
        price: editingBill.amount || 0,
        tax: 0,
        discount: 0
      }]);
    }
    
    // Load saved logo
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) {
      setCompanyLogo(savedLogo);
    }
    
    // Load saved company details
    const savedCompanyDetails = localStorage.getItem('companyDetails');
    if (savedCompanyDetails) {
      setCompanyDetails(JSON.parse(savedCompanyDetails));
    }
  }, [editingBill]);

  // Save company details to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('companyDetails', JSON.stringify(companyDetails));
  }, [companyDetails]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const logoData = event.target.result;
        setCompanyLogo(logoData);
        localStorage.setItem('companyLogo', logoData);
      };
      reader.readAsDataURL(file);
    }
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

  const openDirectPrintPreview = () => {
    const totals = calculateTotals();
    const productsHTML = products.filter(p => p.name).map((p, i) => 
      `<tr><td>${i + 1}</td><td class="product-name">${p.name}</td><td>-</td><td>${p.qty}</td><td>${p.price.toFixed(2)}</td><td>${p.discount}</td><td>${calculateRowAmount(p).toFixed(2)}</td></tr>`
    ).join('');
    
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
        .payment-status.paid { color: #16a34a; background: #f0fdf4; }
        .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); font-size: 120px; font-weight: bold; opacity: 0.1; z-index: 1; pointer-events: none; }
        .company-watermark { color: #6b7280; opacity: 0.1; font-size: 80px; top: 40%; }
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
        <div class="invoice-container" style="position: relative;">
          ${showCompanyWatermark ? `<div class="watermark company-watermark">${companyDetails.name.toUpperCase()}</div>` : ''}
          <div class="header-section">
            <div class="logo-section">
              <div class="logo-box">${companyLogo ? `<img src="${companyLogo}" alt="Logo" style="width:100%;height:100%;object-fit:contain;">` : 'YOUR<br>LOGO'}</div>
              <div class="company-info">
                <div class="company-name">${companyDetails.name}</div>
                <div class="company-details">${companyDetails.address}<br>Phone: ${companyDetails.phone}<br>GST: ${companyDetails.gst}</div>
                <div class="brand-line">${companyDetails.brands}</div>
              </div>
            </div>
            <div class="invoice-title">INVOICE</div>
          </div>
          <div class="tax-header">TAX INVOICE</div>
          <div class="bill-details">
            <div class="bill-to">
              <h3>BILL TO:</h3>
              <div class="customer-details">
                <strong>Name:</strong> ${customerFormData.name}<br>
                <strong>Phone:</strong> ${customerFormData.phone}<br>
                <strong>GST:</strong> ${customerFormData.gst}<br>
                <strong>Address:</strong> ${customerFormData.address}
              </div>
            </div>
            <div class="invoice-info">
              <table class="invoice-info-table">
                <tr><td>Invoice No.:</td><td>INV-${Date.now().toString().slice(-6)}</td></tr>
                <tr><td>Invoice Date:</td><td>${new Date().toLocaleDateString('en-GB')}</td></tr>
                <tr><td>Salesperson:</td><td><strong>${loggedInEmployee}</strong></td></tr>
                <tr><td>Payment Method:</td><td><span class="payment-method">💵 Cash</span></td></tr>
                <tr><td>Payment Status:</td><td><span class="payment-status">${paymentStatus}</span></td></tr>
              </table>
            </div>
          </div>
          <table class="products-table">
            <thead><tr><th>Sr. No.</th><th>Name of Product/Service</th><th>HSN/SAC</th><th>Qty</th><th>Rate</th><th>Disc. (%)</th><th>Total</th></tr></thead>
            <tbody>${productsHTML}</tbody>
          </table>
          <div class="totals-section">
            <div class="words-section">
              <strong>Total in words:</strong><br>
              <div class="words-text">${convertToWords(Math.round(totals.grandTotal))}</div>
            </div>
            <div class="amounts-section">
              <div class="amount-row"><span>Taxable Amount:</span><span>₹${totals.taxableAmount.toFixed(2)}</span></div>
              <div class="amount-row"><span>Discount:</span><span>₹${totals.totalDiscount.toFixed(2)}</span></div>
              ${cgstEnabled ? `<div class="amount-row"><span>CGST (${cgstRate}%):</span><span>₹${totals.cgstAmount.toFixed(2)}</span></div>` : ''}
              ${sgstEnabled ? `<div class="amount-row"><span>SGST (${sgstRate}%):</span><span>₹${totals.sgstAmount.toFixed(2)}</span></div>` : ''}
              <div className="amount-row total-amount"><span>Total Amount:</span><span>₹${totals.grandTotal.toFixed(2)} ${paymentStatus === 'Paid' ? '✅' : '❌'}</span></div>
              <div class="amount-row"><span>Advance Amount:</span><span>₹${advance.toFixed(2)}</span></div>
              <div class="amount-row" style="background: #fef3cd; border-top: 2px solid #f59e0b;"><span style="color: #92400e; font-weight: bold;">Balance Amount:</span><span style="color: #92400e; font-weight: bold;">₹${totals.balanceAmount.toFixed(2)}</span></div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 md:p-6">
      {/* Mobile Header */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">📝</span> {editingBill ? 'Edit Bill' : 'Create New Bill'}
            </h2>
            <p className="text-sm text-gray-600">{editingBill ? `Editing Invoice: ${editingBill.invoiceNo}` : 'Generate professional invoices'}</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md" onClick={() => handleAction('send')}>📤 Send</button>
            <button className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-md" onClick={() => handleAction('print')}>🖨️ Print</button>
            <button className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-md" onClick={() => handleAction('save')}>💾 Save</button>
            <button className="flex-1 sm:flex-none bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-700 hover:to-orange-800 transition-all shadow-md" onClick={() => handleAction('preview')}>👁️ Preview</button>
          </div>
        </div>
      </div>

      {/* Customer & Company Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Customer Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">👤</span> Customer Details
          </h3>
          <div className="customer-details space-y-4">
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Customer Name *</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                placeholder="Enter customer name"
                value={customerFormData.name}
                onChange={(e) => setCustomerFormData({...customerFormData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Phone Number *</label>
              <input 
                type="tel" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                placeholder="Enter phone number" 
                pattern="[0-9]*"
                value={customerFormData.phone}
                onChange={(e) => setCustomerFormData({...customerFormData, phone: e.target.value.replace(/[^0-9]/g, '')})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">GST Number *</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                placeholder="Enter GST number"
                value={customerFormData.gst}
                onChange={(e) => setCustomerFormData({...customerFormData, gst: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-600 mb-1">Invoice Address *</label>
              <textarea 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" 
                rows="3" 
                placeholder="Enter complete address"
                value={customerFormData.address}
                onChange={(e) => setCustomerFormData({...customerFormData, address: e.target.value})}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Company Details Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-4 md:p-6 border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🏢</span> Company Details
          </h3>
          <div className="company-details space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
              <div className="flex items-center gap-3 flex-wrap">
                {companyLogo ? (
                  <img src={companyLogo} alt="Company Logo" className="w-16 h-16 object-contain border rounded" />
                ) : (
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-lg text-xs font-bold text-center min-w-20">SMART<br/>SALES</div>
                )}
                <input type="file" id="logo-upload" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                <label htmlFor="logo-upload" className="bg-gray-600 text-white px-3 py-2 rounded-lg text-xs cursor-pointer hover:bg-gray-700 transition-colors">📁 Choose File</label>
                <span className="text-xs text-gray-500">{companyLogo ? 'Logo uploaded' : 'No file chosen'}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                value={companyDetails.name}
                onChange={(e) => setCompanyDetails({...companyDetails, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
              <textarea 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" 
                rows="3" 
                value={companyDetails.address}
                onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                value={companyDetails.phone}
                onChange={(e) => setCompanyDetails({...companyDetails, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                value={companyDetails.gst}
                onChange={(e) => setCompanyDetails({...companyDetails, gst: e.target.value})}
              />
            </div>
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                <option>💵 Cash</option>
                <option>💳 Card</option>
                <option>📱 UPI</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📦</span> Products & Services
          </h3>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-md flex items-center gap-2" onClick={addNewRow}>
            <span className="text-lg">+</span> Add Product
          </button>
        </div>
        
        {/* Mobile-Optimized Product List */}
        <div className="space-y-3 md:hidden" id="mobile-products">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded text-sm" 
                    placeholder="Product name"
                    value={product.name}
                    onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded text-sm text-center" 
                    value={product.qty} 
                    min="1"
                    onChange={(e) => updateProduct(product.id, 'qty', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded text-sm text-center" 
                    value={product.price} 
                    min="0" 
                    step="0.01"
                    onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                    onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                    onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tax %</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded text-sm text-center" 
                    value={product.tax} 
                    min="0" 
                    max="100"
                    onChange={(e) => updateProduct(product.id, 'tax', parseFloat(e.target.value) || 0)}
                    onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                    onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Disc %</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded text-sm text-center" 
                    value={product.discount} 
                    min="0" 
                    max="100"
                    onChange={(e) => updateProduct(product.id, 'discount', parseFloat(e.target.value) || 0)}
                    onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                    onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm font-semibold text-gray-700">Amount: ₹ <span>{calculateRowAmount(product).toFixed(2)}</span></div>
                <button 
                  className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  onClick={() => deleteRow(product.id)}
                  disabled={products.length === 1}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="products-table w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                <th className="p-3 text-left font-semibold text-gray-700 border-b">Product</th>
                <th className="p-3 text-center font-semibold text-gray-700 border-b">Qty</th>
                <th className="p-3 text-center font-semibold text-gray-700 border-b">Price</th>
                <th className="p-3 text-center font-semibold text-gray-700 border-b">Tax%</th>
                <th className="p-3 text-center font-semibold text-gray-700 border-b">Disc%</th>
                <th className="p-3 text-center font-semibold text-gray-700 border-b">Amount</th>
                <th className="p-3 text-center font-semibold text-gray-700 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border-b">
                    <input 
                      type="text" 
                      className="w-full p-2 border-0 bg-transparent text-sm focus:bg-gray-100 rounded" 
                      placeholder="Product name"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                    />
                  </td>
                  <td className="p-3 border-b text-center">
                    <input 
                      type="number" 
                      className="w-16 p-2 border-0 bg-transparent text-sm text-center focus:bg-gray-100 rounded" 
                      value={product.qty} 
                      min="1"
                      onChange={(e) => updateProduct(product.id, 'qty', parseInt(e.target.value) || 1)}
                    />
                  </td>
                  <td className="p-3 border-b text-center">
                    <input 
                      type="number" 
                      className="w-20 p-2 border-0 bg-transparent text-sm text-center focus:bg-gray-100 rounded" 
                      value={product.price} 
                      min="0" 
                      step="0.01"
                      onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                      onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                      onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
                    />
                  </td>
                  <td className="p-3 border-b text-center">
                    <input 
                      type="number" 
                      className="w-16 p-2 border-0 bg-transparent text-sm text-center focus:bg-gray-100 rounded" 
                      value={product.tax} 
                      min="0" 
                      max="100"
                      onChange={(e) => updateProduct(product.id, 'tax', parseFloat(e.target.value) || 0)}
                      onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                      onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
                    />
                  </td>
                  <td className="p-3 border-b text-center">
                    <input 
                      type="number" 
                      className="w-16 p-2 border-0 bg-transparent text-sm text-center focus:bg-gray-100 rounded" 
                      value={product.discount} 
                      min="0" 
                      max="100"
                      onChange={(e) => updateProduct(product.id, 'discount', parseFloat(e.target.value) || 0)}
                      onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                      onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
                    />
                  </td>
                  <td className="p-3 border-b text-center font-medium text-gray-700">
                    ₹ {calculateRowAmount(product).toFixed(2)}
                  </td>
                  <td className="p-3 border-b text-center">
                    <button 
                      className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors mx-auto"
                      onClick={() => deleteRow(product.id)}
                      disabled={products.length === 1}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">💰</span> Bill Summary
        </h3>
        <div className="bg-white rounded-lg p-4 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600 mb-1 sm:mb-0">Untaxed Amount:</span>
            <span className="font-semibold text-gray-800">₹ {calculateTotals().subtotal.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600 mb-1 sm:mb-0">Discount Amount:</span>
            <span className="font-semibold text-gray-800">₹ {calculateTotals().totalDiscount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-0">
              <input 
                type="checkbox" 
                checked={cgstEnabled} 
                onChange={(e) => setCgstEnabled(e.target.checked)} 
                className="rounded" 
              />
              <span className="text-sm text-gray-600">CGST:</span>
              <input 
                type="number" 
                className="w-12 p-1 border border-gray-300 rounded text-xs text-center" 
                value={cgstRate} 
                min="0" 
                step="0.01"
                onChange={(e) => setCgstRate(parseFloat(e.target.value) || 0)}
                onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
              />%
            </div>
            <span className="font-semibold text-gray-800">₹ {calculateTotals().cgstAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-0">
              <input 
                type="checkbox" 
                checked={sgstEnabled} 
                onChange={(e) => setSgstEnabled(e.target.checked)} 
                className="rounded" 
              />
              <span className="text-sm text-gray-600">SGST:</span>
              <input 
                type="number" 
                className="w-12 p-1 border border-gray-300 rounded text-xs text-center" 
                value={sgstRate} 
                min="0" 
                step="0.01"
                onChange={(e) => setSgstRate(parseFloat(e.target.value) || 0)}
                onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
              />%
            </div>
            <span className="font-semibold text-gray-800">₹ {calculateTotals().sgstAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-0">
              <span className="text-sm text-gray-600">Advance Amount:</span>
              <input 
                type="number" 
                className="w-20 p-1 border border-gray-300 rounded text-xs text-center" 
                value={advance} 
                min="0" 
                step="0.01"
                onChange={(e) => {
                  const advanceValue = parseFloat(e.target.value) || 0;
                  setAdvance(advanceValue);
                  setBalance(calculateTotals().grandTotal - advanceValue);
                }}
                onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
              />
            </div>
            <span className="font-semibold text-gray-800">₹ {advance.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 border-2 border-blue-200">
            <span className="text-base sm:text-lg font-bold text-blue-800 mb-1 sm:mb-0">Total Amount:</span>
            <span className="text-lg sm:text-xl font-bold text-blue-800">₹ {calculateTotals().grandTotal.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg px-4 border-2 border-orange-200 mt-2">
            <span className="text-base sm:text-lg font-bold text-orange-800 mb-1 sm:mb-0">Balance Amount:</span>
            <span className="text-lg sm:text-xl font-bold text-orange-800">₹ {calculateTotals().balanceAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-4 border-2 border-gray-300 mt-2">
            <span className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-0">Payment Status:</span>
            <button 
              onClick={() => setPaymentStatus(paymentStatus === 'Paid' ? 'Unpaid' : 'Paid')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                paymentStatus === 'Paid' 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {paymentStatus}
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              id="companyWatermark" 
              checked={showCompanyWatermark} 
              onChange={(e) => setShowCompanyWatermark(e.target.checked)}
              className="rounded" 
            />
            <label htmlFor="companyWatermark" className="text-sm text-gray-600">Show Company Watermark</label>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && createPortal(
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
              <div className="border border-gray-300 md:border-2 rounded-lg p-3 md:p-6 bg-white text-xs md:text-sm relative overflow-hidden">
                {/* Company Watermark */}
                {showCompanyWatermark && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 opacity-10">
                    <div className="transform rotate-45 text-4xl md:text-6xl font-bold text-gray-500">
                      {companyDetails.name.toUpperCase()}
                    </div>
                  </div>
                )}
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 pb-3 md:pb-4 border-b border-black md:border-b-2">
                  <div className="flex items-start w-full md:w-auto mb-3 md:mb-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 border border-black md:border-2 flex items-center justify-center text-xs font-bold mr-3 md:mr-4 bg-gray-100">
                      YOUR<br/>LOGO
                    </div>
                    <div className="flex-1">
                      <h1 className="text-lg md:text-xl font-bold">{companyDetails.name}</h1>
                      <p className="text-xs md:text-sm text-gray-600">
                        {companyDetails.address}<br/>
                        Phone: {companyDetails.phone}<br/>
                        GST: {companyDetails.gst}
                      </p>
                      <p className="text-xs md:text-sm font-medium mt-2">{companyDetails.brands}</p>
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
                      <p><strong>Name:</strong> {customerFormData.name}</p>
                      <p><strong>Phone:</strong> {customerFormData.phone}</p>
                      <p><strong>GST:</strong> {customerFormData.gst}</p>
                      <p><strong>Address:</strong> {customerFormData.address}</p>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex justify-between">
                        <span className="font-bold">Invoice No.:</span>
                        <span>INV-{Date.now().toString().slice(-6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Invoice Date:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Salesperson:</span>
                        <span className="font-semibold text-blue-600">{loggedInEmployee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Payment Method:</span>
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">💵 Cash</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Payment Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          paymentStatus === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>{paymentStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Products Table - Mobile Cards */}
                <div className="md:hidden mb-4">
                  <h4 className="font-bold mb-2">Products:</h4>
                  {products.map((product, index) => {
                    if (product.name) {
                      return (
                        <div key={index} className="bg-gray-50 p-3 mb-2 rounded border">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">{index + 1}. {product.name}</span>
                            <span className="font-bold">₹{calculateRowAmount(product).toFixed(2)}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                            <span>Qty: {product.qty}</span>
                            <span>Rate: ₹{product.price.toFixed(2)}</span>
                            <span>Disc: {product.discount}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
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
                      {products.map((product, index) => {
                        if (product.name) {
                          return (
                            <tr key={index}>
                              <td className="border border-black p-2 text-center text-sm">{index + 1}</td>
                              <td className="border border-black p-2 text-sm">{product.name}</td>
                              <td className="border border-black p-2 text-center text-sm">-</td>
                              <td className="border border-black p-2 text-center text-sm">{product.qty}</td>
                              <td className="border border-black p-2 text-center text-sm">₹{product.price.toFixed(2)}</td>
                              <td className="border border-black p-2 text-center text-sm">{product.discount}%</td>
                              <td className="border border-black p-2 text-center text-sm">₹{calculateRowAmount(product).toFixed(2)}</td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
                
                {/* Totals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-gray-50 p-3 md:p-4 rounded">
                    <strong className="block mb-2">Total in words:</strong>
                    <div className="font-bold text-gray-700 text-xs md:text-sm">{convertToWords(Math.round(calculateTotals().grandTotal))}</div>
                  </div>
                  <div>
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex justify-between py-1 border-b">
                        <span>Taxable Amount:</span>
                        <span>₹{calculateTotals().taxableAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Discount:</span>
                        <span>₹{calculateTotals().totalDiscount.toFixed(2)}</span>
                      </div>
                      {cgstEnabled && (
                        <div className="flex justify-between py-1 border-b">
                          <span>CGST ({cgstRate}%):</span>
                          <span>₹{calculateTotals().cgstAmount.toFixed(2)}</span>
                        </div>
                      )}
                      {sgstEnabled && (
                        <div className="flex justify-between py-1 border-b">
                          <span>SGST ({sgstRate}%):</span>
                          <span>₹{calculateTotals().sgstAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 bg-gray-100 px-3 font-bold text-sm md:text-lg border border-black md:border-2">
                        <span>Total Amount:</span>
                        <div className="flex items-center gap-2">
                          <span>₹{calculateTotals().grandTotal.toFixed(2)}</span>
                          <span className={`text-lg ${paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                            {paymentStatus === 'Paid' ? '✅' : '❌'}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Advance Amount:</span>
                        <span>₹{advance.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 bg-orange-100 px-3 font-bold text-sm md:text-lg border border-orange-300">
                        <span>Balance Amount:</span>
                        <span>₹{calculateTotals().balanceAmount.toFixed(2)}</span>
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

      {/* Customer Details Popup */}
      {showCustomerPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{zIndex: 99999}} onClick={() => setShowCustomerPopup(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">👤</span> Customer Details
                </h3>
                <button onClick={() => setShowCustomerPopup(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                  <input 
                    type="text" 
                    value={customerFormData.name}
                    onChange={(e) => setCustomerFormData({...customerFormData, name: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    placeholder="Enter customer name" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    value={customerFormData.phone}
                    onChange={(e) => setCustomerFormData({...customerFormData, phone: e.target.value.replace(/[^0-9]/g, '')})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    placeholder="Enter phone number" 
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input 
                    type="text" 
                    value={customerFormData.gst}
                    onChange={(e) => setCustomerFormData({...customerFormData, gst: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    placeholder="Enter GST number" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <textarea 
                    value={customerFormData.address}
                    onChange={(e) => setCustomerFormData({...customerFormData, address: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" 
                    rows="3" 
                    placeholder="Enter complete address"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={executeAction}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                >
                  {pendingAction === 'print' && '🖨️ Print'}
                  {pendingAction === 'save' && '💾 Save'}
                  {pendingAction === 'preview' && '👁️ Preview'}
                  {pendingAction === 'send' && '📤 Send'}
                </button>
                <button 
                  onClick={() => setShowCustomerPopup(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBill;