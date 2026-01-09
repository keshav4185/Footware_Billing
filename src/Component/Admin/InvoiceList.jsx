import React, { useEffect, useState } from "react";
import axios from "axios";

const InvoiceList = ({ bills, setBills }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Fetch all invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/billing/invoices"
        );
        setBills(res.data);
      } catch (err) {
        console.error("Error fetching invoices", err);
      }
    };
    fetchInvoices();
  }, [setBills]);

  // 🔹 Search: invoice number / customer name / mobile
  const filteredBills = bills.filter((bill) => {
    const search = searchTerm.toLowerCase();

    return (
      bill.invoiceNumber?.toLowerCase().includes(search) ||
      bill.customer?.name?.toLowerCase().includes(search) ||
      bill.customer?.phone?.toString().includes(search)
    );
  });

  return (
    <div className="p-4 sm:p-6">
      {/* 🔍 Search Bar */}
      <div className="mb-4 max-w-md relative">
        <input
          type="text"
          placeholder="Search by Invoice No, Name or Mobile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* 📄 Invoice Table */}
      {filteredBills.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No invoices found
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Invoice No</th>
                <th className="px-4 py-2 text-left font-semibold">Customer</th>
                <th className="px-4 py-2 text-left font-semibold">Mobile</th>
                <th className="px-4 py-2 text-left font-semibold">Email</th>
                <th className="px-4 py-2 text-left font-semibold">Company</th>
                <th className="px-4 py-2 text-left font-semibold">Total</th>
                <th className="px-4 py-2 text-left font-semibold">Advance</th>
                <th className="px-4 py-2 text-left font-semibold">Balance</th>
              </tr>
            </thead>

            <tbody>
              {filteredBills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{bill.invoiceNumber}</td>
                  <td className="px-4 py-2">{bill.customer?.name}</td>
                  <td className="px-4 py-2">{bill.customer?.phone}</td>
                  <td className="px-4 py-2">{bill.customer?.email}</td>
                  <td className="px-4 py-2">{bill.company?.name}</td>
                  <td className="px-4 py-2 font-medium">
                    ₹{bill.totalAmount || 0}
                  </td>
                  <td className="px-4 py-2">
                    ₹{bill.advanceAmount || 0}
                  </td>
                  <td className="px-4 py-2 text-red-600 font-medium">
                    ₹{bill.balanceAmount || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
