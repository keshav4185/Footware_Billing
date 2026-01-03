import React from 'react';

const EmployeesManagement = () => {
  const [employees, setEmployees] = React.useState([]);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '', phone: '', email: '', password: '', empId: ''
  });

  React.useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    if (savedEmployees.length === 0) {
      const sampleEmployees = [
        { id: 1, name: 'John Doe', phone: '9876543210', email: 'john@company.com', empId: 'EMP001', status: 'Active' },
        { id: 2, name: 'Jane Smith', phone: '9876543211', email: 'jane@company.com', empId: 'EMP002', status: 'Active' }
      ];
      localStorage.setItem('employees', JSON.stringify(sampleEmployees));
      setEmployees(sampleEmployees);
    } else {
      setEmployees(savedEmployees);
    }
  }, []);

  const generateEmpId = () => {
    const lastEmp = employees.sort((a, b) => b.id - a.id)[0];
    const lastNum = lastEmp ? parseInt(lastEmp.empId.slice(3)) : 0;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill all required fields!');
      return;
    }

    if (editingEmployee) {
      const updatedEmployees = employees.map(emp => 
        emp.id === editingEmployee.id 
          ? { ...emp, ...formData, password: formData.password || emp.password }
          : emp
      );
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      alert('Employee updated successfully!');
    } else {
      if (!formData.password) {
        alert('Password is required for new employee!');
        return;
      }
      const newEmployee = {
        id: Date.now(),
        ...formData,
        empId: formData.empId || generateEmpId(),
        status: 'Active'
      };
      const updatedEmployees = [...employees, newEmployee];
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      alert('Employee added successfully!');
    }
    
    setFormData({ name: '', phone: '', email: '', password: '', empId: '' });
    setEditingEmployee(null);
    setShowAddForm(false);
  };

  const deleteEmployee = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      alert('Employee deleted successfully!');
    }
  };

  return (
    <div className="p-3 md:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">👨‍💼</span> Employee Management
            </h2>
            <p className="text-sm text-gray-600">Manage your team members</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md flex items-center gap-2"
          >
            <span>➕</span> Add Employee
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4 font-semibold text-gray-700">Emp ID</th>
                <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                <th className="text-left p-4 font-semibold text-gray-700">Phone</th>
                <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-blue-600">{employee.empId}</td>
                  <td className="p-4 text-gray-800">{employee.name}</td>
                  <td className="p-4 text-gray-600">{employee.phone}</td>
                  <td className="p-4 text-gray-600">{employee.email}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteEmployee(employee.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
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
          {employees.map(employee => (
            <div key={employee.id} className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-blue-600">{employee.empId}</h3>
                  <p className="text-gray-800 font-medium">{employee.name}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {employee.status}
                </span>
              </div>
              <div className="space-y-1 mb-3 text-sm">
                <p className="text-gray-600">📞 {employee.phone}</p>
                <p className="text-gray-600">📧 {employee.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(employee)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">👨‍💼</span> Add New Employee
                </h3>
                <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter employee name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^0-9]/g, '')})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter phone number"
                    maxLength="10"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password {editingEmployee ? '(Leave blank to keep current)' : '*'}</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder={editingEmployee ? "Leave blank to keep current password" : "Enter password"}
                    required={!editingEmployee}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    value={formData.empId}
                    onChange={(e) => setFormData({...formData, empId: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
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