import React from 'react';

const CustomersList = ({ isDarkMode, onCreateInvoice }) => {
  const [customerSearchTerm, setCustomerSearchTerm] = React.useState('');
  const [editingCustomer, setEditingCustomer] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [customerFormData, setCustomerFormData] = React.useState({
    name: '',
    phone: '',
    gst: '',
    address: ''
  });

  const addNewCustomer = () => {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const newCustomer = {
      id: Date.now(),
      ...customerFormData,
      totalBills: 0,
      lastBillDate: 'Never'
    };
    customers.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(customers));
    setShowAddModal(false);
    setCustomerFormData({ name: '', phone: '', gst: '', address: '' });
    alert('Customer added successfully!');
  };

  const editCustomer = (customer) => {
    setEditingCustomer(customer);
    setCustomerFormData({
      name: customer.name,
      phone: customer.phone,
      gst: customer.gst,
      address: customer.address
    });
  };

  const deleteCustomer = (customerId) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const updatedCustomers = customers.filter(c => c.id !== customerId);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      alert('Customer deleted successfully!');
      setCustomerSearchTerm(prev => prev + ' ');
      setCustomerSearchTerm(prev => prev.trim());
    }
  };

  const saveCustomerEdit = () => {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const updatedCustomers = customers.map(c => 
      c.id === editingCustomer.id 
        ? { ...c, ...customerFormData }
        : c
    );
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setEditingCustomer(null);
    alert('Customer updated successfully!');
  };

  const closeCustomerEdit = () => {
    setEditingCustomer(null);
    setShowAddModal(false);
    setCustomerFormData({ name: '', phone: '', gst: '', address: '' });
  };

  const setActiveSection = (section) => {
    console.log('Navigate to:', section);
  };
  const savedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
  
  // Add sample data if no customers exist
  React.useEffect(() => {
    if (savedCustomers.length === 0) {
      const sampleCustomers = [
        {
          id: 1,
          name: 'John Doe',
          phone: '9876543210',
          gst: '27XXXXX1234X1ZX',
          address: '123 Main Street, City - 400001',
          totalBills: 5,
          lastBillDate: new Date().toLocaleDateString()
        },
        {
          id: 2,
          name: 'Jane Smith',
          phone: '9876543211',
          gst: '27XXXXX1234X1ZY',
          address: '456 Oak Avenue, City - 400002',
          totalBills: 3,
          lastBillDate: new Date().toLocaleDateString()
        }
      ];
      localStorage.setItem('customers', JSON.stringify(sampleCustomers));
    }
  }, []);
  
  const filteredCustomers = savedCustomers.filter(customer => 
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.phone.includes(customerSearchTerm) ||
    customer.gst.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">👥</span> Customer List
            </h2>
            <p className="text-sm text-gray-600">Manage your customer database</p>
          </div>
          <div className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search customers..."
              className="w-full md:w-80 pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              value={customerSearchTerm}
              onChange={(e) => setCustomerSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
        
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-lg mb-4">{customerSearchTerm ? 'No customers found matching your search.' : 'No customers found. Create your first bill to add customers!'}</p>
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
              onClick={() => setActiveSection('create-bill')}
            >
              ➕ Add New Customer
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredCustomers.map(customer => (
                <div key={customer.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border hover:shadow-md transition-all">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{customer.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2">📞 {customer.phone}</p>
                      <p className="flex items-center gap-2">🏢 {customer.gst}</p>
                      <p className="flex items-center gap-2">📍 {customer.address}</p>
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-500">
                      <span>Bills: {customer.totalBills}</span>
                      <span>Last: {customer.lastBillDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600 transition-colors"
                      onClick={() => onCreateInvoice && onCreateInvoice(customer)}
                    >
                      📄 Create Invoice
                    </button>
                    <button 
                      className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                      onClick={() => editCustomer(customer)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="flex-1 bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 transition-colors"
                      onClick={() => deleteCustomer(customer.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button 
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                onClick={() => setShowAddModal(true)}
              >
                ➕ Add New Customer
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Customer Edit/Add Modal */}
      {(editingCustomer || showAddModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingCustomer ? 'Edit Customer Details' : 'Add New Customer'}
                </h3>
                <button onClick={closeCustomerEdit} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <input 
                    type="text" 
                    value={customerFormData.name}
                    onChange={(e) => setCustomerFormData({...customerFormData, name: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={customerFormData.phone}
                    onChange={(e) => setCustomerFormData({...customerFormData, phone: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input 
                    type="text" 
                    value={customerFormData.gst}
                    onChange={(e) => setCustomerFormData({...customerFormData, gst: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea 
                    value={customerFormData.address}
                    onChange={(e) => setCustomerFormData({...customerFormData, address: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={editingCustomer ? saveCustomerEdit : addNewCustomer} 
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  {editingCustomer ? 'Save Changes' : 'Add Customer'}
                </button>
                <button 
                  onClick={closeCustomerEdit} 
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

export default CustomersList;