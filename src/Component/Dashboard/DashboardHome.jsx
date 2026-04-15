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
    <div className="p-4 md:p-6 space-y-6 relative overflow-hidden h-full">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-64 h-64 rounded-full opacity-20 animate-pulse-slow blur-3xl ${
          isDarkMode ? 'bg-blue-900/40' : 'bg-blue-300'
        }`}></div>
        <div className={`absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-25 animate-float blur-2xl ${
          isDarkMode ? 'bg-purple-900/40' : 'bg-purple-300'
        }`}></div>
      </div>

      {/* Quick Actions Card */}
      <div className={`rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-md transition-all duration-500 transform hover:scale-[1.01] border relative z-10 group overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700 hover:shadow-blue-900/20' 
          : 'bg-white/90 border-blue-50 hover:shadow-blue-200/50'
      }`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-600/20 transition-colors" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className={`text-2xl md:text-3xl font-black mb-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              New Transaction
            </h2>
            <p className={`text-base font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ready to create a new billing invoice?
            </p>
          </div>
          <button
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg text-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            onClick={handleCreateBill}
          >
            <Plus size={24} className="animate-bounce" /> Create Bill Now
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {[
          { label: "Today's Sales", value: "₹1,234", icon: IndianRupee, color: 'green', delay: '0s' },
          { label: "Bills Created", value: "23", icon: FileText, color: 'blue', delay: '0.1s' },
          { label: "Items Sold", value: "45", icon: Package, color: 'purple', delay: '0.2s' }
        ].map((stat, i) => (
          <div 
            key={i}
            className={`rounded-2xl shadow-lg p-6 border-2 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slideInUp group ${
              isDarkMode 
                ? `bg-gray-800/40 border-green-900/30 hover:border-green-500/50 shadow-green-900/20` 
                : `bg-white border-green-50 hover:border-green-200 shadow-green-100/50`
            }`}
            style={{ animationDelay: stat.delay }}
          >
            <div className="flex justify-between items-center mb-6">
              <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </span>
              <div className={`p-3 rounded-xl ${isDarkMode ? `bg-gray-700 text-blue-400` : `bg-blue-50 text-blue-600`}`}>
                <stat.icon size={22} className="group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className={`rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-md transition-all duration-500 border relative z-10 ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700' 
          : 'bg-white/90 border-gray-100'
      }`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-xl md:text-2xl font-black mb-1 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <History size={26} className="text-blue-500" /> Recent Activity
            </h2>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Your latest billing transactions
            </p>
          </div>
          <button className={`text-sm font-bold hover:underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>View All</button>
        </div>

        <div className="space-y-4">
          {[
            { id: 'INV-045', customer: 'Michael Brown', amount: '₹156.00', time: '10 min ago' },
            { id: 'INV-044', customer: 'Lisa Anderson', amount: '₹234.00', time: '1 hour ago' }
          ].map((tx, i) => (
            <div 
              key={i}
              className={`flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-xl border-2 transition-all transform hover:scale-[1.01] group ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500/50 hover:bg-gray-700' 
                  : 'bg-gray-50 border-gray-100 hover:border-blue-100 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-4 mb-3 md:mb-0">
                <div className={`p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-blue-900/40 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                  <FileText size={20} />
                </div>
                <div>
                  <div className={`font-black tracking-tight ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{tx.id}</div>
                  <div className={`text-base font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{tx.customer}</div>
                </div>
              </div>
              <div className="text-right w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-0 border-gray-200/10">
                <div className={`text-xl font-black ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{tx.amount}</div>
                <div className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{tx.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;