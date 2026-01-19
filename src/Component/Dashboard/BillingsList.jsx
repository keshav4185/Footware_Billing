import React from 'react';
import { createPortal } from 'react-dom';
import { invoiceAPI } from '../../services/api';

const BillingsList = ({ isDarkMode, onEditBill }) => {
  const [billSearchTerm, setBillSearchTerm] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);
  const [selectedBill, setSelectedBill] = React.useState(null);
  const [showExchange, setShowExchange] = React.useState(false);
  const [exchangeBill, setExchangeBill] = React.useState(null);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const [invoices, setInvoices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [updateBill, setUpdateBill] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [companyLogo, setCompanyLogo] = React.useState(null);
  const [digitalSignature, setDigitalSignature] = React.useState(null);

  // Fetch complete invoice data with all related entities
  const fetchCompleteInvoiceData = async (invoiceId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/billing/invoice/${invoiceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const invoice = await response.json();
      
      // Fetch company details separately using company ID
      let companyDetails = {
        name: 'Smart Sales',
        address: '123 Business Street, City - 400001',
        phone: '+91 98765 43210',
        gst: '27XXXXX1234X1ZX',
        brands: 'RELAXO adidas Bata Paragon FILA campus'
      };
      
      if (invoice.company?.id) {
        try {
          const companyResponse = await fetch(`http://localhost:8080/api/billing/company/${invoice.company.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (companyResponse.ok) {
            const company = await companyResponse.json();
            companyDetails = {
              id: company.id,
              name: company.name || 'Smart Sales',
              address: company.address || '123 Business Street, City - 400001',
              phone: company.phone || '+91 98765 43210',
              gst: company.gst || '27XXXXX1234X1ZX',
              brands: company.brands || 'RELAXO adidas Bata Paragon FILA campus'
            };
          }
        } catch (companyError) {
          console.error('Error fetching company details:', companyError);
        }
      }
      
        // Use totalAmount directly from backend if available
        const calculatedAmount = invoice.totalAmount || invoice.grandTotal || 0;
        
        return {
          id: invoice.id,
          invoiceNo: invoice.invoiceNumber || `INV-${invoice.id}`,
          customerName: invoice.customer?.name || 'N/A',
          customerPhone: invoice.customer?.phone || 'N/A',
          customerGst: invoice.customer?.gst || 'N/A',
          customerAddress: invoice.customer?.address || 'N/A',
          date: invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : new Date().toLocaleDateString(),
          amount: calculatedAmount,
          status: 'Completed',
          paymentStatus: (invoice.paymentStatus === 'PAID' || invoice.paymentStatus === 'Paid' || (invoice.balanceAmount || 0) === 0) ? 'Paid' : 'Unpaid',
          items: invoice.items || [],
          totals: {
            subtotal: invoice.subTotal || 0,
            grandTotal: calculatedAmount,
            balanceAmount: invoice.balanceAmount || 0,
            advanceAmount: invoice.advanceAmount || 0,
            cgstAmount: invoice.cgstAmount || 0,
            sgstAmount: invoice.sgstAmount || 0,
            totalDiscount: invoice.totalDiscount || 0
          },
          company: companyDetails,
          employeeName: invoice.employee?.name || 'Sales Person'
        };
    } catch (error) {
      console.error('Error fetching complete invoice data:', error);
      return null;
    }
  };

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/billing/invoices', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response text:', responseText);
        throw new Error('Invalid JSON response from server');
      }
      
      console.log('Parsed data:', data);
      
      // Handle different response formats
      let invoicesArray = [];
      if (Array.isArray(data)) {
        invoicesArray = data;
      } else if (data && Array.isArray(data.content)) {
        invoicesArray = data.content;
      } else if (data && Array.isArray(data.invoices)) {
        invoicesArray = data.invoices;
      } else {
        console.error('Unexpected response format:', data);
        invoicesArray = [];
      }
      
      // Fetch company details for each invoice
      const apiInvoices = await Promise.all(invoicesArray.map(async (invoice) => {
        let companyDetails = {
          name: 'Smart Sales',
          address: '123 Business Street, City - 400001',
          phone: '+91 98765 43210',
          gst: '27XXXXX1234X1ZX',
          brands: 'RELAXO adidas Bata Paragon FILA campus'
        };
        
        // Fetch company details if company ID exists
        if (invoice.company?.id) {
          try {
            const companyResponse = await fetch(`http://localhost:8080/api/billing/company/${invoice.company.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            if (companyResponse.ok) {
              const company = await companyResponse.json();
              companyDetails = {
                id: company.id,
                name: company.name || 'Smart Sales',
                address: company.address || '123 Business Street, City - 400001',
                phone: company.phone || '+91 98765 43210',
                gst: company.gst || '27XXXXX1234X1ZX',
                brands: company.brands || 'RELAXO adidas Bata Paragon FILA campus'
              };
            }
          } catch (companyError) {
            console.error('Error fetching company details for invoice:', invoice.id, companyError);
          }
        }
        
        // Use totalAmount directly from backend if available
        const calculatedAmount = invoice.totalAmount || invoice.grandTotal || 0;
        
        return {
          id: invoice.id,
          invoiceNo: invoice.invoiceNumber || `INV-${invoice.id}`,
          customerName: invoice.customer?.name || 'N/A',
          customerPhone: invoice.customer?.phone || 'N/A',
          customerGst: invoice.customer?.gst || 'N/A',
          customerAddress: invoice.customer?.address || 'N/A',
          date: invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : new Date().toLocaleDateString(),
          amount: calculatedAmount,
          status: 'Completed',
          paymentStatus: (invoice.paymentStatus === 'PAID' || invoice.paymentStatus === 'Paid' || (invoice.balanceAmount || 0) === 0) ? 'Paid' : 'Unpaid',
          items: invoice.items || [],
          totals: {
            subtotal: invoice.subTotal || 0,
            grandTotal: calculatedAmount,
            balanceAmount: invoice.balanceAmount || 0,
            advanceAmount: invoice.advanceAmount || 0,
            cgstAmount: invoice.cgstAmount || 0,
            sgstAmount: invoice.sgstAmount || 0,
            totalDiscount: invoice.totalDiscount || 0
          },
          companyId: invoice.company?.id,
          customerId: invoice.customer?.id,
          company: companyDetails,
          employeeName: invoice.employee?.name || 'N/A'
        };
      }));
      
      console.log('Mapped invoices with company details:', apiInvoices);
      // Sort by ID descending (newest first)
      setInvoices(apiInvoices.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Error fetching invoices:', error);
      // Fallback to localStorage
      const savedBills = JSON.parse(localStorage.getItem('billings') || '[]');
      setInvoices(savedBills);
    } finally {
      setLoading(false);
    }
  };

  // Update invoice
  const handleUpdateBill = (bill) => {
    setUpdateBill(bill);
    setShowUpdateModal(true);
    setOpenDropdown(null);
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
    const afterDiscount = subtotal * (1 - (product.discount || 0)/100);
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
                <strong>GST:</strong> ${billData.customerGst || 'N/A'}<br>
                <strong>Address:</strong> ${billData.customerAddress || 'N/A'}
              </div>
            </div>
            <div class="invoice-info">
              <table class="invoice-info-table">
                <tr><td>Invoice No.:</td><td>${billData.invoiceNo}</td></tr>
                <tr><td>Invoice Date:</td><td>${billData.date}</td></tr>
                <tr><td>Salesperson:</td><td><strong>${employeeName}</strong></td></tr>
                <tr><td>Payment Method:</td><td><span class="payment-method">💵 Cash</span></td></tr>
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
        const response = await fetch(`http://localhost:8080/api/billing/invoice/${billId}`, {
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
  const savedBills = invoices;
  const filteredBills = savedBills.filter(bill => {
    const matchesSearch = bill.invoiceNo.toLowerCase().includes(billSearchTerm.toLowerCase()) ||
      bill.customerName.toLowerCase().includes(billSearchTerm.toLowerCase()) ||
      bill.customerPhone.includes(billSearchTerm) ||
      bill.amount.toString().includes(billSearchTerm);
    
    const matchesDate = !selectedDate || bill.date === new Date(selectedDate).toLocaleDateString();
    
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
      
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 backdrop-blur-sm bg-white/90 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 transform hover:scale-[1.01] border border-gray-100 relative z-10">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">📄</span> My Billings
              </h2>
              <p className="text-sm text-gray-600">View and manage your billing history</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input 
                  type="date" 
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">📅</span>
              </div>
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  placeholder="Search bills..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  value={billSearchTerm}
                  onChange={(e) => setBillSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>
          </div>
          {selectedDate && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Showing bills for: <strong>{new Date(selectedDate).toLocaleDateString()}</strong></span>
              <button 
                onClick={() => setSelectedDate('')}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-lg">Loading invoices...</p>
          </div>
        ) : filteredBills.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-lg">{billSearchTerm ? 'No bills found matching your search.' : 'No bills found. Create your first bill!'}</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto backdrop-blur-sm bg-white/50 rounded-lg p-4 hover:bg-white/70 transition-all duration-300">
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
                      <td className="p-4 font-medium text-blue-600 cursor-pointer hover:text-blue-800 hover:underline" onClick={() => onEditBill && onEditBill({...bill, isEdit: true})}>{bill.invoiceNo}</td>
                      <td className="p-4 text-gray-800">{bill.customerName}</td>
                      <td className="p-4 text-gray-600">{bill.date}</td>
                      <td className="p-4 font-semibold text-green-600">₹{bill.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {bill.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          (bill.paymentStatus || 'Unpaid') === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {(bill.paymentStatus || 'Unpaid') === 'Paid' ? '✅' : '❌'} {bill.paymentStatus || 'Unpaid'}
                        </span>
                      </td>
                      <td className="p-4 text-center relative dropdown-container">
                        <button 
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 mx-auto ${
                            isDarkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                          onClick={() => toggleDropdown(bill.id)}
                        >
                          Actions ⋮
                        </button>
                        {openDropdown === bill.id && (
                          <div className={`absolute right-4 top-12 rounded-lg shadow-lg min-w-32 ${
                            isDarkMode 
                              ? 'bg-gray-800 border border-gray-600 text-white' 
                              : 'bg-white border border-gray-200 text-gray-800'
                          }`} style={{zIndex: 1000}}>
                            <button 
                              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                                isDarkMode 
                                  ? 'hover:bg-gray-700 text-white' 
                                  : 'hover:bg-gray-50 text-gray-800'
                              }`}
                              onClick={() => { viewBill(bill); setOpenDropdown(null); }}
                            >
                              👁️ View
                            </button>
                            <button 
                              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                                isDarkMode 
                                  ? 'hover:bg-gray-700 text-white' 
                                  : 'hover:bg-gray-50 text-gray-800'
                              }`}
                              onClick={() => { printBill(bill); setOpenDropdown(null); }}
                            >
                              🖨️ Print
                            </button>
                            <button 
                              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-red-500 hover:text-red-400 border-t ${
                                isDarkMode 
                                  ? 'hover:bg-gray-700 border-gray-600' 
                                  : 'hover:bg-red-50 border-gray-200'
                              }`}
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
              {filteredBills.map((bill, index) => (
                <div key={bill.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-200/30 animate-slideInUp group" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-blue-600 cursor-pointer hover:text-blue-800 hover:underline" onClick={() => onEditBill && onEditBill({...bill, isEdit: true})}>{bill.invoiceNo}</h3>
                      <p className="text-gray-800 font-medium">{bill.customerName}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {bill.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        (bill.paymentStatus || 'Unpaid') === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <span>{(bill.paymentStatus || 'Unpaid') === 'Paid' ? '✅' : '❌'}</span> {bill.paymentStatus || 'Unpaid'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 text-sm">{bill.date}</span>
                    <span className="font-bold text-green-600">₹{bill.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      onClick={() => viewBill(bill)}
                    >
                      👁️ View
                    </button>
                    <button 
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded text-sm hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      onClick={() => printBill(bill)}
                    >
                      🖨️ Print
                    </button>
                    <button 
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded text-sm hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
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
          <div className={`rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto m-2 md:m-4 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`} onClick={(e) => e.stopPropagation()}>
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  <span className="text-2xl">🔄</span> Exchange Product
                </h3>
                <button onClick={() => setShowExchange(false)} className={`text-2xl transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}>
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Bill Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className={`font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
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
                  <h4 className={`font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>Exchange Details</h4>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Exchange Product</label>
                    <input 
                      type="text" 
                      placeholder="Enter new product name"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>New Amount</label>
                    <input 
                      type="number" 
                      placeholder="Enter new amount"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Exchange Reason</label>
                    <textarea 
                      placeholder="Reason for exchange"
                      rows="3"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                      }`}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Difference Amount</label>
                    <input 
                      type="number" 
                      placeholder="Amount difference (+/-)"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{zIndex: 999999}} onClick={() => setShowUpdateModal(false)}>
          <div className={`rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto m-2 md:m-4 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`} onClick={(e) => e.stopPropagation()}>
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  <span className="text-2xl">✏️</span> Update Invoice
                </h3>
                <button onClick={() => setShowUpdateModal(false)} className={`text-2xl transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}>
                  ×
                </button>
              </div>
              
              <div className="space-y-4 update-form">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Invoice Number</label>
                  <input 
                    name="invoiceNumber"
                    type="text" 
                    defaultValue={updateBill.invoiceNo}
                    className={`w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
                    }`}
                    placeholder="Invoice number" 
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Customer Name</label>
                  <input 
                    name="customerName"
                    type="text" 
                    defaultValue={updateBill.customerName}
                    className={`w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
                    }`}
                    placeholder="Customer name" 
                    readOnly
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Amount</label>
                  <input 
                    name="amount"
                    type="number" 
                    defaultValue={updateBill.amount}
                    className={`w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
                    }`}
                    placeholder="Amount" 
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Payment Status</label>
                  <select 
                    name="paymentStatus"
                    defaultValue={updateBill.paymentStatus}
                    className={`w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${
                      isDarkMode 
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
                  onClick={() => {
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{zIndex: 999999}} onClick={() => setShowPreview(false)}>
          <div className={`rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto m-2 md:m-4 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`} onClick={(e) => e.stopPropagation()}>
            <div className="p-3 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className={`text-lg md:text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  <span className="text-xl md:text-2xl">👁️</span> Invoice Preview
                </h3>
                <button onClick={() => setShowPreview(false)} className={`text-xl md:text-2xl transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}>
                  ×
                </button>
              </div>
              
              {/* Invoice Preview Content */}
              <div className="border border-gray-300 md:border-2 rounded-lg p-3 md:p-6 bg-white text-xs md:text-sm">
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
                      <p className="text-xs md:text-sm text-gray-600">
                        {selectedBill.company?.address || '123 Business Street, City - 400001'}<br/>
                        Phone: {selectedBill.company?.phone || '+91 98765 43210'}<br/>
                        GST: {selectedBill.company?.gst || '27XXXXX1234X1ZX'}
                      </p>
                      <p className="text-xs md:text-sm font-medium mt-2">{selectedBill.company?.brands || 'RELAXO adidas Bata Paragon FILA campus'}</p>
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
                        <span className="font-bold">Salesperson:</span>
                        <span className="font-semibold text-blue-600">{localStorage.getItem('loggedInEmployee') || selectedBill.employeeName || 'Sales Person'}</span>
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
                  {selectedBill.items && selectedBill.items.length > 0 ? (
                    selectedBill.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-3 mb-2 rounded border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{index + 1}. {item.itemName || item.productName || item.product?.name || 'Product'}</span>
                          <span className="font-bold">₹{calculateRowAmount(item).toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                          <span>Qty: {item.quantity || 1}</span>
                          <span>Rate: ₹{(item.rate || item.price || 0).toFixed(2)}</span>
                          <span>Disc: {item.discount || 0}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
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
                  )}
                </div>
                
                {/* Products Table - Desktop */}
                <div className="hidden md:block mb-6">
                  <table className="w-full border-collapse border-2 border-black">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-black p-2 text-sm">Sr. No.</th>
                        <th className="border border-black p-2 text-sm">Name of Product/Service</th>
                        <th className="border border-black p-2 text-sm">Qty</th>
                        <th className="border border-black p-2 text-sm">Rate</th>
                        <th className="border border-black p-2 text-sm">Disc. (%)</th>
                        <th className="border border-black p-2 text-sm">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.items && selectedBill.items.length > 0 ? (
                        selectedBill.items.map((item, index) => (
                          <tr key={index}>
                            <td className="border border-black p-2 text-center text-sm">{index + 1}</td>
                            <td className="border border-black p-2 text-sm">{item.itemName || item.productName || item.product?.name || 'Product'}</td>
                            <td className="border border-black p-2 text-center text-sm">{item.quantity || 1}</td>
                            <td className="border border-black p-2 text-center text-sm">₹{(item.rate || item.price || 0).toFixed(2)}</td>
                            <td className="border border-black p-2 text-center text-sm">{item.discount || 0}%</td>
                            <td className="border border-black p-2 text-center text-sm">₹{calculateRowAmount(item).toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="border border-black p-2 text-center text-sm">1</td>
                          <td className="border border-black p-2 text-sm">Service</td>
                          <td className="border border-black p-2 text-center text-sm">1</td>
                          <td className="border border-black p-2 text-center text-sm">₹{selectedBill.amount.toFixed(2)}</td>
                          <td className="border border-black p-2 text-center text-sm">0%</td>
                          <td className="border border-black p-2 text-center text-sm">₹{selectedBill.amount.toFixed(2)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Totals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-gray-50 p-3 md:p-4 rounded">
                    <strong className="block mb-2">Total in words:</strong>
                    <div className="font-bold text-gray-700 text-xs md:text-sm">
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
                            <div className="flex justify-between py-1 border-b">
                              <span>Taxable Amount:</span>
                              <span>₹{calculatedTotals.taxableAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b">
                              <span>Discount:</span>
                              <span>₹{calculatedTotals.totalDiscount.toFixed(2)}</span>
                            </div>
                            {calculatedTotals.cgstAmount > 0 && (
                              <div className="flex justify-between py-1 border-b">
                                <span>CGST (9%):</span>
                                <span>₹{calculatedTotals.cgstAmount.toFixed(2)}</span>
                              </div>
                            )}
                            {calculatedTotals.sgstAmount > 0 && (
                              <div className="flex justify-between py-1 border-b">
                                <span>SGST (9%):</span>
                                <span>₹{calculatedTotals.sgstAmount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between py-2 bg-gray-100 px-3 font-bold text-sm md:text-lg border border-black md:border-2">
                              <span>Total Amount:</span>
                              <span>₹{calculatedTotals.grandTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b">
                              <span>Paid Amount:</span>
                              <span>₹{(selectedBill.totals?.advanceAmount || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2 bg-orange-100 px-3 font-bold text-sm md:text-lg border border-orange-300">
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
                  <div className="text-right relative" style={{minHeight: '100px', paddingTop: '20px'}}>
                    {digitalSignature && (
                      <img src={digitalSignature} alt="Signature" className="w-32 h-16 object-contain absolute top-0 right-8" />
                    )}
                    <div className="border-t border-black pt-2 font-bold text-xs md:text-sm inline-block min-w-[200px]" style={{marginTop: '60px'}}>
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