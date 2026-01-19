import React from 'react';
import { createPortal } from 'react-dom';
import { customerAPI, productAPI, invoiceAPI, paymentAPI, companyAPI } from '../../services/api';
import { 
  FaFileInvoice, 
  FaPaperPlane, 
  FaPrint, 
  FaSave, 
  FaEye, 
  FaUser, 
  FaBuilding, 
  FaBox, 
  FaCalculator,
  FaPlus,
  FaTimes
} from 'react-icons/fa';

const CreateBill = ({ isDarkMode, editingBill, selectedCustomer }) => {
  const [showCustomerPopup, setShowCustomerPopup] = React.useState(false);
  const [pendingAction, setPendingAction] = React.useState(null);
  const [customerFormData, setCustomerFormData] = React.useState({
    name: '', phone: '', gst: '', address: ''
  });
  const [products, setProducts] = React.useState([
    { id: 1, name: '', qty: 1, price: 0, discount: 0 }
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
  const [digitalSignature, setDigitalSignature] = React.useState(null);
  const [customers, setCustomers] = React.useState([]);
  const [apiProducts, setApiProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [companyId, setCompanyId] = React.useState(null);
  const [invoiceDate, setInvoiceDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [companyDetails, setCompanyDetails] = React.useState({
    name: 'SMARTMATRIX Digital Services ',
    address: ' First Floor, Survey No. 21, Ganesham Commercial -A, Office No, 102-A, Aundh - Ravet BRTS Rd, Pimple Saudagar, Pune, Maharashtra 411027',
    phone: '9112108484',
    gst: '27XXXXX1234X1ZX',
    brands: 'RELAXO adidas Bata Paragon FILA campus'
  });

  // Comprehensive validation criteria
  const validateBasicForm = () => {
    // Product validation criteria
    if (!products.some(p => p.name.trim())) {
      alert('❌ Validation Error: Please add at least one product!');
      return false;
    }
    
    // Check for valid product details
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.name.trim()) {
        if (product.qty <= 0) {
          alert(`❌ Validation Error: Product "${product.name}" must have quantity greater than 0!`);
          return false;
        }
        if (product.price <= 0) {
          alert(`❌ Validation Error: Product "${product.name}" must have price greater than 0!`);
          return false;
        }
        if (product.discount < 0 || product.discount > 100) {
          alert(`❌ Validation Error: Product "${product.name}" discount must be between 0-100%!`);
          return false;
        }
      }
    }
    
    // Tax rate validation criteria
    if (cgstEnabled && (cgstRate < 0 || cgstRate > 9)) {
      alert('❌ Validation Error: CGST rate must be between 0-9%!');
      return false;
    }
    
    if (sgstEnabled && (sgstRate < 0 || sgstRate > 9)) {
      alert('❌ Validation Error: SGST rate must be between 0-9%!');
      return false;
    }
    
    // Advance payment validation criteria
    if (advance < 0) {
      alert('❌ Validation Error: Advance amount cannot be negative!');
      return false;
    }
    
    return true;
  };
  
  const validateCustomerForm = () => {
    // Customer name validation criteria
    if (!customerFormData.name.trim()) {
      alert('❌ Validation Error: Customer name is required!');
      return false;
    }
    
    if (customerFormData.name.trim().length < 2) {
      alert('❌ Validation Error: Customer name must be at least 2 characters!');
      return false;
    }
    
    // Check if name contains numbers
    if (/\d/.test(customerFormData.name)) {
      alert('❌ Validation Error: Customer name cannot contain numbers!');
      return false;
    }
    
    // Phone number validation criteria
    if (customerFormData.phone && customerFormData.phone.trim()) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(customerFormData.phone.trim())) {
        alert('❌ Validation Error: Please enter a valid 10-digit Indian mobile number!');
        return false;
      }
    }
    
    return true;
  };
  
  // Input validation handlers
  const handleCustomerNameChange = (e) => {
    const value = e.target.value;
    // Only allow letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCustomerFormData(prev => ({ ...prev, name: value }));
    } else {
      alert('❌ Only letters and spaces are allowed in customer name!');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setCustomerFormData(prev => ({ ...prev, phone: value }));
    } else {
      alert('❌ Only numbers are allowed in phone field (max 10 digits)!');
    }
  };

  const handleCgstChange = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value < 0 || value > 9) {
      alert('❌ CGST rate must be between 0-9%!');
      return;
    }
    setCgstRate(value);
  };

  const handleSgstChange = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value < 0 || value > 9) {
      alert('❌ SGST rate must be between 0-9%!');
      return;
    }
    setSgstRate(value);
  };

  const handleAdvanceChange = (e) => {
    const value = e.target.value;
    // Only allow positive numbers
    if (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0) {
      setAdvance(parseFloat(value) || 0);
    } else {
      alert('❌ Only positive numbers are allowed in advance field!');
    }
  };

  const handleProductPriceChange = (index, value) => {
    // Only allow positive numbers
    if (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0) {
      const updatedProducts = [...products];
      updatedProducts[index].price = parseFloat(value) || 0;
      setProducts(updatedProducts);
    } else {
      alert('❌ Only positive numbers are allowed in price field!');
    }
  };

  const handleProductQtyChange = (index, value) => {
    // Only allow positive integers
    if (/^\d+$/.test(value) && parseInt(value) > 0) {
      const updatedProducts = [...products];
      updatedProducts[index].qty = parseInt(value);
      setProducts(updatedProducts);
    } else {
      alert('❌ Only positive whole numbers are allowed in quantity field!');
    }
  };

  const handleProductDiscountChange = (index, value) => {
    // Only allow numbers between 0-100
    if (/^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      if (numValue >= 0 && numValue <= 100) {
        const updatedProducts = [...products];
        updatedProducts[index].discount = numValue || 0;
        setProducts(updatedProducts);
      } else {
        alert('❌ Discount must be between 0-100%!');
      }
    } else {
      alert('❌ Only numbers are allowed in discount field!');
    }
  };

  // Company details input validation handlers
  const handleCompanyNameChange = (e) => {
    const value = e.target.value;
    // Only allow letters, spaces, and basic business characters
    if (/^[a-zA-Z\s&.-]*$/.test(value)) {
      setCompanyDetails(prev => ({ ...prev, name: value }));
    } else {
      alert('❌ Only letters, spaces, and basic business characters (&.-) are allowed in company name!');
    }
  };

  const handleCompanyPhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setCompanyDetails(prev => ({ ...prev, phone: value }));
    } else {
      alert('❌ Only numbers are allowed in company phone field (max 10 digits)!');
    }
  };

  const handleCompanyGstChange = (e) => {
    const value = e.target.value.toUpperCase();
    // GST format: 2 digits + 5 letters + 4 digits + 1 letter + 1 alphanumeric + Z + 1 alphanumeric
    if (/^[0-9A-Z]{0,15}$/.test(value)) {
      setCompanyDetails(prev => ({ ...prev, gst: value }));
    } else {
      alert('❌ GST number can only contain numbers and letters (max 15 characters)!');
    }
  };

  // Company details validation criteria
  const validateCompanyDetails = () => {
    if (!companyDetails.name.trim()) {
      alert('❌ Validation Error: Company name is required!');
      return false;
    }
    
    if (companyDetails.name.trim().length < 2) {
      alert('❌ Validation Error: Company name must be at least 2 characters!');
      return false;
    }
    
    if (!companyDetails.address.trim()) {
      alert('❌ Validation Error: Company address is required!');
      return false;
    }
    
    if (!companyDetails.phone.trim()) {
      alert('❌ Validation Error: Company phone is required!');
      return false;
    }
    
    // Company phone validation
    if (companyDetails.phone && companyDetails.phone.trim()) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(companyDetails.phone.trim())) {
        alert('❌ Validation Error: Please enter a valid 10-digit Indian mobile number for company!');
        return false;
      }
    }
    
    // Company GST validation
    if (companyDetails.gst && companyDetails.gst.trim()) {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(companyDetails.gst.trim())) {
        alert('❌ Validation Error: Please enter a valid company GST number (15 characters)!');
        return false;
      }
    }
    
    return true;
  };

  const sendInvoice = () => {
    if (!customerFormData.phone) {
      alert('Customer phone number is required to send invoice!');
      return;
    }
    
    const totals = calculateTotals();
    const productsText = products
      .filter(p => p.name.trim())
      .map((p, i) => {
        const subtotal = p.qty * p.price;
        const afterDiscount = subtotal * (1 - p.discount/100);
        return `${i + 1}. ${p.name} - Qty: ${p.qty}, Rate: ₹${p.price.toFixed(2)}, Total: ₹${afterDiscount.toFixed(2)}`;
      })
      .join('\n');
    
    const invoiceText = `🧾 *INVOICE FROM ${companyDetails.name.toUpperCase()}*\n\n` +
      `📋 Invoice No: INV-${Date.now().toString().slice(-6)}\n` +
      `📅 Date: ${new Date(invoiceDate).toLocaleDateString()}\n` +
      `👤 Customer: ${customerFormData.name}\n` +
      `📞 Phone: ${customerFormData.phone}\n\n` +
      `📦 *PRODUCTS:*\n${productsText}\n\n` +
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
    // Apply validation criteria before any action
    if (!validateCompanyDetails()) return;
    if (!validateBasicForm()) return;
    if (!validateCustomerForm()) return;
    
    // Additional validation for specific actions
    if (action === 'send') {
      if (!customerFormData.phone || !customerFormData.phone.trim()) {
        alert('❌ Validation Error: Customer phone number is required to send invoice!');
        return;
      }
    }
    
    if (action === 'print') openDirectPrintPreview();
    else if (action === 'preview') setShowPreview(true);
    else if (action === 'save') saveBillToAPI();
    else if (action === 'send') sendInvoice();
  };
  
  // Save company details to backend
  const saveCompanyToAPI = async () => {
    try {
      const companyData = {
        name: companyDetails.name,
        address: companyDetails.address,
        phone: companyDetails.phone,
        gst: companyDetails.gst,
        brands: companyDetails.brands
      };
      
      const response = await companyAPI.create(companyData);
      setCompanyId(response.data.id);
      console.log('Company saved to backend:', response.data);
    } catch (error) {
      console.error('Error saving company:', error);
    }
  };

  // Load data from API
  const loadCustomers = async () => {
    try {
      const response = await customerAPI.getAll();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setApiProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadCompanyDetails = async () => {
    try {
      const response = await companyAPI.getAll();
      if (response.data && response.data.length > 0) {
        const latestCompany = response.data[response.data.length - 1];
        setCompanyDetails({
          name: latestCompany.name || 'SMARTMATRIX Digital Services ',
          address: latestCompany.address || ' First Floor, Survey No. 21, Ganesham Commercial -A, Office No, 102-A, Aundh - Ravet BRTS Rd, Pimple Saudagar, Pune, Maharashtra 411027',
          phone: latestCompany.phone || '9112108484',
          gst: latestCompany.gst || '27XXXXX1234X1ZX',
          brands: latestCompany.brands || 'RELAXO adidas Bata Paragon FILA campus'
        });
        setCompanyId(latestCompany.id);
      }
    } catch (error) {
      console.error('Error loading company details:', error);
    }
  };

  




  const saveBillToAPI = async () => {
  setLoading(true);

  try {
    // ✅ Get logged-in employee from localStorage
    const employee = JSON.parse(localStorage.getItem("employee"));
    const employeeDbId = employee?.id;     // MUST be DB primary key
    const employeeName = employee?.name || "Sales Person";

    // 🔒 Safety check
    if (!employeeDbId) {
      alert("Employee not logged in or employee ID missing. Please login again.");
      setLoading(false);
      return;
    }

    console.log("Employee object:", employee);
    console.log("Employee DB ID:", employeeDbId);
    console.log("Editing bill:", editingBill);
    console.log("Is Edit Mode:", editingBill?.isEdit);

    // Check if this is an edit operation
    const isEditMode = editingBill && editingBill.isEdit;
    
    let companyId, customerId;
    
    if (isEditMode) {
      // Use existing company and customer IDs
      companyId = editingBill.companyId;
      customerId = editingBill.customerId;
      
      console.log("Edit mode - using existing IDs:", { companyId, customerId });
    } else {
      // ✅ Create company
      const companyResponse = await companyAPI.create({
        name: companyDetails.name,
        address: companyDetails.address,
        phone: companyDetails.phone,
        gst: companyDetails.gst,
        brands: companyDetails.brands
      });
      companyId = companyResponse.data.id;
      console.log("Company created with ID:", companyId);

      // ✅ Create customer
      const customerResponse = await customerAPI.create({
        name: customerFormData.name,
        phone: customerFormData.phone,
        gst: customerFormData.gst,
        address: customerFormData.address
      });
      customerId = customerResponse.data.id;
      console.log("Customer created with ID:", customerId);
    }

    // ✅ Prepare invoice items
    const items = products
      .filter(p => p.name.trim())
      .map(product => {
        const unitPrice = product.price;
        const quantity = product.qty;
        const subtotal = quantity * unitPrice;
        const discountAmount = subtotal * (product.discount / 100);
        const afterDiscount = subtotal - discountAmount;
        
        // Calculate tax ONLY if discount is applied, otherwise on full price
        const taxableAmount = afterDiscount;
        const itemCgst = cgstEnabled ? taxableAmount * cgstRate / 100 : 0;
        const itemSgst = sgstEnabled ? taxableAmount * sgstRate / 100 : 0;
        const priceWithTax = taxableAmount + itemCgst + itemSgst;
        
        console.log(`\n=== Product: ${product.name} ===`);
        console.log(`Unit Price: ₹${unitPrice}`);
        console.log(`Quantity: ${quantity}`);
        console.log(`Subtotal: ₹${subtotal}`);
        console.log(`Discount ${product.discount}%: -₹${discountAmount}`);
        console.log(`After Discount: ₹${afterDiscount}`);
        console.log(`CGST ${cgstRate}%: +₹${itemCgst}`);
        console.log(`SGST ${sgstRate}%: +₹${itemSgst}`);
        console.log(`FINAL Price (WITH TAX): ₹${priceWithTax}`);
        console.log(`===========================\n`);
        
        return {
          productName: product.name,
          quantity: quantity,
          unitPrice: unitPrice,
          discount: product.discount,
          afterDiscount: afterDiscount,
          priceWithTax: priceWithTax
        };
      });

    // ✅ Create / attach products
    const itemsWithProducts = [];

    for (const item of items) {
      try {
        const productResponse = await productAPI.create({
          name: item.productName,
          price: item.unitPrice,
          tax: 0
        });

        itemsWithProducts.push({
          itemName: item.productName,
          product: { id: productResponse.data.id },
          quantity: item.quantity,
          rate: item.unitPrice,
          price: parseFloat(item.priceWithTax.toFixed(2)),  // ✅ Price WITH TAX
          discount: item.discount,
          rowTotal: parseFloat(item.priceWithTax.toFixed(2))  // ✅ Total WITH TAX
        });
      } catch (error) {
        console.error("Error creating product:", error);

        itemsWithProducts.push({
          itemName: item.productName,
          product: null,
          quantity: item.quantity,
          rate: item.unitPrice,
          price: parseFloat(item.priceWithTax.toFixed(2)),  // ✅ Price WITH TAX
          discount: item.discount,
          rowTotal: parseFloat(item.priceWithTax.toFixed(2))  // ✅ Total WITH TAX
        });
      }
    }

    const totals = calculateTotals();
    // Use existing invoice number if editing, otherwise generate new one
    const invoiceNumber = isEditMode ? editingBill.invoiceNo : `INV-${Date.now().toString().slice(-6)}`;

    console.log("\n========== CALCULATION BREAKDOWN ==========");
    console.log("Subtotal (before discount):", totals.subtotal);
    console.log("Total Discount:", totals.totalDiscount);
    console.log("Taxable Amount (after discount):", totals.taxableAmount);
    console.log("CGST Amount (9%):", totals.cgstAmount);
    console.log("SGST Amount (9%):", totals.sgstAmount);
    console.log("GRAND TOTAL (with tax):", totals.grandTotal);
    console.log("Invoice Number:", invoiceNumber);
    console.log("Is Edit Mode:", isEditMode);
    console.log("==========================================\n");

    // ✅ FINAL invoice payload (CORRECT)
    const invoiceData = {
      invoiceNumber,
      invoiceDate: new Date().toISOString(),
      company: { id: companyId },
      customer: { id: customerId },
      employee: { id: employeeDbId },
      salesperson: employeeName,
      items: itemsWithProducts,
      subTotal: parseFloat(totals.subtotal.toFixed(2)),
      totalAmount: parseFloat(totals.grandTotal.toFixed(2)),
      cgstAmount: parseFloat(totals.cgstAmount.toFixed(2)),
      sgstAmount: parseFloat(totals.sgstAmount.toFixed(2)),
      totalDiscount: parseFloat(totals.totalDiscount.toFixed(2)),
      advanceAmount: parseFloat(advance.toFixed(2)),
      balanceAmount: parseFloat(totals.balanceAmount.toFixed(2)),
      price: parseFloat(totals.grandTotal.toFixed(2)),
      paymentStatus: paymentStatus === "Paid" ? "PAID" : "UNPAID"
    };

    console.log("\n========== INVOICE PAYLOAD BEING SENT ==========");
    console.log("Invoice Number:", invoiceData.invoiceNumber);
    console.log("SubTotal:", invoiceData.subTotal);
    console.log("Total Discount:", invoiceData.totalDiscount);
    console.log("CGST Amount:", invoiceData.cgstAmount);
    console.log("SGST Amount:", invoiceData.sgstAmount);
    console.log("Total Amount:", invoiceData.totalAmount);
    console.log("Price Field:", invoiceData.price);
    console.log("Advance Amount:", invoiceData.advanceAmount);
    console.log("Balance Amount:", invoiceData.balanceAmount);
    console.log("Full Invoice Data:", JSON.stringify(invoiceData, null, 2));
    console.log("===============================================\n");

    let invoiceResponse;
    if (isEditMode) {
      // ✅ Update existing invoice
      console.log("Updating existing invoice with ID:", editingBill.id);
      invoiceResponse = await invoiceAPI.update(editingBill.id, invoiceData);
      console.log("\n========== BACKEND UPDATE RESPONSE ==========");
      console.log("Invoice updated with ID:", invoiceResponse.data.id);
      console.log("Backend returned data:", JSON.stringify(invoiceResponse.data, null, 2));
      console.log("==========================================\n");
    } else {
      // ✅ Create new invoice
      invoiceResponse = await invoiceAPI.create(invoiceData);
      console.log("\n========== BACKEND CREATE RESPONSE ==========");
      console.log("Invoice created with ID:", invoiceResponse.data.id);
      console.log("Backend returned data:", JSON.stringify(invoiceResponse.data, null, 2));
      console.log("======================================\n");
    }

    // ✅ Create payment if advance exists
    if (advance > 0) {
      await paymentAPI.create({
        paymentMethod: "CASH",
        amount: advance,
        paymentDate: new Date().toISOString(),
        invoice: { id: invoiceResponse.data.id }
      });

      console.log("Advance payment saved");
    }

    alert(isEditMode ? "💾 Invoice updated successfully!" : "💾 Bill saved to database successfully!");
    
    // Reset form after successful save
    setCustomerFormData({ name: "", phone: "", gst: "", address: "" });
    setProducts([{ id: 1, name: "", qty: 1, price: 0, discount: 0 }]);

  } catch (error) {
    console.error("Error saving to API:", error);
    console.error("Backend response:", error.response?.data);

    alert(
      "Error saving to database: " +
        (error.response?.data?.message || error.message) +
        ". Saved locally instead."
    );

    saveBill();
  } finally {
    setLoading(false);
  }
};






  // const saveBill = () => {
  //   try {
  //     // Get logged-in employee data
  //     // const employeeName = localStorage.getItem('loggedInEmployee') || 'Sales Person';
  //     // const employeeId = localStorage.getItem('employeeId') || null;

  //     const employee = JSON.parse(localStorage.getItem("employee"));

  //       const employeeName = employee?.name || "Sales Person";
  //      const employeeId = employee?.id || null;


      
  //     const billData = {
  //       id: Date.now(),
  //       customer: customerFormData,
  //       products: products.filter(p => p.name.trim()),
  //       date: new Date().toISOString(),
  //       invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
  //       paymentStatus: paymentStatus,
  //       salesperson: employeeName,
  //       employeeId: employee?.id || null

  //     };
      
  //     const bills = JSON.parse(localStorage.getItem('bills') || '[]');
  //     bills.push(billData);
  //     localStorage.setItem('bills', JSON.stringify(bills));
      
  //     const customers = JSON.parse(localStorage.getItem('customers') || '[]');
  //     const existing = customers.find(c => c.phone === customerFormData.phone);
      
  //     if (!existing) {
  //       customers.push({
  //         id: Date.now(),
  //         ...customerFormData,
  //         totalBills: 1,
  //         lastBillDate: new Date().toLocaleDateString()
  //       });
  //     }
      
  //     localStorage.setItem('customers', JSON.stringify(customers));
  //     alert('💾 Bill saved successfully!');
      
  //     setCustomerFormData({ name: '', phone: '', gst: '', address: '' });
  //     setProducts([{ id: 1, name: '', qty: 1, price: 0, discount: 0 }]);
  //   } catch (error) {
  //     alert('Error saving bill: ' + error.message);
  //   }
  // };


  const saveBill = () => {
  try {
    // ✅ Get logged-in employee
    const employee = JSON.parse(localStorage.getItem("employee"));
    const employeeName = employee?.name || "Sales Person";
    const employeeDbId = employee?.id || null;

    // (Optional safety check)
    if (!employeeDbId) {
      console.warn("Employee ID missing while saving bill locally");
    }

    // ✅ Use SAME invoice number if already generated
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const billData = {
      id: Date.now(), // local bill ID
      invoiceNumber,
      date: new Date().toISOString(),
      customer: customerFormData,
      products: products.filter(p => p.name.trim()),
      paymentStatus,
      salesperson: employeeName,
      employeeId: employeeDbId
    };

    // ✅ Save bills locally
    const bills = JSON.parse(localStorage.getItem("bills") || "[]");
    bills.push(billData);
    localStorage.setItem("bills", JSON.stringify(bills));

    // ✅ Save / update customer locally
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const existingCustomer = customers.find(
      c => c.phone === customerFormData.phone
    );

    if (!existingCustomer) {
      customers.push({
        id: Date.now(),
        ...customerFormData,
        totalBills: 1,
        lastBillDate: new Date().toLocaleDateString()
      });
    }

    localStorage.setItem("customers", JSON.stringify(customers));

    alert("💾 Bill saved locally successfully!");

    // ✅ Reset form
    setCustomerFormData({ name: "", phone: "", gst: "", address: "" });
    setProducts([{ id: 1, name: "", qty: 1, price: 0, discount: 0 }]);

  } catch (error) {
    alert("Error saving bill locally: " + error.message);
  }
};






  const addNewRow = () => {
    setProducts([...products, {
      id: products.length + 1,
      name: '', qty: 1, price: 0, discount: 0
    }]);
  };

  // Save product to backend when name is entered
  const saveProductToAPI = async (productName, price = 0) => {
    try {
      const productData = {
        name: productName,
        price: price
      };
      
      const response = await productAPI.create(productData);
      console.log('Product saved to backend:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving product:', error);
      return null;
    }
  };

  const updateProduct = async (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
    
    // Auto-save product when name is entered and has at least 2 characters
    if (field === 'name' && value.trim().length >= 2) {
      const product = products.find(p => p.id === id);
      if (product) {
        await saveProductToAPI(value.trim(), product.price);
      }
    }
  };

  const deleteRow = (id) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const calculateRowAmount = (product) => {
    const subtotal = product.qty * product.price;
    const afterDiscount = subtotal * (1 - product.discount/100);
    const cgst = cgstEnabled ? afterDiscount * cgstRate / 100 : 0;
    const sgst = sgstEnabled ? afterDiscount * sgstRate / 100 : 0;
    return afterDiscount + cgst + sgst;
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
    // Get logged in employee data from localStorage
    const employee = JSON.parse(localStorage.getItem("employee"));
setLoggedInEmployee(employee?.name || "Sales Person");

    
    // Load API data
    loadCustomers();
    loadProducts();
    loadCompanyDetails();
    
    // Handle selectedCustomer from CustomersList
    if (selectedCustomer) {
      setCustomerFormData({
        name: selectedCustomer.name || '',
        phone: selectedCustomer.phone || '',
        gst: selectedCustomer.gst || '',
        address: selectedCustomer.address || ''
      });
    }
    
    if (editingBill) {
      setCustomerFormData({
        name: editingBill.customerName || '',
        phone: editingBill.customerPhone || '',
        gst: editingBill.customerGst || '',
        address: editingBill.customerAddress || ''
      });
      
      // Load all products from editingBill.items
      if (editingBill.items && editingBill.items.length > 0) {
        const loadedProducts = editingBill.items.map((item, index) => {
          // The price from backend already includes tax, so we need to reverse-calculate the base price
          const priceWithTax = item.price || 0;
          const quantity = item.quantity || 1;
          const discount = item.discount || 0;
          
          // Calculate base price (before tax)
          // priceWithTax = basePrice * qty * (1 - discount/100) * (1 + (cgst + sgst)/100)
          // So: basePrice = priceWithTax / [qty * (1 - discount/100) * (1 + tax/100)]
          const taxRate = (cgstEnabled ? cgstRate : 0) + (sgstEnabled ? sgstRate : 0);
          const basePricePerUnit = priceWithTax / (quantity * (1 - discount/100) * (1 + taxRate/100));
          
          return {
            id: index + 1,
            name: item.itemName || item.productName || item.product?.name || '',
            qty: quantity,
            price: basePricePerUnit,
            discount: discount
          };
        });
        setProducts(loadedProducts);
      } else {
        setProducts([{
          id: 1,
          name: editingBill.productName || '',
          qty: 1,
          price: editingBill.amount || 0,
          discount: 0
        }]);
      }
      
      // Load payment details
      if (editingBill.totals) {
        setAdvance(editingBill.totals.advanceAmount || 0);
        setPaymentStatus(editingBill.paymentStatus || 'Unpaid');
      }
    }
    
    // Load saved logo
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) {
      setCompanyLogo(savedLogo);
    }
    
    // Load saved signature
    const savedSignature = localStorage.getItem('digitalSignature');
    if (savedSignature) {
      setDigitalSignature(savedSignature);
    }
    
    // Load saved company details
    const savedCompanyDetails = localStorage.getItem('companyDetails');
    if (savedCompanyDetails) {
      setCompanyDetails(JSON.parse(savedCompanyDetails));
    }
  }, [editingBill, selectedCustomer]);

  // Save company details to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('companyDetails', JSON.stringify(companyDetails));
    // Also save to backend when company details change
    if (companyDetails.name && companyDetails.address && companyDetails.phone && companyDetails.gst) {
      saveCompanyToAPI();
    }
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

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const signatureData = event.target.result;
        setDigitalSignature(signatureData);
        localStorage.setItem('digitalSignature', signatureData);
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
    const productsHTML = products.filter(p => p.name).map((p, i) => {
      const subtotal = p.qty * p.price;
      const afterDiscount = subtotal * (1 - p.discount/100);
      return `<tr><td>${i + 1}</td><td class="product-name">${p.name}</td><!--<td>-</td>--><td>${p.qty}</td><td>${p.price.toFixed(2)}</td><td>${p.discount}</td><td>${afterDiscount.toFixed(2)}</td></tr>`;
    }).join('');
    
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
        .logo-box { width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: bold; margin-right: 20px; text-align: center; line-height: 1.1; }
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
                <div class="company-details">${companyDetails.address}<br>Phone: ${companyDetails.phone}<!--<br>GST: ${companyDetails.gst}--></div>
                <!--<div class="brand-line">${companyDetails.brands}</div>-->
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
                <!--<strong>GST:</strong> ${customerFormData.gst}<br>-->
                <strong>Address:</strong> ${customerFormData.address}
              </div>
            </div>
            <div class="invoice-info">
              <table class="invoice-info-table">
                <tr><td>Invoice No.:</td><td>INV-${Date.now().toString().slice(-6)}</td></tr>
                <tr><td>Invoice Date:</td><td>${new Date(invoiceDate).toLocaleDateString('en-GB')}</td></tr>
                <tr><td>Salesperson:</td><td><strong>${loggedInEmployee}</strong></td></tr>
                <tr><td>Payment Method:</td><td><span class="payment-method">💵 Cash</span></td></tr>
                <tr><td>Payment Status:</td><td><span class="payment-status">${paymentStatus}</span></td></tr>
              </table>
            </div>
          </div>
          <table class="products-table">
            <thead><tr><th>Sr. No.</th><th>Name of Product/Service</th><!--<th>HSN/SAC</th>--><th>Qty</th><th>Rate</th><th>Disc. (%)</th><th>Total</th></tr></thead>
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
              <div class="amount-row total-amount"><span>Total Amount:</span><span>₹${totals.grandTotal.toFixed(2)} ${paymentStatus === 'Paid' ? '✅' : '❌'}</span></div>
              <div class="amount-row"><span>Paid Amount:</span><span>₹${advance.toFixed(2)}</span></div>
              <div class="amount-row" style="background: #fef3cd; border-top: 2px solid #f59e0b;"><span style="color: #92400e; font-weight: bold;">Balance Amount:</span><span style="color: #92400e; font-weight: bold;">₹${totals.balanceAmount.toFixed(2)}</span></div>
            </div>
          </div>
          <!--<div class="signatures">
            <div class="signature-box">Owner Signature</div>
            <div class="signature-box">Customer Signature</div>
          </div>-->
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 md:p-6 animate-fadeIn relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-pink-400 rounded-full opacity-40 animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-10 w-5 h-5 bg-indigo-400 rounded-full opacity-25 animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-1/3 w-4 h-4 bg-green-400 rounded-full opacity-30 animate-float"></div>
      </div>
      {/* Mobile Header */}
      <div className={`rounded-xl shadow-xl p-4 mb-4 transform hover:scale-[1.02] transition-all duration-300 border backdrop-blur-sm hover:shadow-2xl ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-700 hover:shadow-blue-900/50 text-white' 
          : 'bg-white/90 border-gray-100 hover:shadow-blue-200/50 text-gray-800'
      }`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="animate-slideInLeft w-full text-center sm:text-left">
            <h2 className={`text-xl font-bold flex items-center justify-center sm:justify-start gap-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <FaFileInvoice className="text-2xl text-blue-600 animate-pulse" /> 
              {editingBill ? 'Edit Bill' : 'Create New Bill'}
            </h2>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {editingBill ? `Editing Invoice: ${editingBill.invoiceNo}` : 'Generate professional invoices'}
            </p>
          </div>
        </div>
      </div>

      {/* Customer & Company Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Customer Details Card */}
        <div className={`rounded-xl shadow-xl p-4 md:p-6 transform hover:scale-[1.02] transition-all duration-300 border animate-slideInLeft backdrop-blur-sm hover:shadow-2xl group ${
          isDarkMode 
            ? 'bg-gray-800/95 border-gray-700 hover:shadow-blue-900/30 text-white' 
            : 'bg-white/95 border-gray-100 hover:shadow-blue-200/30 text-gray-800'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <FaUser className="text-xl text-blue-600 animate-pulse" /> Customer Details
          </h3>
          <div className="customer-details space-y-4">
            <div className="animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              }`}>Customer Name *</label>
              <input 
                type="text" 
                className={`w-full p-3 border-2 rounded-lg focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:shadow-md ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-400 hover:border-blue-500' 
                    : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500 hover:border-blue-300'
                }`} 
                placeholder="Enter customer name (letters only)"
                value={customerFormData.name}
                onChange={handleCustomerNameChange}
              />
            </div>
            <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <label className="block text-sm font-medium text-red-600 mb-1">Phone Number *</label>
              <input 
                type="tel" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-md" 
                placeholder="Enter phone number (numbers only)" 
                maxLength="10"
                value={customerFormData.phone}
                onChange={handlePhoneChange}
              />
            </div>
            {/* <div className="animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <label className="block text-sm font-medium text-red-600 mb-1">GST Number *</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-md" 
                placeholder="Enter GST number"
                value={customerFormData.gst}
                onChange={(e) => setCustomerFormData({...customerFormData, gst: e.target.value})}
              />
            </div> */}
            <div className="animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <label className="block text-sm font-medium text-red-600 mb-1">Invoice Address *</label>
              <textarea 
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none hover:border-blue-300 hover:shadow-md" 
                rows="3" 
                placeholder="Enter complete address"
                value={customerFormData.address}
                onChange={(e) => setCustomerFormData({...customerFormData, address: e.target.value})}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Company Details Card */}
        <div className={`rounded-xl shadow-xl p-4 md:p-6 border transform hover:scale-[1.02] transition-all duration-300 animate-slideInRight backdrop-blur-sm hover:shadow-2xl group ${
          isDarkMode 
            ? 'bg-gray-800/95 border-gray-700 hover:shadow-green-900/30 text-white' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 hover:shadow-green-200/30 text-gray-800'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <FaBuilding className="text-xl text-green-600 animate-pulse" /> Company Details
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Digital Signature</label>
              <div className="flex items-center gap-3 flex-wrap">
                {digitalSignature ? (
                  <img src={digitalSignature} alt="Signature" className="w-32 h-16 object-contain border rounded" />
                ) : (
                  <div className="bg-gray-200 text-gray-600 p-3 rounded-lg text-xs font-bold text-center min-w-20">No Signature</div>
                )}
                <input type="file" id="signature-upload" accept="image/*" className="hidden" onChange={handleSignatureUpload} />
                <label htmlFor="signature-upload" className="bg-gray-600 text-white px-3 py-2 rounded-lg text-xs cursor-pointer hover:bg-gray-700 transition-colors">📝 Upload Signature</label>
                <span className="text-xs text-gray-500">{digitalSignature ? 'Signature uploaded' : 'No signature'}</span>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Company Name</label>
              <input 
                type="text" 
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-400' 
                    : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
                }`} 
                placeholder="Enter company name (letters & business chars only)"
                value={companyDetails.name}
                onChange={handleCompanyNameChange}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Company Address</label>
              <textarea 
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all resize-none ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-400' 
                    : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
                }`} 
                rows="3" 
                value={companyDetails.address}
                onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Phone Number</label>
              <input 
                type="text" 
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-400' 
                    : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
                }`} 
                placeholder="Enter phone number (numbers only)"
                maxLength="10"
                value={companyDetails.phone}
                onChange={handleCompanyPhoneChange}
              />
            </div>
            {/* <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>GST Number</label>
              <input 
                type="text" 
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-400' 
                    : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
                }`} 
                value={companyDetails.gst}
                onChange={(e) => setCompanyDetails({...companyDetails, gst: e.target.value})}
              />
            </div> */}
           
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Payment Method</label>
              <select className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-100 transition-all ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-400' 
                  : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
              }`}>
                <option>💵 Cash</option>
                <option>💳 Card</option>
                <option>📱 UPI</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className={`rounded-xl shadow-xl p-4 md:p-6 mb-6 transform hover:scale-[1.01] transition-all duration-300 border animate-fadeInUp backdrop-blur-sm hover:shadow-2xl group ${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700 hover:shadow-purple-900/30 text-white' 
          : 'bg-white/95 border-gray-100 hover:shadow-purple-200/30 text-gray-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <FaBox className="text-xl text-purple-600 animate-pulse" /> Products & Services
          </h3>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2" onClick={addNewRow}>
            <FaPlus className="animate-bounce" /> Add Product
          </button>
        </div>
        
        {/* Mobile-Optimized Product List */}
        <div className="space-y-3 md:hidden" id="mobile-products">
          {products.map((product) => (
            <div key={product.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 animate-slideInUp">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 hover:shadow-md" 
                    placeholder="Product name"
                    value={product.name}
                    onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded text-sm text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 hover:shadow-md" 
                    value={product.qty} 
                    min="1"
                    onChange={(e) => updateProduct(product.id, 'qty', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded text-sm text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 hover:shadow-md" 
                    value={product.price} 
                    min="0" 
                    step="0.01"
                    onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                    onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                    onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Disc %</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded text-sm text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 hover:shadow-md" 
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
                <div className="text-sm font-semibold text-gray-700 animate-pulse">Amount: ₹ <span className="text-green-600">{calculateRowAmount(product).toFixed(2)}</span></div>
                <button 
                  className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-red-600 hover:scale-110 transition-all duration-300 shadow-md"
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
          <table className={`products-table w-full border-collapse border rounded-lg overflow-hidden ${
            isDarkMode ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <thead>
              <tr className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200'
              }`}>
                <th className={`p-3 text-left font-semibold border-b ${
                  isDarkMode ? 'text-gray-200 border-gray-600' : 'text-gray-700 border-gray-300'
                }`}>Product</th>
                <th className={`p-3 text-center font-semibold border-b ${
                  isDarkMode ? 'text-gray-200 border-gray-600' : 'text-gray-700 border-gray-300'
                }`}>Qty</th>
                <th className={`p-3 text-center font-semibold border-b ${
                  isDarkMode ? 'text-gray-200 border-gray-600' : 'text-gray-700 border-gray-300'
                }`}>Price</th>
                <th className={`p-3 text-center font-semibold border-b ${
                  isDarkMode ? 'text-gray-200 border-gray-600' : 'text-gray-700 border-gray-300'
                }`}>Disc%</th>
                <th className={`p-3 text-center font-semibold border-b ${
                  isDarkMode ? 'text-gray-200 border-gray-600' : 'text-gray-700 border-gray-300'
                }`}>Amount</th>
                <th className={`p-3 text-center font-semibold border-b ${
                  isDarkMode ? 'text-gray-200 border-gray-600' : 'text-gray-700 border-gray-300'
                }`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={`transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <td className={`p-3 border-b ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <input 
                      type="text" 
                      className={`w-full p-2 border-0 bg-transparent text-sm rounded ${
                        isDarkMode ? 'focus:bg-gray-600 text-white placeholder-gray-400' : 'focus:bg-gray-100 text-gray-900 placeholder-gray-500'
                      }`} 
                      placeholder="Product name"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                    />
                  </td>
                  <td className={`p-3 border-b text-center ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <input 
                      type="number" 
                      className={`w-16 p-2 border-0 bg-transparent text-sm text-center rounded ${
                        isDarkMode ? 'focus:bg-gray-600 text-white' : 'focus:bg-gray-100 text-gray-900'
                      }`} 
                      value={product.qty} 
                      min="1"
                      onChange={(e) => updateProduct(product.id, 'qty', parseInt(e.target.value) || 1)}
                    />
                  </td>
                  <td className={`p-3 border-b text-center ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <input 
                      type="number" 
                      className={`w-20 p-2 border-0 bg-transparent text-sm text-center rounded ${
                        isDarkMode ? 'focus:bg-gray-600 text-white' : 'focus:bg-gray-100 text-gray-900'
                      }`} 
                      value={product.price} 
                      min="0" 
                      step="0.01"
                      onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                      onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                      onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
                    />
                  </td>
                  <td className={`p-3 border-b text-center ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <input 
                      type="number" 
                      className={`w-16 p-2 border-0 bg-transparent text-sm text-center rounded ${
                        isDarkMode ? 'focus:bg-gray-600 text-white' : 'focus:bg-gray-100 text-gray-900'
                      }`} 
                      value={product.discount} 
                      min="0" 
                      max="100"
                      onChange={(e) => updateProduct(product.id, 'discount', parseFloat(e.target.value) || 0)}
                      onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                      onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
                    />
                  </td>
                  <td className={`p-3 border-b text-center font-medium ${
                    isDarkMode ? 'border-gray-600 text-gray-200' : 'border-gray-200 text-gray-700'
                  }`}>
                    ₹ {calculateRowAmount(product).toFixed(2)}
                  </td>
                  <td className={`p-3 border-b text-center ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}>
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
      <div className={`rounded-xl shadow-xl p-4 md:p-6 transform hover:scale-[1.01] transition-all duration-300 border animate-fadeInUp backdrop-blur-sm hover:shadow-2xl group ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-700 hover:shadow-indigo-900/40 text-white' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-indigo-200/40 text-gray-800'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <FaCalculator className="text-xl text-green-600 animate-pulse" /> Bill Summary
        </h3>
        <div className={`rounded-lg p-4 space-y-3 shadow-inner ${
          isDarkMode ? 'bg-gray-700/50' : 'bg-white'
        }`}>
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b transition-all duration-300 rounded px-2 ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700 text-gray-200' 
              : 'border-gray-100 hover:bg-gray-50 text-gray-800'
          }`}>
            <span className={`text-sm mb-1 sm:mb-0 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Untaxed Amount:</span>
            <span className={`font-semibold animate-pulse ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>₹ {calculateTotals().subtotal.toFixed(2)}</span>
          </div>
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b transition-all duration-300 rounded px-2 ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700 text-gray-200' 
              : 'border-gray-100 hover:bg-gray-50 text-gray-800'
          }`}>
            <span className={`text-sm mb-1 sm:mb-0 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Discount Amount:</span>
            <span className={`font-semibold animate-pulse ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>₹ {calculateTotals().totalDiscount.toFixed(2)}</span>
          </div>
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b ${
            isDarkMode ? 'border-gray-600' : 'border-gray-100'
          }`}>
            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-0">
              <input 
                type="checkbox" 
                checked={cgstEnabled} 
                onChange={(e) => setCgstEnabled(e.target.checked)} 
                className="rounded" 
              />
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>CGST:</span>
              <input 
                type="number" 
                className={`w-12 p-1 border rounded text-xs text-center ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`} 
                value={cgstRate} 
                min="0" 
                max="9"
                step="0.01"
                onChange={handleCgstChange}
                onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
              />%
            </div>
            <span className={`font-semibold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>₹ {calculateTotals().cgstAmount.toFixed(2)}</span>
          </div>
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b ${
            isDarkMode ? 'border-gray-600' : 'border-gray-100'
          }`}>
            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-0">
              <input 
                type="checkbox" 
                checked={sgstEnabled} 
                onChange={(e) => setSgstEnabled(e.target.checked)} 
                className="rounded" 
              />
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>SGST:</span>
              <input 
                type="number" 
                className={`w-12 p-1 border rounded text-xs text-center ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`} 
                value={sgstRate} 
                min="0" 
                max="9"
                step="0.01"
                onChange={handleSgstChange}
                onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
              />%
            </div>
            <span className={`font-semibold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>₹ {calculateTotals().sgstAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 border-2 border-blue-200">
            <span className="text-base sm:text-lg font-bold text-blue-800 mb-1 sm:mb-0">Total Amount:</span>
            <span className="text-lg sm:text-xl font-bold text-blue-800">₹ {calculateTotals().grandTotal.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg px-4 border-2 border-green-200 mt-2">
            <span className="text-base sm:text-lg font-bold text-green-800 mb-1 sm:mb-0">Advance Amount:</span>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                className="w-24 p-2 border-2 border-green-300 rounded-lg text-base font-bold text-green-800 text-center focus:border-green-500 focus:ring-2 focus:ring-green-200" 
                value={advance} 
                min="0" 
                step="0.01"
                onChange={(e) => {
                  const advanceValue = parseFloat(e.target.value) || 0;
                  const grandTotal = calculateTotals().grandTotal;
                  setAdvance(advanceValue);
                  setBalance(grandTotal - advanceValue);
                  if (advanceValue >= grandTotal) {
                    setPaymentStatus('Paid');
                  } else {
                    setPaymentStatus('Unpaid');
                  }
                }}
                onFocus={(e) => { if(e.target.value == '0') e.target.select(); }}
                onKeyDown={(e) => { if(e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }}
              />
              <span className="text-lg sm:text-xl font-bold text-green-800">₹</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg px-4 border-2 border-orange-200 mt-2">
            <span className="text-base sm:text-lg font-bold text-orange-800 mb-1 sm:mb-0">Balance Amount:</span>
            <span className="text-lg sm:text-xl font-bold text-orange-800">₹ {calculateTotals().balanceAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-4 border-2 border-gray-300 mt-2">
            <span className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-0">Payment Status:</span>
            <button 
              onClick={() => {
                const newStatus = paymentStatus === 'Paid' ? 'Unpaid' : 'Paid';
                setPaymentStatus(newStatus);
                if (newStatus === 'Paid') {
                  const grandTotal = calculateTotals().grandTotal;
                  setAdvance(grandTotal);
                  setBalance(0);
                } else {
                  setAdvance(0);
                  setBalance(calculateTotals().grandTotal);
                }
              }}
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
            <label htmlFor="companyWatermark" className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Show Company Watermark</label>
          </div>
        </div>
      </div>

      {/* Action Buttons - Moved to End */}
      <div className={`rounded-xl shadow-xl p-4 mb-4 transform hover:scale-[1.02] transition-all duration-300 border backdrop-blur-sm hover:shadow-2xl ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-700 hover:shadow-blue-900/50' 
          : 'bg-white/90 border-gray-100 hover:shadow-blue-200/50'
      }`}>
        <div className="flex flex-wrap gap-2 w-full animate-slideInRight justify-center">
          <button className={`flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2 justify-center ${
            isDarkMode ? 'hover:shadow-blue-400/30' : 'hover:shadow-blue-300/50'
          }`} onClick={() => handleAction('send')}>
            <FaPaperPlane className="animate-bounce" /> Send
          </button>
          <button className={`flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-800 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2 justify-center ${
            isDarkMode ? 'hover:shadow-green-400/30' : 'hover:shadow-green-300/50'
          }`} onClick={() => handleAction('print')}>
            <FaPrint className="hover:animate-spin" /> Print
          </button>
          <button className={`flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-purple-800 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2 justify-center ${
            isDarkMode ? 'hover:shadow-purple-400/30' : 'hover:shadow-purple-300/50'
          }`} onClick={() => handleAction('save')} disabled={loading}>
            {loading ? <FaTimes className="animate-spin" /> : <FaSave className="hover:animate-pulse" />} {loading ? 'Saving...' : 'Save'}
          </button>
          <button className={`flex-1 sm:flex-none bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-700 hover:to-orange-800 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2 justify-center ${
            isDarkMode ? 'hover:shadow-orange-400/30' : 'hover:shadow-orange-300/50'
          }`} onClick={() => handleAction('preview')}>
            <FaEye className="hover:animate-pulse" /> Preview
          </button>
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
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xs font-bold mr-3 md:mr-4">
                      {companyLogo ? (
                        <img src={companyLogo} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        'YOUR LOGO'
                      )}
                    </div>
                    <div className="flex-1">
                      <h1 className="text-lg md:text-xl font-bold">{companyDetails.name}</h1>
                      <p className="text-xs md:text-sm text-gray-600">
                        {companyDetails.address}<br/>
                        Phone: {companyDetails.phone}<br/>
                        GST: {companyDetails.gst}
                      </p>
                      {/*<p className="text-xs md:text-sm font-medium mt-2">{companyDetails.brands}</p>*/}
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
                        <input 
                          type="date" 
                          value={invoiceDate}
                          onChange={(e) => setInvoiceDate(e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:border-blue-500 focus:outline-none"
                        />
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
                      const subtotal = product.qty * product.price;
                      const afterDiscount = subtotal * (1 - product.discount/100);
                      return (
                        <div key={index} className="bg-gray-50 p-3 mb-2 rounded border">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">{index + 1}. {product.name}</span>
                            <span className="font-bold">₹{afterDiscount.toFixed(2)}</span>
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
                        <th className="border border-black p-2 text-sm">Qty</th>
                        <th className="border border-black p-2 text-sm">Rate</th>
                        <th className="border border-black p-2 text-sm">Disc. (%)</th>
                        <th className="border border-black p-2 text-sm">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => {
                        if (product.name) {
                          const subtotal = product.qty * product.price;
                          const afterDiscount = subtotal * (1 - product.discount/100);
                          return (
                            <tr key={index}>
                              <td className="border border-black p-2 text-center text-sm">{index + 1}</td>
                              <td className="border border-black p-2 text-sm">{product.name}</td>
                              <td className="border border-black p-2 text-center text-sm">{product.qty}</td>
                              <td className="border border-black p-2 text-center text-sm">₹{product.price.toFixed(2)}</td>
                              <td className="border border-black p-2 text-center text-sm">{product.discount}%</td>
                              <td className="border border-black p-2 text-center text-sm">₹{afterDiscount.toFixed(2)}</td>
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
                        <span>Paid Amount:</span>
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
                {/* <div className="grid grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-black md:border-t-2">
                  <div className="text-center">
                    <div className="border-t border-black mt-8 md:mt-12 pt-2 font-bold text-xs md:text-sm">Owner Signature</div>
                  </div>
                  <div className="text-center">
                    <div className="border-t border-black mt-8 md:mt-12 pt-2 font-bold text-xs md:text-sm">Customer Signature</div>
                  </div>
                </div> */}
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
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input 
                    type="text" 
                    value={customerFormData.gst}
                    onChange={(e) => setCustomerFormData({...customerFormData, gst: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    placeholder="Enter GST number" 
                  />
                </div> */}
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

