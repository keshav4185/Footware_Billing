import React from 'react';
import axios from 'axios';
import {
  UserCheck,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  X
} from 'lucide-react';

const API = 'https://backend-billing-software-ahxt.onrender.com/api/employees';

const EmployeesManagement = ({ isDarkMode }) => {
  const [employees, setEmployees] = React.useState([]);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '', phone: '', email: '', password: '', empId: ''
  });

  // LOAD EMPLOYEES
  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  const generateEmpId = () => {
    const lastEmp = employees[employees.length - 1];
    const lastNum = lastEmp ? parseInt(lastEmp.empId?.slice(3)) : 0;
    return `EMP${String(lastNum + 1).padStart(3, '0')}`;
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      phone: employee.phone,
      email: employee.email,
      password: '',
      empId: employee.empId
    });
    setShowAddForm(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      password: formData.password ? formData.password.trim() : null,
      empId: formData.empId.trim()
    };

    if (editingEmployee) {
      await axios.put(`${API}/${editingEmployee.id}`, trimmedData);
      alert('Employee updated successfully!');
    } else {
      await axios.post(API, {
        ...trimmedData,
        empId: trimmedData.empId || generateEmpId(),
        status: 'Active'
      });
      alert('Employee added successfully!');
    }

    fetchEmployees();
    setFormData({ name: '', phone: '', email: '', password: '', empId: '' });
    setEditingEmployee(null);
    setShowAddForm(false);
  };


  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await axios.delete(`${API}/${id}`);
      fetchEmployees();
      alert('Employee deleted successfully!');
    }
  };

  return (
    <div className={`p-3 md:p-6 transition-colors duration-300 ${isDarkMode ? 'bg-transparent text-white' : ''}`}>
      <div className={`rounded-xl shadow-lg p-4 md:p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className={`text-xl md:text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <UserCheck className="text-blue-600" size={28} /> Employee Management
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your team members</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md flex items-center gap-2"
          >
            <Plus size={18} /> Add Employee
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`border-b transition-colors ${isDarkMode ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50'}`}>
                <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Emp ID</th>
                <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</th>
                <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</th>
                <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</th>
                <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                <th className={`text-center p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id} className={`border-b transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-700/30' : 'hover:bg-gray-50'}`}>
                  <td className="p-4 font-medium text-blue-500">{employee.empId}</td>
                  <td className={`p-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{employee.name}</td>
                  <td className={`p-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{employee.phone}</td>
                  <td className={`p-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{employee.email}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-sm ${
                      employee.status === 'Active'
                        ? isDarkMode ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-green-100 text-green-700'
                        : isDarkMode ? 'bg-red-900/30 text-red-400 border border-red-800' : 'bg-red-100 text-red-700'
                    }`}>
                      {(employee.status || 'Active').toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="bg-blue-500 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                        title="Edit Employee"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => deleteEmployee(employee.id)}
                        className="bg-red-500 text-white p-2.5 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                        title="Delete Employee"
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

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {employees.map(employee => (
            <div key={employee.id} className={`rounded-lg p-4 border transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 shadow-md' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-blue-500">{employee.empId}</h3>
                  <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{employee.name}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'}`}>
                  {employee.status}
                </span>
              </div>
              <div className="space-y-2 mb-4 text-sm">
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-2`}><Phone size={14} className="text-blue-500" /> {employee.phone}</p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-2`}><Mail size={14} className="text-blue-500" /> {employee.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(employee)}
                  className="flex-1 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                  title="Edit Employee"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="flex-1 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                  title="Delete Employee"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <UserCheck className="text-blue-600" size={24} /> {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                </h3>
                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Employee Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-900/50' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-100'}`}
                    placeholder="Enter employee name"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-900/50' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-100'}`}
                    placeholder="Enter phone number"
                    maxLength="10"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-900/50' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-100'}`}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password {editingEmployee ? '(Leave blank to keep current)' : '*'}</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-900/50' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-100'}`}
                    placeholder={editingEmployee ? "Leave blank to keep current password" : "Enter password"}
                    required={!editingEmployee}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Employee ID</label>
                  <input
                    type="text"
                    value={formData.empId}
                    onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
                    className={`w-full p-3 border-2 rounded-lg focus:ring-2 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-900/50' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-100'}`}
                    placeholder={`Auto-generated: ${generateEmpId()}`}
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                  >
                    {editingEmployee ? 'Update Employee' : 'Add Employee'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
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

export default EmployeesManagement;