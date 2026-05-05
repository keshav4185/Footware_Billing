// src/Component/Account/signin.jsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Users,
  LogIn,
  LayoutGrid,
  ArrowRight
} from 'lucide-react';
import empLogImage from '../../assets/Emp_Log_optimized.jpg';
import adminLogImage from '../../assets/Admin_Log.jpg';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState('user');
  const [isLoading, setIsLoading] = useState(false);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const empId = e.target.empId.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      const res = await api.post(
        "/employees/login",
        { empId, email, password }
      );

      const employeeData = res.data;
      localStorage.setItem("employee", JSON.stringify(employeeData));
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("loggedInEmployee", employeeData.name);

      alert("✅ Login successful");
      window.location.href = "/employee/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Invalid employee credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      window.location.href = '/admin/dashboard';
    } else {
      alert('Invalid admin credentials');
    }
  };

  const RoleSwitcher = () => (
    <div className="flex items-center p-1.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-full mb-10 overflow-hidden relative">
      <div
        className={`absolute top-1.5 bottom-1.5 left-1.5 right-1/2 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl transition-all duration-500 ease-out z-0 transform-gpu ${loginType === 'admin' ? 'translate-x-[100%]' : 'translate-x-0'}`}
      ></div>
      <button
        type="button"
        onClick={() => setLoginType('user')}
        className={`flex-1 flex items-center justify-center gap-2 py-3.5 z-10 font-black text-xs uppercase tracking-widest transition-colors duration-300 ${loginType === 'user' ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
      >
        <Users size={16} />
        Employee
      </button>
      <button
        type="button"
        onClick={() => setLoginType('admin')}
        className={`flex-1 flex items-center justify-center gap-2 py-3.5 z-10 font-black text-xs uppercase tracking-widest transition-colors duration-300 ${loginType === 'admin' ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
      >
        <ShieldCheck size={16} />
        Admin
      </button>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-inter bg-[#0f172a]">
      {/* Background decoration for consistency */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[1000px] flex flex-col md:flex-row bg-white/10 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 relative z-10">

        {/* Visual Illustration Section - Optimized for all screens */}
        <div className="w-full h-56 md:h-[650px] md:w-[50%] relative group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 shrink-0">
          <div className="absolute inset-0 transition-all duration-1000">
            <img
              src={empLogImage}
              alt="Employee"
              className={`absolute inset-0 w-full h-full object-cover md:object-center transition-opacity duration-[1000ms] ease-out ${loginType === 'admin' ? 'opacity-0' : 'opacity-90'}`}
            />
            <img
              src={adminLogImage}
              alt="Admin"
              className={`absolute inset-0 w-full h-full object-cover md:object-center transition-opacity duration-[1000ms] ease-out ${loginType === 'admin' ? 'opacity-90' : 'opacity-0'}`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
        </div>

        {/* Form Container */}
        <div className="w-full md:w-[50%] flex flex-col justify-center p-8 sm:p-12 relative bg-black/20 backdrop-blur-sm overflow-y-auto">
          <div className="w-full flex flex-col animate-fadeIn mx-auto max-w-sm md:max-w-none">
            <RoleSwitcher />

            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tighter">
                {loginType === 'user' ? 'Employee Entry' : 'Admin Authority'}
              </h1>
              <div className={`h-1.5 w-16 bg-${loginType === 'user' ? 'purple' : 'blue'}-500 rounded-full mb-3 shadow-[0_0_15px_rgba(168,85,247,0.5)]`}></div>
              <p className="text-white/40 text-sm font-medium tracking-wide">Enter your details to access the system</p>
            </div>

            <form
              onSubmit={loginType === 'user' ? handleUserLogin : handleAdminLogin}
              className="space-y-6"
            >
              {loginType === 'user' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] ml-1">Employee ID</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-purple-400 transition-colors">
                      <LayoutGrid size={18} />
                    </div>
                    <input
                      type="text"
                      name="empId"
                      placeholder="e.g. EMP001"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30 transition-all text-white placeholder:text-white/10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] ml-1">
                  {loginType === 'user' ? 'Corporate Email' : 'Security Username'}
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-${loginType === 'user' ? 'purple' : 'blue'}-400 transition-colors`}>
                    {loginType === 'user' ? <Mail size={18} /> : <User size={18} />}
                  </div>
                  <input
                    type={loginType === 'user' ? 'email' : 'text'}
                    name={loginType === 'user' ? 'email' : 'username'}
                    placeholder={loginType === 'user' ? 'name@company.com' : 'admin_user'}
                    className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-${loginType === 'user' ? 'purple' : 'blue'}-500/30 focus:border-${loginType === 'user' ? 'purple' : 'blue'}-500/30 transition-all text-white placeholder:text-white/10`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] ml-1">Secure Password</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-${loginType === 'user' ? 'purple' : 'blue'}-400 transition-colors`}>
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-${loginType === 'user' ? 'purple' : 'blue'}-500/30 focus:border-${loginType === 'user' ? 'purple' : 'blue'}-500/30 transition-all text-white placeholder:text-white/10`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/20 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full relative group overflow-hidden py-5 rounded-2xl font-black text-white shadow-xl transition-all duration-300 transform active:scale-[0.98] mt-4 flex items-center justify-center gap-3 tracking-[0.2em] text-xs uppercase ${loginType === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/40'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/40'
                  }`}
              >
                <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Enter Workspace
                      <ArrowRight size={16} />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
