import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Lock, User, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/admin/login', credentials);

      if (response.status === 200) {
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server not reachable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#0A0A0B]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      <div className="w-full max-w-[440px] relative z-10 animate-fadeInUp">
        {/* Logo/Icon Container */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-12 hover:rotate-0 transition-transform duration-500">
            <Lock className="text-white" size={36} />
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white mb-3 tracking-tight">Admin Portal</h1>
            <p className="text-gray-400 text-sm font-medium">Please enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all placeholder:text-gray-600"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white p-4 pl-12 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl font-bold text-white transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-70"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Access Dashboard'}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/Account')}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-bold transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Employee Portal
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-8 text-gray-600 text-xs font-medium">
          &copy; 2026 Footware Billing System. Secure Connection.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;