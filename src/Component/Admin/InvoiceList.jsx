import React, { useEffect, useState } from "react";
import axios from "axios";

const InvoiceList = ({ bills, setBills }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Fetch invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/billing/invoices");
        setBills(res.data.sort((a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate)));
      } catch (err) {
        console.error("Error fetching invoices", err);
      }
    };
    fetchInvoices();
  }, [setBills]);

  const filteredBills = bills.filter((bill) => {
    const search = searchTerm.toLowerCase();
    return (
      bill.invoiceNumber?.toLowerCase().includes(search) ||
      bill.customer?.name?.toLowerCase().includes(search) ||
      bill.customer?.phone?.toString().includes(search)
    );
  });

  // Professional Print functionality
  const printInvoice = () => {
    const printContent = document.getElementById("invoice-print-layout").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h1, h2, h3 { margin: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .header, .footer { width: 100%; margin-bottom: 20px; }
            .header-logo { max-width: 120px; }
            .totals { margin-top: 20px; width: 50%; float: right; }
            .totals td { border: none; }
            .balance { font-weight: bold; font-size: 16px; }
            hr { border: none; border-top: 1px solid #ccc; margin: 20px 0; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedInvoice ? "hidden" : "auto";
  }, [selectedInvoice]);

  return (
    <>
      {/* Main Table */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="mb-4 max-w-md relative">
          <input
            type="text"
            placeholder="Search by Invoice No, Name or Mobile"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {filteredBills.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No invoices found</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full min-w-[600px] text-sm sm:text-base">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Invoice No</th>
                  <th className="px-3 py-2 text-left font-semibold">Customer</th>
                  <th className="px-3 py-2 text-left font-semibold">Mobile</th>
                  <th className="px-3 py-2 text-left font-semibold">Company</th>
                  <th className="px-3 py-2 text-left font-semibold">Total</th>
                  <th className="px-3 py-2 text-left font-semibold">Advance</th>
                  <th className="px-3 py-2 text-left font-semibold">Balance</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setSelectedInvoice(bill)}
                  >
                    <td className="px-3 py-2">{bill.invoiceNumber}</td>
                    <td className="px-3 py-2">{bill.customer?.name}</td>
                    <td className="px-3 py-2">{bill.customer?.phone}</td>
                    <td className="px-3 py-2">{bill.company?.name || "-"}</td>
                    <td className="px-3 py-2 font-medium">₹{bill.totalAmount || 0}</td>
                    <td className="px-3 py-2">₹{bill.advanceAmount || 0}</td>
                    <td className={`px-3 py-2 font-medium ${
                        bill.balanceAmount === 0 ? "text-green-600"
                        : bill.balanceAmount < bill.totalAmount ? "text-yellow-600"
                        : "text-red-600"
                    }`}>₹{bill.balanceAmount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-start md:items-center bg-black bg-opacity-50 overflow-auto">
          <div className="bg-white w-full sm:w-11/12 md:w-3/4 lg:w-1/2 rounded-xl shadow-xl p-4 sm:p-6 relative my-8 sm:my-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>

            <div id="invoice-modal-content" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">
                Invoice #{selectedInvoice.invoiceNumber}
              </h2>

              {/* Print Layout */}
              <div id="invoice-print-layout">
                <div className="header flex justify-between items-center mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{selectedInvoice.company?.name || "-"}</h1>
                    <p>{selectedInvoice.company?.address || ""}</p>
                    <p>Phone: {selectedInvoice.company?.phone || "-"}</p>
                  </div>
                  <div>
                    {selectedInvoice.company?.logo && (
                      <img
                        src={selectedInvoice.company.logo}
                        alt="Logo"
                        className="header-logo"
                      />
                    )}
                  </div>
                </div>

                <hr />

                <div className="flex justify-between mt-2 mb-4">
                  <div>
                    <p><strong>Customer:</strong> {selectedInvoice.customer?.name}</p>
                    <p><strong>Mobile:</strong> {selectedInvoice.customer?.phone}</p>
                    <p><strong>Address:</strong> {selectedInvoice.customer?.address || "-"}</p>
                  </div>
                  <div className="text-right">
                    <p><strong>Invoice No:</strong> {selectedInvoice.invoiceNumber}</p>
                    <p><strong>Date:</strong> {new Date(selectedInvoice.invoiceDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong>{" "}
                      {selectedInvoice.balanceAmount === 0
                        ? "Paid"
                        : selectedInvoice.balanceAmount < selectedInvoice.totalAmount
                        ? "Partially Paid"
                        : "Pending"}
                    </p>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Amount</td>
                      <td className="text-right">₹{selectedInvoice.totalAmount || 0}</td>
                    </tr>
                    <tr>
                      <td>Advance Paid</td>
                      <td className="text-right">₹{selectedInvoice.advanceAmount || 0}</td>
                    </tr>
                    <tr className="balance">
                      <td>Balance</td>
                      <td className="text-right">₹{selectedInvoice.balanceAmount || 0}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="footer mt-8 text-center text-sm text-gray-600">
                  Thank you for your business!
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={printInvoice}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Print
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceList;
