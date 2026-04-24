import axios from 'axios';

const API_BASE_URL = 'https://backend-billing-software-ahxt.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API
export const employeeAPI = {
  login: (credentials) => api.post('/employees/login', {
    empId: credentials.empId,
    email: credentials.email,
    password: credentials.password
  }),
  getById: (id) => api.get(`/employees/${id}`),
  getAll: () => api.get('/employees'),
};

// Company API
export const companyAPI = {
  create: (company) => api.post('/billing/company', {
    name: company.name,
    address: company.address,
    phone: company.phone,
    gst: company.gst,
    brands: company.brands
  }),
  getAll: () => api.get("/billing/company"),
  getById: (id) => api.get(`/billing/company/${id}`)
};

// Customer API
export const customerAPI = {
  create: (customer) => api.post('/billing/customer', {
    name: customer.name,
    phone: customer.phone,
    gst: customer.gst,
    address: customer.address
  }),
  getAll: () => api.get('/billing/customers'),
};

// Product API
export const productAPI = {
  create: (product) => api.post('/billing/products', {
    name: product.name,
    price: product.price,
    tax: product.tax
  }),
  getAll: () => api.get('/billing/products'),
};

// Invoice API
export const invoiceAPI = {
  create: (invoice) => api.post('/billing/invoice', invoice),
  getById: (id) => api.get(`/billing/invoice/${id}`),
  getAll: () => api.get('/billing/invoices'),
  update: (id, invoice) => api.put(`/billing/invoice/${id}`, invoice),
  delete: (id) => api.delete(`/billing/invoices/${id}`),
};

// Payment API
export const paymentAPI = {
  create: (payment) => api.post('/billing/payment', {
    paymentMethod: payment.paymentMethod,
    amount: payment.amount,
    paymentDate: payment.paymentDate,
    invoice: { id: payment.invoice.id }
  }),
};

export default api;