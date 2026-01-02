import React from 'react';

const BillingsList = ({ isDarkMode }) => {
  const [billSearchTerm, setBillSearchTerm] = React.useState('');

  const togglePaymentStatus = (billId) => {
    const bills = JSON.parse(localStorage.getItem('billings') || '[]');
    const updatedBills = bills.map(bill => 
      bill.id === billId 
        ? { ...bill, paymentStatus: bill.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid' }
        : bill
    );
    localStorage.setItem('billings', JSON.stringify(updatedBills));
    setBillSearchTerm(prev => prev + ' ');
    setBillSearchTerm(prev => prev.trim());
  };

  const viewBill = (bill) => {
    alert('View bill functionality');
  };

  const printBill = (bill) => {
    alert('Print bill functionality');
  };

  const deleteBill = (billId) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      const bills = JSON.parse(localStorage.getItem('billings') || '[]');
      const updatedBills = bills.filter(bill => bill.id !== billId);
      localStorage.setItem('billings', JSON.stringify(updatedBills));
      alert('Bill deleted successfully!');
      setBillSearchTerm(prev => prev + ' ');
      setBillSearchTerm(prev => prev.trim());
    }
  };
  const savedBills = JSON.parse(localStorage.getItem('billings') || '[]');
  const filteredBills = savedBills.filter(bill => 
    bill.invoiceNo.toLowerCase().includes(billSearchTerm.toLowerCase()) ||
    bill.customerName.toLowerCase().includes(billSearchTerm.toLowerCase()) ||
    bill.customerPhone.includes(billSearchTerm) ||
    bill.amount.toString().includes(billSearchTerm)
  );

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">📄</span> My Billings
            </h2>
            <p className="text-sm text-gray-600">View and manage your billing history</p>
          </div>
          <div className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search bills..."
              className="w-full md:w-80 pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              value={billSearchTerm}
              onChange={(e) => setBillSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
        
        {filteredBills.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-lg">{billSearchTerm ? 'No bills found matching your search.' : 'No bills found. Create your first bill!'}</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold text-gray-700">Invoice No.</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Payment</th>
                    <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map(bill => (
                    <tr key={bill.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-blue-600">{bill.invoiceNo}</td>
                      <td className="p-4 text-gray-800">{bill.customerName}</td>
                      <td className="p-4 text-gray-600">{bill.date}</td>
                      <td className="p-4 font-semibold text-green-600">₹{bill.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {bill.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => togglePaymentStatus(bill.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            (bill.paymentStatus || 'Unpaid') === 'Paid' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          <span>{(bill.paymentStatus || 'Unpaid') === 'Paid' ? '✅' : '❌'}</span>
                          {bill.paymentStatus || 'Unpaid'}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <button 
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                            onClick={() => viewBill(bill)}
                          >
                            👁️ View
                          </button>
                          <button 
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                            onClick={() => printBill(bill)}
                          >
                            🖨️ Print
                          </button>
                          <button 
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                            onClick={() => deleteBill(bill.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredBills.map(bill => (
                <div key={bill.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-blue-600">{bill.invoiceNo}</h3>
                      <p className="text-gray-800 font-medium">{bill.customerName}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {bill.status}
                      </span>
                      <button 
                        onClick={() => togglePaymentStatus(bill.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          (bill.paymentStatus || 'Unpaid') === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <span>{(bill.paymentStatus || 'Unpaid') === 'Paid' ? '✅' : '❌'}</span>
                        {bill.paymentStatus || 'Unpaid'}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 text-sm">{bill.date}</span>
                    <span className="font-bold text-green-600">₹{bill.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                      onClick={() => viewBill(bill)}
                    >
                      👁️ View
                    </button>
                    <button 
                      className="flex-1 bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600 transition-colors"
                      onClick={() => printBill(bill)}
                    >
                      🖨️ Print
                    </button>
                    <button 
                      className="flex-1 bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 transition-colors"
                      onClick={() => deleteBill(bill.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillingsList;