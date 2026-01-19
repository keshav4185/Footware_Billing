import React from 'react';
import { customerAPI } from '../../services/api';
import { 
  FaUsers, 
  FaSearch, 
  FaPhone, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaFileInvoice, 
  FaPlus, 
  FaClock
} from 'react-icons/fa';

const CustomersList = ({ isDarkMode, onCreateInvoice }) => {
  const [customerSearchTerm, setCustomerSearchTerm] = React.useState('');
  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showAddCustomer, setShowAddCustomer] = React.useState(false);
  const [newCustomer, setNewCustomer] = React.useState({
    name: '', phone: '', gst: '', address: ''
  });

  // Fetch customers from API
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/billing/customers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched customers:', data);
      
      // Handle different response formats
      let customersArray = [];
      if (Array.isArray(data)) {
        customersArray = data;
      } else if (data && Array.isArray(data.content)) {
        customersArray = data.content;
      } else if (data && Array.isArray(data.customers)) {
        customersArray = data.customers;
      }
      
      const mappedCustomers = customersArray.map(customer => ({
        id: customer.id,
        name: customer.name || 'N/A',
        phone: customer.phone || 'N/A',
        gst: customer.gst || 'N/A',
        address: customer.address || 'N/A',
        totalBills: customer.totalBills || 0,
        lastBillDate: customer.lastBillDate || 'Never'
      }));
      
      setCustomers(mappedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Fallback to localStorage
      const savedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
      setCustomers(savedCustomers);
    } finally {
      setLoading(false);
    }
  };

  // Add new customer
  const addNewCustomer = async () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) {
      alert('❌ Name and phone are required!');
      return;
    }
    
    try {
      const response = await customerAPI.create(newCustomer);
      setCustomers([...customers, {
        id: response.data.id,
        ...newCustomer,
        totalBills: 0,
        lastBillDate: 'Never'
      }]);
      setNewCustomer({ name: '', phone: '', gst: '', address: '' });
      setShowAddCustomer(false);
      alert('✅ Customer added successfully!');
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('❌ Error adding customer!');
    }
  };

  // Load customers on component mount
  React.useEffect(() => {
    fetchCustomers();
  }, []);



  const setActiveSection = (section) => {
    console.log('Navigate to:', section);
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.phone.includes(customerSearchTerm) ||
    customer.gst.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 relative overflow-hidden">
      {/* Geometric Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-blue-200 rounded-full opacity-30 animate-spin-slow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-4 border-purple-200 rotate-45 opacity-25 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-40 animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-pink-200 transform rotate-45 opacity-30 animate-float"></div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 backdrop-blur-sm bg-white/90 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-500 transform hover:scale-[1.01] border border-gray-100 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaUsers className="text-2xl text-blue-600" /> Customer List
            </h2>
            <p className="text-sm text-gray-600">Manage your customer database</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button 
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-md flex items-center gap-2"
              onClick={() => setShowAddCustomer(true)}
            >
              <FaPlus /> Add Customer
            </button>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search customers..."
                className="w-full md:w-80 pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <FaClock className="text-6xl mb-4 mx-auto text-blue-400" />
            <p className="text-lg">Loading customers...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FaUsers className="text-6xl mb-4 mx-auto text-gray-400" />
            <p className="text-lg mb-4">{customerSearchTerm ? 'No customers found matching your search.' : 'No customers found. Create your first bill to add customers!'}</p>
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md flex items-center gap-2 mx-auto"
              onClick={() => setActiveSection('create-bill')}
            >
              <FaPlus /> Add New Customer
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredCustomers.map((customer, index) => (
                <div key={customer.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border hover:shadow-lg transition-all duration-300 transform hover:scale-[1.05] hover:shadow-purple-200/40 animate-slideInUp group hover:rotate-1" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{customer.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2"><FaPhone className="text-green-600" /> {customer.phone}</p>
                      <p className="flex items-center gap-2"><FaBuilding className="text-blue-600" /> {customer.gst}</p>
                      <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-600" /> {customer.address}</p>
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-500">
                      <span>Bills: {customer.totalBills}</span>
                      <span>Last: {customer.lastBillDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded text-sm hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg flex items-center justify-center gap-1 group-hover:animate-pulse"
                      onClick={() => onCreateInvoice && onCreateInvoice(customer)}
                    >
                      <FaFileInvoice className="animate-bounce" /> View Invoices
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </>
        )}
      </div>

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAddCustomer(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaPlus className="text-green-600" /> Add New Customer
                </h3>
                <button onClick={() => setShowAddCustomer(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    placeholder="Enter customer name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    placeholder="Enter phone number"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
                    placeholder="Enter GST number (optional)"
                    value={newCustomer.gst}
                    onChange={(e) => setNewCustomer({...newCustomer, gst: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea 
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" 
                    rows="3" 
                    placeholder="Enter address (optional)"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  ></textarea>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowAddCustomer(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={addNewCustomer}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                >
                  Add Customer
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