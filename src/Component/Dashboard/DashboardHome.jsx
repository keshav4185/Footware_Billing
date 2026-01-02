import React from 'react';

const DashboardHome = ({ handleCreateBill, isDarkMode }) => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Quick Actions</h2>
          <p className="text-sm text-gray-600">Start a new billing transaction</p>
        </div>
        <button 
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md text-lg"
          onClick={handleCreateBill}
        >
          ➕ Create New Bill
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-4 md:p-6 border border-green-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm md:text-base font-medium text-gray-700">Today's Sales</span>
            <span className="text-2xl">💰</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-green-600">₹1,234</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-4 md:p-6 border border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm md:text-base font-medium text-gray-700">Bills Created</span>
            <span className="text-2xl">📄</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-blue-600">23</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-4 md:p-6 border border-purple-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm md:text-base font-medium text-gray-700">Items Sold</span>
            <span className="text-2xl">📦</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-purple-600">45</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Recent Transactions</h2>
          <p className="text-sm text-gray-600">Your latest billing activities</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <span className="text-2xl">📄</span>
              <div>
                <div className="font-bold text-blue-600">INV-045</div>
                <div className="text-gray-700">Michael Brown</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600">₹156.00</div>
              <div className="text-sm text-gray-500">10 min ago</div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <span className="text-2xl">📄</span>
              <div>
                <div className="font-bold text-blue-600">INV-044</div>
                <div className="text-gray-700">Lisa Anderson</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600">₹234.00</div>
              <div className="text-sm text-gray-500">1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;