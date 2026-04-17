import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from "recharts";
import CountUp from "react-countup";
import * as XLSX from "xlsx";

const Reports = ({ isDarkMode }) => {
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
      className={`p-4 rounded-xl text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between ${isDarkMode ? 'shadow-blue-900/20 shadow-lg' : ''}`}
      style={{ background: `linear-gradient(to right, ${colorFrom}, ${colorTo})` }}
    >
      <h3 className="text-lg font-bold opacity-90">{title}</h3>
      <p className="text-2xl font-extrabold mt-2">
        <CountUp end={Number(value)} duration={1.5} separator="," prefix={value.toString().includes("₹") ? "₹" : ""} />
      </p>
    </div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} p-3 shadow-2xl rounded-xl border animate-fadeIn transition-colors`}>
          {payload.map((p) => (
            <p key={p.name} className="font-bold flex justify-between gap-4">
              <span>{p.name}:</span>
              <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                {["revenue", "paid", "unpaid"].includes(p.dataKey) ? p.value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : p.value.toLocaleString()}
              </span>
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
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
              className={`mt-1 block p-2 border rounded-lg outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-white border-gray-300'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
              className={`mt-1 block p-2 border rounded-lg outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-white border-gray-300'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Payment Status</label>
            <select value={paymentStatusFilter} onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className={`mt-1 block p-2 border rounded-lg outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-white border-gray-300'}`}>
              <option value="all">All</option>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}
              className={`mt-1 block p-2 border rounded-lg outline-none transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'bg-white border-gray-300'}`}>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="mt-6">
            <button onClick={() => exportToExcel(chartData, `payments_${reportType}.xlsx`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md font-medium active:scale-95">
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

        <div className={`p-4 rounded-xl shadow-lg mt-4 transition-colors ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Payment Status</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="label" tick={{ fill: isDarkMode ? '#9ca3af' : '#4b5563' }} />
                <YAxis tick={{ fill: isDarkMode ? '#9ca3af' : '#4b5563' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="paid" fill="#4ade80" radius={[5, 5, 0, 0]} />
                <Bar dataKey="unpaid" fill="#f87171" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className={`text-center py-10 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>No data available for selected period.</p>}
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
          <div className={`p-4 rounded-xl shadow-lg w-full sm:w-1/2 transition-colors ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Revenue</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="label" tick={{ fill: isDarkMode ? '#9ca3af' : '#4b5563' }} />
                  <YAxis tick={{ fill: isDarkMode ? '#9ca3af' : '#4b5563' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            ) : <p className={`text-center py-10 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>No data available for selected period.</p>}
          </div>

          <div className={`p-4 rounded-xl shadow-lg w-full sm:w-1/2 transition-colors ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Top 5 Customers</h3>
            {topCustomers.length > 0 ? (
              <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>
                {topCustomers.map(c => (
                  <li key={c.name} className="py-1">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>{c.name}: </span>
                    <span className="font-bold text-blue-500">₹{c.total.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : <p className={`text-center py-10 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>No customer data available.</p>}
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
    // 1. Calculate actual sales revenue per product from all invoices
    const productStats = products.map(p => {
      // Find all items in all bills that match this product
      let soldQty = 0;
      let revenue = 0;

      filteredBills.forEach(bill => {
        const items = bill.items || bill.invoiceItems || [];
        items.forEach(item => {
          // Comprehensive matching by ID or Name
          if (item.product?.id === p.id || item.productId === p.id || item.productName === p.name || item.itemName === p.name) {
            soldQty += (item.quantity || item.qty || 0);
            revenue += (item.rowTotal || (item.quantity * item.rate) || 0);
          }
        });
      });

      return {
        ...p,
        soldQty,
        revenue,
        // Calculate inventory value
        inventoryValue: (p.price || 0) * (p.stock || 0)
      };
    });

    // 2. Data for Charts
    const sortedByRevenue = [...productStats].sort((a, b) => b.revenue - a.revenue).slice(0, 10);
    const top5Revenue = sortedByRevenue.slice(0, 5);

    // 3. Colors for Pie Chart
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
      <div className="space-y-8 animate-fadeIn">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Products"
            value={products.length}
            colorFrom="#f97316"
            colorTo="#b45309"
          />
          <KPICard
            title="Total Sales Value"
            value={productStats.reduce((sum, p) => sum + p.revenue, 0).toFixed(2)}
            colorFrom="#8b5cf6"
            colorTo="#4c1d95"
          />
          <KPICard
            title="Inventory Value"
            value={productStats.reduce((sum, p) => sum + p.inventoryValue, 0).toFixed(2)}
            colorFrom="#eab308"
            colorTo="#78350f"
          />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Revenue Performance (Top 10) */}
          <div className={`p-5 rounded-2xl shadow-sm border transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Top Products by Revenue
            </h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedByRevenue} layout="vertical" margin={{ left: 40, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: isDarkMode ? '#9ca3af' : '#4b5563' }} />
                  <Tooltip
                    cursor={{ fill: isDarkMode ? '#1f2937' : '#f3f4f6' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white shadow-2xl' : 'bg-white border-gray-200 text-gray-800 shadow-xl'} p-3 rounded-lg border animate-fadeIn`}>
                            <p className="font-bold mb-1">{payload[0].payload.name}</p>
                            <p className="text-blue-500 font-bold">Revenue: ₹{payload[0].value.toLocaleString('en-IN')}</p>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>Units Sold: {payload[0].payload.soldQty}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 5, 5, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Revenue Distribution (Pie) */}
          <div className={`p-5 rounded-2xl shadow-sm border transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
              Revenue Share %
            </h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={top5Revenue}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="revenue"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    stroke={isDarkMode ? '#1f2937' : '#fff'}
                  >
                    {top5Revenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>



        {/* Action Bar */}
        <div className={`flex justify-end gap-3 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <button
            onClick={() => exportToExcel(productStats, `product_performance_report.xlsx`)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition font-medium shadow-md active:scale-95"
          >
            Export Detailed Analytics
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
    <div className={`space-y-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : ''}`}>
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Reports & Analytics</h2>
      <div className={`rounded-xl shadow-lg p-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="flex flex-wrap gap-2 mb-4">
          {["payments", "sales", "products"].map(id => (
            <button
              key={id}
              onClick={() => setActiveReport(id)}
              className={`px-3 py-2 rounded-lg text-sm transition-all font-medium ${activeReport === id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
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
