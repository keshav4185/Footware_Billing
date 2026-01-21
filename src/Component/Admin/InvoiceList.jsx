import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import axios from "axios";

const InvoiceList = ({ bills, setBills }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [digitalSignature, setDigitalSignature] = useState(null);

  // Fetch invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("https://backend-billing-software-ahxt.onrender.com/api/billing/invoices");
        setBills(
          res.data.sort(
            (a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate)
          )
        );
      } catch (err) {
        console.error("Error fetching invoices", err);
      }
    };
    fetchInvoices();
    
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) setCompanyLogo(savedLogo);
    
    const savedSignature = localStorage.getItem('digitalSignature');
    if (savedSignature) setDigitalSignature(savedSignature);
  }, [setBills]);

  // Delete invoice
  const deleteInvoice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;

    try {
      await axios.delete(
        `https://backend-billing-software-ahxt.onrender.com/api/billing/invoice/${id}`
      );
      setBills(bills.filter((bill) => bill.id !== id));
      alert("Invoice deleted successfully");
    } catch (err) {
      alert("Failed to delete invoice");
    }
  };

  const filteredBills = bills.filter((bill) => {
    const search = searchTerm.toLowerCase();
    return (
      bill.invoiceNumber?.toLowerCase().includes(search) ||
      bill.customer?.name?.toLowerCase().includes(search) ||
      bill.customer?.phone?.toString().includes(search)
    );
  });

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

  const calculateRowAmount = (item) => {
    const unitPrice = item.rate || item.price;
    const subtotal = item.quantity * unitPrice;
    const afterDiscount = subtotal * (1 - (item.discount || 0)/100);
    return afterDiscount;
  };

  // Print invoice
  const printInvoice = () => {
    const bill = selectedInvoice;
    const calculatedTotals = {
      subtotal: bill.subTotal || bill.totalAmount,
      totalDiscount: bill.totalDiscount || 0,
      taxableAmount: (bill.subTotal || bill.totalAmount) - (bill.totalDiscount || 0),
      cgstAmount: bill.cgstAmount || 0,
      sgstAmount: bill.sgstAmount || 0,
      grandTotal: bill.totalAmount,
      balanceAmount: bill.balanceAmount
    };
    
    const productsHTML = bill.items && bill.items.length > 0
      ? bill.items.map((item, index) => 
          `<tr>
            <td class="border border-black p-2 text-center text-sm">${index + 1}</td>
            <td class="border border-black p-2 text-sm">${item.product?.name || item.itemName || 'Product'}</td>
            <td class="border border-black p-2 text-center text-sm">${item.quantity || 1}</td>
            <td class="border border-black p-2 text-center text-sm">₹${(item.rate || item.price || 0).toFixed(2)}</td>
            <td class="border border-black p-2 text-center text-sm">${item.discount || 0}%</td>
            <td class="border border-black p-2 text-center text-sm">₹${calculateRowAmount(item).toFixed(2)}</td>
          </tr>`
        ).join('')
      : `<tr>
          <td class="border border-black p-2 text-center text-sm">1</td>
          <td class="border border-black p-2 text-sm">Service</td>
          <td class="border border-black p-2 text-center text-sm">1</td>
          <td class="border border-black p-2 text-center text-sm">₹${bill.totalAmount.toFixed(2)}</td>
          <td class="border border-black p-2 text-center text-sm">0%</td>
          <td class="border border-black p-2 text-center text-sm">₹${bill.totalAmount.toFixed(2)}</td>
        </tr>`;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
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
      </style>
      </head>
      <body onload="window.print()">
        <div class="invoice-container">
          <div class="header-section">
            <div class="logo-section">
              <div class="logo-box">${companyLogo ? `<img src="${companyLogo}" alt="Logo" style="width:100%;height:100%;object-fit:contain;">` : 'YOUR<br>LOGO'}</div>
              <div class="company-info">
                <div class="company-name">${bill.company?.name || 'Smart Sales'}</div>
                <div class="company-details">${bill.company?.address || '123 Business Street'}<br>Phone: ${bill.company?.phone || '+91 98765 43210'}</div>
              </div>
            </div>
            <div class="invoice-title">INVOICE</div>
          </div>
          <div class="tax-header">TAX INVOICE</div>
          <div class="bill-details">
            <div class="bill-to">
              <h3>BILL TO:</h3>
              <div class="customer-details">
                <strong>Name:</strong> ${bill.customer?.name}<br>
                <strong>Phone:</strong> ${bill.customer?.phone}<br>
                <strong>Address:</strong> ${bill.customer?.address || 'N/A'}
              </div>
            </div>
            <div class="invoice-info">
              <table class="invoice-info-table">
                <tr><td>Invoice No.:</td><td>${bill.invoiceNumber}</td></tr>
                <tr><td>Invoice Date:</td><td>${new Date(bill.invoiceDate).toLocaleDateString()}</td></tr>
                <tr><td>Payment Method:</td><td><span class="payment-method">💵 Cash</span></td></tr>
                <tr><td>Payment Status:</td><td><span class="payment-status">${bill.paymentStatus || 'Unpaid'}</span></td></tr>
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
              <div class="amount-row"><span>Paid Amount:</span><span>₹${(bill.advanceAmount || 0).toFixed(2)}</span></div>
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
    printWindow.document.close();
  };

  useEffect(() => {
    document.body.style.overflow = selectedInvoice ? "hidden" : "auto";
  }, [selectedInvoice]);

  return (
    <>
      {/* Search */}
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="mb-4 max-w-md">
          <input
            type="text"
            placeholder="Search Invoice / Name / Mobile"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Invoice No</th>
                <th className="px-3 py-2 text-left">Customer</th>
                <th className="px-3 py-2 text-left">Mobile</th>
                <th className="px-3 py-2 text-left">Company</th>
                <th className="px-3 py-2 text-left">Total</th>
                <th className="px-3 py-2 text-left">Advance</th>
                <th className="px-3 py-2 text-left">Balance</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-2">{bill.invoiceNumber}</td>
                  <td className="px-3 py-2">{bill.customer?.name}</td>
                  <td className="px-3 py-2">{bill.customer?.phone}</td>
                  <td className="px-3 py-2">
                    {bill.company?.name || "-"}
                  </td>
                  <td className="px-3 py-2 font-medium">
                    ₹{bill.totalAmount}
                  </td>
                  <td className="px-3 py-2">
                    ₹{bill.advanceAmount || 0}
                  </td>
                  <td
                    className={`px-3 py-2 font-semibold ${
                      bill.balanceAmount === 0
                        ? "text-green-600"
                        : bill.balanceAmount < bill.totalAmount
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    ₹{bill.balanceAmount}
                  </td>
                  <td className="px-3 py-2 flex gap-3">
                    <button
                      onClick={() => setSelectedInvoice(bill)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => { setSelectedInvoice(bill); setTimeout(printInvoice, 100); }}
                      className="text-green-600 hover:underline"
                    >
                      Print
                    </button>
                    <button
                      onClick={() => deleteInvoice(bill.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBills.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredBills.map((bill) => (
            <div
              key={bill.id}
              className="bg-white rounded-lg shadow-sm border p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-blue-600">
                    {bill.invoiceNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    {bill.customer?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {bill.customer?.phone}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    bill.balanceAmount === 0
                      ? "bg-green-100 text-green-600"
                      : bill.balanceAmount < bill.totalAmount
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  ₹{bill.balanceAmount} Due
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Total:</span>
                  <span className="font-medium ml-1">₹{bill.totalAmount}</span>
                </div>
                <div>
                  <span className="text-gray-500">Advance:</span>
                  <span className="font-medium ml-1">₹{bill.advanceAmount || 0}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedInvoice(bill)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => { setSelectedInvoice(bill); setTimeout(printInvoice, 100); }}
                  className="flex-1 bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600"
                >
                  Print
                </button>
                <button
                  onClick={() => deleteInvoice(bill.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filteredBills.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No invoices found
            </div>
          )}
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => setSelectedInvoice(null)}>
          <div className="bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-xl p-6 relative m-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 text-2xl hover:text-gray-700"
            >
              ×
            </button>

            <div className="border border-gray-300 md:border-2 rounded-lg p-3 md:p-6 bg-white text-xs md:text-sm">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 pb-3 md:pb-4 border-b border-black md:border-b-2">
                <div className="flex items-start w-full md:w-auto mb-3 md:mb-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xs font-bold mr-3 md:mr-4">
                    {companyLogo ? <img src={companyLogo} alt="Logo" className="w-full h-full object-contain" /> : 'YOUR LOGO'}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-lg md:text-xl font-bold">{selectedInvoice.company?.name || 'Smart Sales'}</h1>
                    <p className="text-xs md:text-sm text-gray-600">
                      {selectedInvoice.company?.address || '123 Business Street'}<br/>
                      Phone: {selectedInvoice.company?.phone || '+91 98765 43210'}
                    </p>
                  </div>
                </div>
                <div className="text-left md:text-right w-full md:w-auto">
                  <h2 className="text-xl md:text-2xl font-bold">INVOICE</h2>
                </div>
              </div>
              
              <div className="bg-black text-white text-center py-2 mb-4 font-bold text-sm md:text-lg">TAX INVOICE</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="bg-gray-50 p-3 md:p-4 rounded">
                  <h3 className="font-bold mb-2 md:mb-3 border-b pb-1 md:pb-2">BILL TO:</h3>
                  <div className="text-xs md:text-sm space-y-1">
                    <p><strong>Name:</strong> {selectedInvoice.customer?.name}</p>
                    <p><strong>Phone:</strong> {selectedInvoice.customer?.phone}</p>
                    <p><strong>Address:</strong> {selectedInvoice.customer?.address || 'N/A'}</p>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between"><span className="font-bold">Invoice No.:</span><span>{selectedInvoice.invoiceNumber}</span></div>
                    <div className="flex justify-between"><span className="font-bold">Invoice Date:</span><span>{new Date(selectedInvoice.invoiceDate).toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span className="font-bold">Payment Status:</span><span className={`px-2 py-1 rounded text-xs font-bold ${selectedInvoice.paymentStatus === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{selectedInvoice.paymentStatus || 'Unpaid'}</span></div>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block mb-6">
                <table className="w-full border-collapse border-2 border-black">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-black p-2 text-sm">Sr. No.</th>
                      <th className="border border-black p-2 text-sm">Product/Service</th>
                      <th className="border border-black p-2 text-sm">Qty</th>
                      <th className="border border-black p-2 text-sm">Rate</th>
                      <th className="border border-black p-2 text-sm">Disc. (%)</th>
                      <th className="border border-black p-2 text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items && selectedInvoice.items.length > 0 ? (
                      selectedInvoice.items.map((item, index) => (
                        <tr key={index}>
                          <td className="border border-black p-2 text-center text-sm">{index + 1}</td>
                          <td className="border border-black p-2 text-sm">{item.product?.name || item.itemName || 'Product'}</td>
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
                        <td className="border border-black p-2 text-center text-sm">₹{selectedInvoice.totalAmount.toFixed(2)}</td>
                        <td className="border border-black p-2 text-center text-sm">0%</td>
                        <td className="border border-black p-2 text-center text-sm">₹{selectedInvoice.totalAmount.toFixed(2)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gray-50 p-3 md:p-4 rounded">
                  <strong className="block mb-2">Total in words:</strong>
                  <div className="font-bold text-gray-700 text-xs md:text-sm">{convertToWords(Math.round(selectedInvoice.totalAmount))}</div>
                </div>
                <div>
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between py-1 border-b"><span>Taxable Amount:</span><span>₹{((selectedInvoice.subTotal || selectedInvoice.totalAmount) - (selectedInvoice.totalDiscount || 0)).toFixed(2)}</span></div>
                    <div className="flex justify-between py-1 border-b"><span>Discount:</span><span>₹{(selectedInvoice.totalDiscount || 0).toFixed(2)}</span></div>
                    {selectedInvoice.cgstAmount > 0 && <div className="flex justify-between py-1 border-b"><span>CGST (9%):</span><span>₹{selectedInvoice.cgstAmount.toFixed(2)}</span></div>}
                    {selectedInvoice.sgstAmount > 0 && <div className="flex justify-between py-1 border-b"><span>SGST (9%):</span><span>₹{selectedInvoice.sgstAmount.toFixed(2)}</span></div>}
                    <div className="flex justify-between py-2 bg-gray-100 px-3 font-bold text-sm md:text-lg border border-black md:border-2"><span>Total Amount:</span><span>₹{selectedInvoice.totalAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between py-1 border-b"><span>Paid Amount:</span><span>₹{(selectedInvoice.advanceAmount || 0).toFixed(2)}</span></div>
                    <div className="flex justify-between py-2 bg-orange-100 px-3 font-bold text-sm md:text-lg border border-orange-300"><span>Balance Amount:</span><span>₹{selectedInvoice.balanceAmount.toFixed(2)}</span></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-black md:border-t-2">
                <div className="text-right relative" style={{minHeight: '100px', paddingTop: '20px'}}>
                  {digitalSignature && <img src={digitalSignature} alt="Signature" className="w-32 h-16 object-contain absolute top-0 right-8" />}
                  <div className="border-t border-black pt-2 font-bold text-xs md:text-sm inline-block min-w-[200px]" style={{marginTop: '60px'}}>Authorized Signature</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setSelectedInvoice(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Close</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default InvoiceList;
