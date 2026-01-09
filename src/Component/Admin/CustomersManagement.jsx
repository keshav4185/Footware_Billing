import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomersManagement = ({ customers, setCustomers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gst: '',
    address: ''
  });

  // ==========================
  // FETCH ALL CUSTOMERS
  // ==========================
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/billing/customers'
      );
      setCustomers(res.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // ==========================
  // SEARCH (NAME / PHONE ONLY)
  // ==========================
  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  // ==========================
  // ADD CUSTOMER
  // ==========================
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8080/api/billing/customer',
        formData
      );
      setCustomers([...customers, res.data]);
      setFormData({ name: '', phone: '', gst: '', address: '' });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  // ==========================
  // EDIT CUSTOMER
  // ==========================
  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      gst: customer.gst,
      address: customer.address
    });
    setShowAddModal(true);
  };

  // ==========================
  // UPDATE CUSTOMER
  // ==========================
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/billing/customer/${editingCustomer.id}`,
        formData
      );
      setCustomers(
        customers.map(c =>
          c.id === editingCustomer.id ? res.data : c
        )
      );
      setEditingCustomer(null);
      setShowAddModal(false);
      setFormData({ name: '', phone: '', gst: '', address: '' });
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  // ==========================
  // DELETE CUSTOMER
  // ==========================
  const handleDeleteCustomer = async (customerId) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/billing/customer/${customerId}`
      );
      setCustomers(customers.filter(c => c.id !== customerId));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
            Customers Management
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your customer database
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md w-full sm:w-auto"
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
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-xs text-gray-500">
            {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>

        {/* Table */}
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-6 sm:py-12">
            <div className="text-3xl sm:text-6xl mb-3">👥</div>
            <h3 className="text-sm sm:text-lg font-medium text-gray-800">
              No customers found
            </h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 sm:px-4 text-xs sm:text-sm">
                    Name
                  </th>
                  <th className="text-left py-2 px-2 sm:px-4 text-xs sm:text-sm">
                    Phone
                  </th>
                  <th className="text-left py-2 px-2 sm:px-4 text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2 sm:px-4">
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-gray-500">
                        {customer.address}
                      </p>
                    </td>
                    <td className="py-2 px-2 sm:px-4">{customer.phone}</td>
                    <td className="py-2 px-2 sm:px-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs"
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

      {/* ADD / EDIT MODAL (EMAIL REMOVED) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="p-4">
              <h3 className="text-lg font-bold mb-3">
                {editingCustomer ? 'Edit Customer' : 'Add Customer'}
              </h3>

              <form
                onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
                className="space-y-3"
              >
                <input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />

                <input
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />

                <input
                  placeholder="GST"
                  value={formData.gst}
                  onChange={(e) =>
                    setFormData({ ...formData, gst: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />

                <textarea
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows="2"
                  required
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    {editingCustomer ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingCustomer(null);
                    }}
                    className="flex-1 bg-gray-500 text-white py-2 rounded"
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
