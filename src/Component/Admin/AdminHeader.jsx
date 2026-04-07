import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut, Menu } from 'lucide-react';

const AdminHeader = ({ isSidebarOpen, setIsSidebarOpen, isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsDarkMode(!isDarkMode);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 250);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/Account');
  };

  const dayGradient = 'from-blue-400 via-cyan-500 to-blue-600';
  const nightGradient = 'from-indigo-900 via-purple-900 to-blue-900';

  return (
    <header className={`bg-gradient-to-r ${!isDarkMode ? dayGradient : nightGradient} shadow-xl sticky top-0 z-10 transition-all duration-1000 ${isTransitioning ? 'animate-pulse' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-white hover:bg-white/20 transition-all duration-200"
            >
              <Menu size={24} />
            </button>
          </div>
          
          {/* Theme toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center ${
                isDarkMode ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-gray-800/40 hover:bg-gray-700/50'
              } shadow-lg border border-white/20`}
              title={isDarkMode ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              <span className={`transition-all duration-500 ${isTransitioning ? 'rotate-180 opacity-0' : ''}`}>
                {!isDarkMode ? <Sun size={20} className="text-gray-800" /> : <Moon size={20} className="text-white" />}
              </span>
            </button>
            <span className="hidden sm:inline text-sm font-bold text-white tracking-wide uppercase">
              {!isDarkMode ? 'Day' : 'Night'}
            </span>
          </div>

          {/* User Profile - Top Right */}
          <div className="relative group">
            <div className={`bg-white/20 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white/30 shadow-lg cursor-pointer hover:bg-white/30 transition-all duration-300 ${isTransitioning ? 'animate-bounce' : ''}`}>
              K
            </div>
            
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="py-3">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Keshav</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all flex items-center space-x-2 font-medium"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full transition-all duration-1000 ${
          isTransitioning ? 'animate-ping' : (!isDarkMode ? 'animate-pulse' : 'animate-bounce')
        }`}></div>
        <div className={`absolute top-8 left-1/4 w-16 h-16 bg-white/5 rounded-full transition-all duration-1000 ${
          isTransitioning ? 'animate-spin' : (!isDarkMode ? 'animate-bounce' : 'animate-pulse')
        }`} style={{animationDelay: '1s'}}></div>
        <div className={`absolute -bottom-2 left-1/3 w-20 h-20 bg-white/10 rounded-full transition-all duration-1000 ${
          isTransitioning ? 'animate-pulse' : (!isDarkMode ? 'animate-pulse' : 'animate-bounce')
        }`} style={{animationDelay: '2s'}}></div>
        
        {/* Transition overlay */}
        {isTransitioning && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 animate-pulse"></div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;