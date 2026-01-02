import React, { useState } from 'react';

const CustomersManagement = ({ customers, setCustomers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gst: '',
    address: ''
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setFormData({ name: '', phone: '', email: '', gst: '', address: '' });
    setShowAddModal(false);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setShowAddModal(true);
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    const updatedCustomers = customers.map(customer =>
      customer.id === editingCustomer.id ? { ...formData } : customer
    );
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setFormData({ name: '', phone: '', email: '', gst: '', address: '' });
    setShowAddModal(false);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Customers Management</h2>
          <p className="text-sm sm:text-base text-gray-600">Manage your customer database</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto"
        >
          + Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="text-xs text-gray-500">
            {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>

        {/* Customers Table */}
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-6 sm:py-12">
            <div className="text-3xl sm:text-6xl mb-3">👥</div>
            <h3 className="text-sm sm:text-lg font-medium text-gray-800 mb-2">No customers found</h3>
            <p className="text-xs sm:text-base text-gray-500">Add your first customer to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-1 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Name</th>
                  <th className="text-left py-2 px-1 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Phone</th>
                  <th className="text-left py-2 px-1 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm hidden md:table-cell">Email</th>
                  <th className="text-left py-2 px-1 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-1 sm:px-4">
                      <div>
                        <p className="font-medium text-gray-800 text-xs sm:text-base truncate">{customer.name}</p>
                        <p className="text-xs text-gray-500 truncate">{customer.address}</p>
                      </div>
                    </td>
                    <td className="py-2 px-1 sm:px-4 text-gray-700 text-xs sm:text-sm">{customer.phone}</td>
                    <td className="py-2 px-1 sm:px-4 text-gray-700 text-xs sm:text-sm hidden md:table-cell">{customer.email || 'N/A'}</td>
                    <td className="py-2 px-1 sm:px-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                        >
                          Del
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm max-h-[95vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCustomer(null);
                    setFormData({ name: '', phone: '', email: '', gst: '', address: '' });
                  }}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                  <input
                    type="text"
                    value={formData.gst}
                    onChange={(e) => setFormData({...formData, gst: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows="2"
                    required
                  />
                </div>
                
                <div className="flex gap-2 pt-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all text-sm"
                  >
                    {editingCustomer ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingCustomer(null);
                      setFormData({ name: '', phone: '', email: '', gst: '', address: '' });
                    }}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-all text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersManagement;