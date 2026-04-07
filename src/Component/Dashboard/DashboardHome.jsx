import React from 'react';
import { 
  BarChart3, 
  IndianRupee, 
  FileText, 
  Plus, 
  History,
  TrendingUp,
  Package
} from 'lucide-react';

const DashboardHome = ({ handleCreateBill, isDarkMode }) => {
  return (
    <div className="p-4 md:p-6 space-y-6 relative overflow-hidden">
      {/* Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-20 animate-pulse-slow blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-25 animate-float blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full opacity-15 animate-bounce-slow blur-md"></div>
      </div>
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 backdrop-blur-sm bg-white/90 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 relative z-10 group">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Quick Actions</h2>
          <p className="text-sm text-gray-600">Start a new billing transaction</p>
        </div>
        <button
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md text-lg transform hover:scale-105 hover:shadow-xl hover:shadow-blue-300/50 group-hover:animate-pulse flex items-center justify-center gap-2"
          onClick={handleCreateBill}
        >
          <Plus size={24} /> Create New Bill
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-4 md:p-6 border border-green-200 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-green-200/50 animate-slideInLeft group hover:rotate-1">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm md:text-base font-medium text-gray-700">Today's Sales</span>
            <IndianRupee size={24} className="text-green-600/50 group-hover:animate-bounce" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-green-600 animate-pulse">₹1,234</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-4 md:p-6 border border-blue-200 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/50 animate-slideInUp group hover:-rotate-1" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm md:text-base font-medium text-gray-700">Bills Created</span>
            <FileText size={24} className="text-blue-600/50 group-hover:animate-bounce" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-blue-600 animate-pulse">23</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-4 md:p-6 border border-purple-200 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/50 animate-slideInRight group hover:rotate-1" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm md:text-base font-medium text-gray-700">Items Sold</span>
            <Package size={24} className="text-purple-600/50 group-hover:animate-bounce" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-purple-600 animate-pulse">45</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 backdrop-blur-sm bg-white/90 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 transform hover:scale-[1.01] border border-gray-100 relative z-10">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <History size={24} className="text-blue-600" /> Recent Transactions
          </h2>
          <p className="text-sm text-gray-600">Your latest billing activities</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-all transform hover:scale-[1.02] hover:shadow-blue-200/30 animate-slideInLeft group">
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:animate-pulse">
                <FileText size={20} />
              </div>
              <div>
                <div className="font-bold text-blue-600 hover:text-blue-800 transition-colors">INV-045</div>
                <div className="text-gray-700">Michael Brown</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600 animate-pulse">₹156.00</div>
              <div className="text-sm text-gray-500">10 min ago</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-all transform hover:scale-[1.02] hover:shadow-blue-200/30 animate-slideInRight group" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:animate-pulse">
                <FileText size={20} />
              </div>
              <div>
                <div className="font-bold text-blue-600 hover:text-blue-800 transition-colors">INV-044</div>
                <div className="text-gray-700">Lisa Anderson</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600 animate-pulse">₹234.00</div>
              <div className="text-sm text-gray-500">1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;