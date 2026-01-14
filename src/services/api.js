import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/billing';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API
export const employeeAPI = {
  login: (credentials) => axios.post('http://localhost:8080/api/employees/login', {
    empId: credentials.empId,
    email: credentials.email,
    password: credentials.password
  }),
  getById: (id) => axios.get(`http://localhost:8080/api/employees/${id}`),
  getAll: () => api.get('/employees'),
};

// Company API
export const companyAPI = {
  create: (company) => api.post('/company', {
    name: company.name,
    address: company.address,
    phone: company.phone,
    gst: company.gst,
    brands: company.brands
  }),
   getAll: () => axios.get("/company"),   // ✅ ADD THIS
  getById: (id) => axios.get(`/company/${id}`)
};

// Customer API
export const customerAPI = {
  create: (customer) => api.post('/customer', {
    name: customer.name,
    phone: customer.phone,
    gst: customer.gst,
    address: customer.address
  }),
  getAll: () => api.get('/customers'),
};

// Product API
export const productAPI = {
  create: (product) => api.post('/products', {
    name: product.name,
    price: product.price,
    tax: product.tax
  }),
  getAll: () => api.get('/products'),
};

// Invoice API
export const invoiceAPI = {
  create: (invoice) => api.post('/invoice', invoice),
  getAll: () => api.get('/invoices'),
  update: (id, invoice) => api.put(`/invoice/${id}`, invoice),
  delete: (id) => axios.delete(`http://localhost:8080/api/billing/invoices/${id}`),
};

// Payment API
export const paymentAPI = {
  create: (payment) => api.post('/payment', {
    paymentMethod: payment.paymentMethod,
    amount: payment.amount,
    paymentDate: payment.paymentDate,
    invoice: { id: payment.invoice.id }
  }),
};

export default api;