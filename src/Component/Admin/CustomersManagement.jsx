import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  UserPlus,
  X,
  MapPin,
  Phone
} from 'lucide-react';

const CustomersManagement = ({ customers, setCustomers, isDarkMode }) => {
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
      const res = await api.get('/billing/customers');
      const allCustomers = res.data || [];
      
      // Deduplicate by phone and filter out invalid entries
      const uniqueMap = new Map();
      allCustomers.forEach(customer => {
        const phone = (customer.phone || '').trim();
        const name = (customer.name || '').trim();
        
        // Skip records that are empty or just dashes
        if (!phone || phone === '-' || !name || name === '-') return;
        
        // Prefer entries with more information (GST)
        if (!uniqueMap.has(phone) || (customer.gst && !uniqueMap.get(phone).gst)) {
          uniqueMap.set(phone, customer);
        }
      });
      
      setCustomers(Array.from(uniqueMap.values()));
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

  const validateForm = () => {
    if (/[^a-zA-Z\s]/.test(formData.name)) {
      alert("❌ Customer name cannot contain numbers or special characters!");
      return false;
    }
    if (formData.name.trim().length < 2) {
      alert("❌ Customer name must be at least 2 characters!");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      alert("❌ Please enter a valid 10-digit Indian mobile number!");
      return false;
    }
    if (formData.gst && !/^[0-9A-Z]{15}$/.test(formData.gst.toUpperCase())) {
      alert("❌ GST number must be exactly 15 alphanumeric characters!");
      return false;
    }

    // Check for duplicate phone number
    const isDuplicate = customers.some(c => c.phone === formData.phone && c.id !== editingCustomer?.id);
    if (isDuplicate) {
      alert("❌ A customer with this phone number already exists! Please search and use the existing customer.");
      return false;
    }

    if (formData.address.trim().length < 5) {
      alert("❌ Please enter a detailed address!");
      return false;
    }
    return true;
  };

  // ==========================
  // ADD CUSTOMER
  // ==========================
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await api.post('/billing/customer', formData);
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
    if (!validateForm()) return;
    try {
      const res = await api.put(`/billing/customer/${editingCustomer.id}`, formData);
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
    if (!window.confirm('Are you sure you want to delete this customer? This will also delete all related invoices.')) return;

    try {
      // First, fetch all invoices for this customer
      const invoicesResponse = await api.get('/billing/invoices');
      const customerInvoices = invoicesResponse.data.filter(inv => inv.customer?.id === customerId);

      // Delete all related invoices first
      for (const invoice of customerInvoices) {
        await api.delete(`/billing/invoice/${invoice.id}`);
      }

      // Now delete the customer
      const response = await api.delete(`/billing/customer/${customerId}`);

      if (response.status === 200 || response.status === 204) {
        setCustomers(customers.filter(c => c.id !== customerId));
        alert(`Customer and ${customerInvoices.length} related invoice(s) deleted successfully!`);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer. Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <div>
          <h2 className={`text-lg sm:text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <Users className="text-blue-600" size={28} /> Customers Management
          </h2>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your customer database
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add Customer
        </button>
      </div>

      {/* Search */}
      <div className={`rounded-xl shadow-lg p-3 sm:p-6 transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-3 py-3 text-sm border-2 rounded-xl outline-none transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-900/30' 
                  : 'bg-white border-gray-100 text-gray-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
              }`}
            />
          </div>
          <div className={`text-xs font-medium px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="text-center py-6 sm:py-12">
            <Users size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-sm sm:text-lg font-medium text-gray-800">
              No customers found
            </h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px]">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left py-2 px-2 sm:px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>
                    Name
                  </th>
                  <th className={`text-left py-2 px-2 sm:px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>
                    Phone
                  </th>
                  <th className={`text-left py-2 px-2 sm:px-4 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => (
                  <tr key={customer.id} className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                    <td className="py-2 px-2 sm:px-4">
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{customer.name}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {customer.address}
                      </p>
                    </td>
                    <td className={`py-2 px-2 sm:px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{customer.phone}</td>
                    <td className="py-2 px-2 sm:px-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="bg-blue-500 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                          title="Edit Customer"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="bg-red-500 text-white p-2.5 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                          title="Delete Customer"
                        >
                          <Trash2 size={20} />
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

      {/* ADD / EDIT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => { setShowAddModal(false); setEditingCustomer(null); }}>
          <div className={`rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-scaleIn ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`} onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <UserPlus className="text-blue-500" size={24} /> {editingCustomer ? 'Edit Customer' : 'Add Customer'}
                </h3>
                <button
                  onClick={() => { setShowAddModal(false); setEditingCustomer(null); }}
                  className={`transition-colors p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-400'}`}
                >
                  <X size={24} />
                </button>
              </div>

              <form
                onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Full Name</label>
                    <input
                      placeholder="Enter customer name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      pattern="^[a-zA-Z\s]+$"
                      title="Name can only contain letters and spaces. No special characters allowed."
                      className={`w-full p-3 border-2 rounded-xl outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-100 text-gray-900 focus:border-blue-500'
                      }`}
                      required
                    />
                </div>

                <div className="space-y-1">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Phone Number</label>
                    <input
                      placeholder="Enter phone number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      pattern="^[6-9]\d{9}$"
                      title="Please enter a valid 10-digit Indian mobile number."
                      className={`w-full p-3 border-2 rounded-xl outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-100 text-gray-900 focus:border-blue-500'
                      }`}
                      required
                    />
                </div>

                <div className="space-y-1">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>GST Number (Optional)</label>
                    <input
                      placeholder="Enter GST number"
                      value={formData.gst}
                      onChange={(e) => setFormData({ ...formData, gst: e.target.value.toUpperCase() })}
                      pattern="^[0-9A-Z]{15}$"
                      title="GST number must be exactly 15 alphanumeric characters."
                      className={`w-full p-3 border-2 rounded-xl outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-100 text-gray-900 focus:border-blue-500'
                      }`}
                    />
                </div>

                <div className="space-y-1">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Address</label>
                  <textarea
                    placeholder="Enter customer address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full p-3 border-2 rounded-xl outline-none transition-all resize-none ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-100 text-gray-900 focus:border-blue-500'
                      }`}
                    rows="3"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95"
                  >
                    {editingCustomer ? 'Update Customer' : 'Save Customer'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingCustomer(null);
                    }}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all active:scale-95 ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
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
