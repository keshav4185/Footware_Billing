import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import CountUp from "react-countup";
import * as XLSX from "xlsx";

const Reports = () => {
  const [activeReport, setActiveReport] = useState("payments");
  const [bills, setBills] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportType, setReportType] = useState("monthly"); // daily / monthly / yearly

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [billsRes, customersRes, productsRes] = await Promise.all([
          axios.get("https://backend-billing-software-ahxt.onrender.com/api/billing/invoices"),
          axios.get("https://backend-billing-software-ahxt.onrender.com/api/billing/customers"),
          axios.get("https://backend-billing-software-ahxt.onrender.com/api/billing/products"),
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

  const KPICard = ({ title, value, colorFrom, colorTo }) => (
    <div
      className={`p-4 rounded-xl text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
      style={{ background: `linear-gradient(to right, ${colorFrom}, ${colorTo})` }}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl font-extrabold mt-2">
        <CountUp end={Number(value)} duration={1.5} separator="," prefix={value.toString().includes("₹") ? "₹" : ""}/>
      </p>
    </div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200 animate-fadeIn">
          {payload.map((p) => (
            <p key={p.name} className="text-gray-800 font-medium">
              {p.name}: {["revenue", "paid", "unpaid"].includes(p.dataKey) ? p.value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : p.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const groupBills = (billsArray, type) => {
    const data = {};
    billsArray.forEach((bill) => {
      const date = new Date(bill.invoiceDate);
      let key = "";
      if (type === "daily") key = date.toISOString().slice(0, 10);
      else if (type === "monthly") key = date.toISOString().slice(0, 7);
      else key = date.getFullYear();
      if (!data[key]) data[key] = { label: key, revenue: 0, paid: 0, unpaid: 0, orders: 0 };
      data[key].revenue += bill.totalAmount || 0;
      if (bill.paymentStatus === "PAID") data[key].paid += bill.totalAmount || 0;
      else data[key].unpaid += bill.totalAmount || 0;
      data[key].orders += 1;
    });
    return Object.values(data);
  };

  const exportToExcel = (reportData, filename = "report.xlsx") => {
    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, filename);
  };

  const PaymentsReport = () => {
    const chartData = groupBills(filteredBills, reportType);
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Status</label>
            <select value={paymentStatusFilter} onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="mt-1 block p-2 border rounded-lg">
              <option value="all">All</option>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}
              className="mt-1 block p-2 border rounded-lg">
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="mt-6">
            <button onClick={() => exportToExcel(chartData, `payments_${reportType}.xlsx`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Export Excel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard
            title="Total Paid"
            value={filteredBills.filter(b => b.paymentStatus === "PAID").reduce((sum, b) => sum + (b.totalAmount || 0), 0).toFixed(2)}
            colorFrom="#4ade80"
            colorTo="#16a34a"
          />
          <KPICard
            title="Total Unpaid"
            value={filteredBills.filter(b => b.paymentStatus !== "PAID").reduce((sum, b) => sum + (b.totalAmount || 0), 0).toFixed(2)}
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

        <div className="bg-white p-4 rounded-xl shadow-lg mt-4">
          <h3 className="text-lg font-bold mb-4">Payment Status</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="paid" fill="#4ade80" radius={[5,5,0,0]} />
                <Bar dataKey="unpaid" fill="#f87171" radius={[5,5,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500 text-center py-10">No data available for selected period.</p>}
        </div>
      </div>
    );
  };

  const SalesReport = () => {
    const chartData = groupBills(filteredBills, reportType);
    const topCustomers = customers
      .map(c => ({
        name: c.name,
        total: filteredBills.filter(b => b.customer?.id === c.id).reduce((sum, b) => sum + (b.totalAmount || 0), 0)
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard
            title="Total Sales"
            value={filteredBills.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toFixed(2)}
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
            value={(filteredBills.length ? (filteredBills.reduce((sum, b) => sum + (b.totalAmount || 0), 0) / filteredBills.length).toFixed(2) : "0.00")}
            colorFrom="#8b5cf6"
            colorTo="#5b21b6"
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-white p-4 rounded-xl shadow-lg w-full sm:w-1/2">
            <h3 className="text-lg font-bold mb-4">Revenue</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            ) : <p className="text-gray-500 text-center py-10">No data available for selected period.</p>}
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg w-full sm:w-1/2">
            <h3 className="text-lg font-bold mb-4">Top 5 Customers</h3>
            {topCustomers.length > 0 ? (
              <ul className="list-disc pl-5">
                {topCustomers.map(c => (
                  <li key={c.name}>{c.name}: ₹{c.total.toFixed(2)}</li>
                ))}
              </ul>
            ) : <p className="text-gray-500">No customer data available.</p>}
          </div>
        </div>

        <div className="mt-4">
          <button onClick={() => exportToExcel(chartData, `sales_${reportType}.xlsx`)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Export Excel
          </button>
        </div>
      </div>
    );
  };

  const ProductReport = () => {
    const topProducts = products
      .map(p => ({
        name: p.name,
        total: (p.price || 0) * (p.stock || 0)
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

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
            value={products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}
            colorFrom="#eab308"
            colorTo="#78350f"
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg mt-4">
          <h3 className="text-lg font-bold mb-4">Product Stock Levels</h3>
          {products.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={products}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="stock" fill="#3b82f6" radius={[5,5,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500 text-center py-10">No product data available.</p>}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Top 5 Products by Value</h3>
          {topProducts.length > 0 ? (
            <ul className="list-disc pl-5">
              {topProducts.map(p => (
                <li key={p.name}>{p.name}: ₹{p.total.toFixed(2)}</li>
              ))}
            </ul>
          ) : <p className="text-gray-500">No product data available.</p>}
          <button onClick={() => exportToExcel(products, `products.xlsx`)}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600">
            Export Excel
          </button>
        </div>
      </div>
    );
  };

  const renderReport = () => {
    switch (activeReport) {
      case "payments": return <PaymentsReport />;
      case "sales": return <SalesReport />;
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
          {["payments", "sales", "products"].map(id => (
            <button
              key={id}
              onClick={() => setActiveReport(id)}
              className={`px-3 py-2 rounded-lg text-sm ${
                activeReport === id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        {renderReport()}
      </div>
    </div>
  );
};

export default Reports;
