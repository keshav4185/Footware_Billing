import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";

const Reports = () => {
  const [activeReport, setActiveReport] = useState("payments");
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [billsRes, customersRes, productsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/billing/invoices"),
          axios.get("http://localhost:8080/api/customers"),
          axios.get("http://localhost:8080/api/products"),
        ]);
        setBills(billsRes.data);
        setCustomers(customersRes.data);
        setProducts(productsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching report data", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBills = bills.filter((bill) => {
    let statusMatch = paymentStatusFilter === "all" || bill.paymentStatus === paymentStatusFilter;
    let dateMatch = true;
    if (startDate) dateMatch = new Date(bill.invoiceDate) >= new Date(startDate);
    if (endDate) dateMatch = dateMatch && new Date(bill.invoiceDate) <= new Date(endDate);
    return statusMatch && dateMatch;
  });

  // Animated KPI card
  const KPICard = ({ title, value, colorFrom, colorTo }) => (
    <div
      className={`p-4 rounded-xl text-white transform transition duration-300 hover:scale-105 hover:shadow-xl`}
      style={{ background: `linear-gradient(to right, ${colorFrom}, ${colorTo})` }}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl font-extrabold mt-2">{value}</p>
    </div>
  );

  // ------------------- Payments Report -------------------
  const PaymentsReport = () => {
    const monthlyDataObj = filteredBills.reduce((acc, bill) => {
      const month = new Date(bill.invoiceDate).toLocaleString("default", { month: "short", year: "numeric" });
      if (!acc[month]) acc[month] = { month, paid: 0, unpaid: 0 };
      if (bill.paymentStatus === "PAID") acc[month].paid += bill.totalAmount || 0;
      else acc[month].unpaid += bill.totalAmount || 0;
      return acc;
    }, {});
    const monthlyData = Object.values(monthlyDataObj);

    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Status</label>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="mt-1 block p-2 border rounded-lg"
            >
              <option value="all">All</option>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard
            title="Total Paid"
            value={`₹${filteredBills.filter(b => b.paymentStatus === "PAID").reduce((sum, b) => sum + (b.totalAmount || 0), 0).toFixed(2)}`}
            colorFrom="#4ade80"
            colorTo="#16a34a"
          />
          <KPICard
            title="Total Unpaid"
            value={`₹${filteredBills.filter(b => b.paymentStatus !== "PAID").reduce((sum, b) => sum + (b.totalAmount || 0), 0).toFixed(2)}`}
            colorFrom="#f87171"
            colorTo="#b91c1c"
          />
          <KPICard
            title="Total Orders"
            value={filteredBills.length}
            colorFrom="#3b82f6"
            colorTo="#1e3a8a"
          />
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded-xl shadow-lg mt-4">
          <h3 className="text-lg font-bold mb-4">Monthly Payment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="paid" fill="#4ade80" />
              <Bar dataKey="unpaid" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // ------------------- Sales Report -------------------
  const SalesReport = () => {
    const monthlyDataObj = filteredBills.reduce((acc, bill) => {
      const month = new Date(bill.invoiceDate).toLocaleString("default", { month: "short", year: "numeric" });
      if (!acc[month]) acc[month] = { month, revenue: 0, orders: 0 };
      acc[month].revenue += bill.totalAmount || 0;
      acc[month].orders += 1;
      return acc;
    }, {});
    const monthlyData = Object.values(monthlyDataObj);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard
            title="Total Sales"
            value={`₹${filteredBills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0).toFixed(2)}`}
            colorFrom="#3b82f6"
            colorTo="#1e3a8a"
          />
          <KPICard
            title="Total Orders"
            value={filteredBills.length}
            colorFrom="#10b981"
            colorTo="#065f46"
          />
          <KPICard
            title="Avg Order Value"
            value={`₹${filteredBills.length ? (filteredBills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0) / filteredBills.length).toFixed(2) : "0.00"}`}
            colorFrom="#8b5cf6"
            colorTo="#5b21b6"
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg mt-4">
          <h3 className="text-lg font-bold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // ------------------- Customer-wise Sales -------------------
  const CustomerSalesReport = () => {
    const customerSales = customers.map(c => {
      const customerBills = bills.filter(b => b.customer?.id === c.id);
      const revenue = customerBills.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
      return { name: c.name, orders: customerBills.length, revenue };
    });

    return (
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">Customer-wise Sales</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={customerSales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="orders" fill="#82ca9d" />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // ------------------- Product Stock Report (Bar Chart) -------------------
  const ProductReport = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard
            title="Total Products"
            value={products.length}
            colorFrom="#f97316"
            colorTo="#b45309"
          />
          <KPICard
            title="Low Stock"
            value={products.filter(p => p.stock < 10).length}
            colorFrom="#ef4444"
            colorTo="#7f1d1d"
          />
          <KPICard
            title="Total Value"
            value={`₹${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}`}
            colorFrom="#eab308"
            colorTo="#78350f"
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg mt-4">
          <h3 className="text-lg font-bold mb-4">Product Stock Levels</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={products}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value} units`} />
              <Bar dataKey="stock" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderReport = () => {
    switch (activeReport) {
      case "payments": return <PaymentsReport />;
      case "sales": return <SalesReport />;
      case "customer-sales": return <CustomerSalesReport />;
      case "products": return <ProductReport />;
      default: return <PaymentsReport />;
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading reports...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {["payments", "sales", "customer-sales", "products"].map(id => (
            <button
              key={id}
              onClick={() => setActiveReport(id)}
              className={`px-3 py-2 rounded-lg text-sm ${
                activeReport === id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </button>
          ))}
        </div>
        {renderReport()}
      </div>
    </div>
  );
};

export default Reports;
