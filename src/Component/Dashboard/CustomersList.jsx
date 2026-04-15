import React from 'react';
import { customerAPI } from '../../services/api';
import { 
  Users, 
  Search, 
  Phone, 
  Building, 
  MapPin, 
  FileText, 
  Plus, 
  Clock,
  Loader2,
  X
} from 'lucide-react';

const CustomersList = ({ isDarkMode, onCreateInvoice }) => {
  const [customerSearchTerm, setCustomerSearchTerm] = React.useState('');
  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Fetch customers from API
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://backend-billing-software-ahxt.onrender.com/api/billing/customers', {
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
      
      <div className={`rounded-xl shadow-lg p-4 md:p-6 mb-6 backdrop-blur-sm transition-all duration-500 transform hover:scale-[1.01] border relative z-10 ${isDarkMode ? 'bg-gray-800/90 border-gray-700 hover:shadow-2xl hover:shadow-gray-900/50' : 'bg-white/90 border-gray-100 hover:shadow-2xl hover:shadow-purple-200/50'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className={`text-xl md:text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <Users className="text-blue-600" size={28} /> Customer List
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your customer database</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

            <div className="relative">
              <input 
                type="text" 
                placeholder="Search customers..."
                className={`w-full md:w-80 pl-10 pr-4 py-2 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800'}`}
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
              />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-lg font-medium">Loading customers...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Users size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-200'}`} />
            <p className="text-lg mb-4">{customerSearchTerm ? 'No customers found matching your search.' : 'No customers found. Create your first bill to add customers!'}</p>

          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredCustomers.map((customer, index) => (
                <div key={customer.id} className={`rounded-lg p-4 border hover:shadow-lg transition-all duration-300 transform hover:scale-[1.05] animate-slideInUp group hover:rotate-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:shadow-gray-900/40' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-purple-200/40'}`} style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="mb-4">
                    <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{customer.name}</h3>
                    <div className={`space-y-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <p className="flex items-center gap-2 font-medium"><Phone className="text-green-500" size={14} /> {customer.phone}</p>
                      <p className="flex items-center gap-2"><Building className="text-blue-500" size={14} /> {customer.gst}</p>
                      <p className="flex items-center gap-2"><MapPin className="text-red-500" size={14} /> {customer.address}</p>
                    </div>
                    <div className={`flex justify-between mt-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>Bills: {customer.totalBills}</span>
                      <span>Last: {customer.lastBillDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg text-sm font-bold hover:shadow-lg transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                      onClick={() => onCreateInvoice && onCreateInvoice(customer)}
                    >
                      <FileText size={16} /> View Invoices
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

export default CustomersList;