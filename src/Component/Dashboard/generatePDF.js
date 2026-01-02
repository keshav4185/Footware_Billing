import jsPDF from 'jspdf';

export const generatePDF = async (customerData, products, totals, convertToWords) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Company Header
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SMART SALES', 105, 20, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('123 Business Street, City - 400001', 105, 30, { align: 'center' });
    pdf.text('GST: 27XXXXX1234X1ZX', 105, 37, { align: 'center' });
    
    // Invoice Title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TAX INVOICE', 105, 50, { align: 'center' });
    
    // Customer Details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Bill To:', 20, 65);
    
    pdf.setFont('helvetica', 'normal');
    pdf.text(customerData.name || 'Customer Name', 20, 75);
    pdf.text(customerData.phone || 'Phone Number', 20, 82);
    pdf.text(customerData.gst || 'GST Number', 20, 89);
    
    const addressLines = (customerData.address || 'Address').split('\n');
    let yPos = 96;
    addressLines.forEach(line => {
      pdf.text(line, 20, yPos);
      yPos += 7;
    });
    
    // Invoice Details
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 140, 75);
    pdf.text(`Invoice #: INV-${Date.now().toString().slice(-6)}`, 140, 82);
    
    // Table Header
    const tableY = 120;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Item', 20, tableY);
    pdf.text('Qty', 80, tableY);
    pdf.text('Price', 110, tableY);
    pdf.text('Disc%', 140, tableY);
    pdf.text('Amount', 170, tableY);
    
    // Table Line
    pdf.line(20, tableY + 3, 190, tableY + 3);
    
    // Products
    pdf.setFont('helvetica', 'normal');
    let currentY = tableY + 15;
    products.forEach((product, index) => {
      if (product.name) {
        const rowAmount = (product.qty * product.price) * (1 - product.discount/100) * (1 + product.tax/100);
        pdf.text(product.name, 20, currentY);
        pdf.text(product.qty.toString(), 80, currentY);
        pdf.text(`₹${product.price.toFixed(2)}`, 110, currentY);
        pdf.text(`${product.discount}%`, 140, currentY);
        pdf.text(`₹${rowAmount.toFixed(2)}`, 170, currentY);
        currentY += 10;
      }
    });
    
    // Total Section
    const totalY = currentY + 20;
    pdf.line(20, totalY, 190, totalY);
    
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Subtotal: ₹${totals.subtotal.toFixed(2)}`, 140, totalY + 10);
    pdf.text(`Discount: ₹${totals.totalDiscount.toFixed(2)}`, 140, totalY + 17);
    pdf.text(`CGST: ₹${totals.cgstAmount.toFixed(2)}`, 140, totalY + 24);
    pdf.text(`SGST: ₹${totals.sgstAmount.toFixed(2)}`, 140, totalY + 31);
    pdf.text(`Total: ₹${totals.grandTotal.toFixed(2)}`, 140, totalY + 38);
    
    // Amount in words
    pdf.setFontSize(10);
    pdf.text(`Amount in words: ${convertToWords(Math.round(totals.grandTotal))}`, 20, totalY + 50);
    
    // Footer
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Thank you for your business!', 105, 250, { align: 'center' });
    
    // Save PDF
    pdf.save(`invoice-${Date.now()}.pdf`);
    return true;
    
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};