import React from 'react';

const CreateBill = ({ isDarkMode }) => {
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

  const validateBasicForm = () => {
    if (!customerFormData.name.trim()) {
      alert('Customer name is required!');
      return false;
    }
    if (!products.some(p => p.name.trim())) {
      alert('Please add at least one product!');
      return false;
    }
    return true;
  };
  
  const handleAction = (action) => {
    if (!validateBasicForm()) return;
    
    if (action === 'print') openDirectPrintPreview();
    else if (action === 'preview') setShowPreview(true);
    else if (action === 'save') saveBill();
    else if (action === 'send') alert('📧 Bill sent successfully!');
  };
  
  const saveBill = () => {
    try {
      const billData = {
        id: Date.now(),
        customer: customerFormData,
        products: products.filter(p => p.name.trim()),
        date: new Date().toISOString(),
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        paymentStatus: 'Unpaid'
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
    
    return { subtotal, totalDiscount, taxableAmount, cgstAmount, sgstAmount, grandTotal };
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
                <tr><td>Payment Method:</td><td><span class="payment-method">💵 Cash</span></td></tr>
                <tr><td>Payment Status:</td><td><span class="payment-status">Unpaid</span></td></tr>
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
              <div class="amount-row total-amount"><span>Total Amount:</span><span>₹${totals.grandTotal.toFixed(2)}</span></div>
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
              <span className="text-2xl">📝</span> Create New Bill
            </h2>
            <p className="text-sm text-gray-600">Generate professional invoices</p>
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
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-lg text-xs font-bold text-center min-w-20">SMART<br/>SALES</div>
                <input type="file" id="logo-upload" accept="image/*" className="hidden" />
                <label htmlFor="logo-upload" className="bg-gray-600 text-white px-3 py-2 rounded-lg text-xs cursor-pointer hover:bg-gray-700 transition-colors">📁 Choose File</label>
                <span className="text-xs text-gray-500">No file chosen</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" defaultValue="Smart Sales" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
              <textarea className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" rows="3" defaultValue="123 Business Street, City - 400001"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
              <input type="text" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" defaultValue="27XXXXX1234X1ZX" />
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
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Untaxed Amount:</span>
            <span className="font-semibold text-gray-800">₹ {calculateTotals().subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Discount Amount:</span>
            <span className="font-semibold text-gray-800">₹ {calculateTotals().totalDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
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
              />%
            </div>
            <span className="font-semibold text-gray-800">₹ {calculateTotals().cgstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
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
              />%
            </div>
            <span className="font-semibold text-gray-800">₹ {calculateTotals().sgstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 border-2 border-blue-200">
            <span className="text-lg font-bold text-blue-800">Total Amount:</span>
            <span className="text-xl font-bold text-blue-800">₹ {calculateTotals().grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">👁️</span> Invoice Preview
                </h3>
                <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              
              {/* Invoice Preview Content */}
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
                {/* Header */}
                <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-black">
                  <div className="flex items-start">
                    <div className="w-16 h-16 border-2 border-black flex items-center justify-center text-xs font-bold mr-4 bg-gray-100">
                      YOUR<br/>LOGO
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">Smart Sales</h1>
                      <p className="text-sm text-gray-600">
                        123 Business Street, City - 400001<br/>
                        Phone: +91 98765 43210<br/>
                        GST: 27XXXXX1234X1ZX
                      </p>
                      <p className="text-sm font-medium mt-2">RELAXO adidas Bata Paragon FILA campus</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-bold">INVOICE</h2>
                  </div>
                </div>
                
                {/* Tax Invoice Header */}
                <div className="bg-black text-white text-center py-2 mb-4 font-bold text-lg">
                  TAX INVOICE
                </div>
                
                {/* Bill Details */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-bold mb-3 border-b pb-2">BILL TO:</h3>
                    <div className="text-sm space-y-1">
                      <p><strong>Name:</strong> {customerFormData.name}</p>
                      <p><strong>Phone:</strong> {customerFormData.phone}</p>
                      <p><strong>GST:</strong> {customerFormData.gst}</p>
                      <p><strong>Address:</strong> {customerFormData.address}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-bold">Invoice No.:</span>
                        <span>INV-{Date.now().toString().slice(-6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Invoice Date:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Payment Method:</span>
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">💵 Cash</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Payment Status:</span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">Unpaid</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Products Table */}
                <div className="mb-6">
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
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded">
                    <strong className="block mb-2">Total in words:</strong>
                    <div className="font-bold text-gray-700">{convertToWords(Math.round(calculateTotals().grandTotal))}</div>
                  </div>
                  <div>
                    <div className="space-y-2 text-sm">
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
                      <div className="flex justify-between py-2 bg-gray-100 px-3 font-bold text-lg border-2 border-black">
                        <span>Total Amount:</span>
                        <span>₹{calculateTotals().grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Signatures */}
                <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t-2 border-black">
                  <div className="text-center">
                    <div className="border-t border-black mt-12 pt-2 font-bold">Owner Signature</div>
                  </div>
                  <div className="text-center">
                    <div className="border-t border-black mt-12 pt-2 font-bold">Customer Signature</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Details Popup */}
      {showCustomerPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
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