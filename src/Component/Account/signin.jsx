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
      e.target.reset(); // Clear the form fields
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
      e.target.reset(); // Clear the form fields
    }
  };

  const RoleSwitcher = () => (
    <div className="flex items-center p-1.5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-full mb-6 overflow-hidden relative">
      <div
        className={`absolute top-1.5 bottom-1.5 left-1.5 right-1/2 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg transition-all duration-500 ease-out z-0 transform-gpu ${loginType === 'admin' ? 'translate-x-[100%]' : 'translate-x-0'}`}
      ></div>
      <button
        type="button"
        onClick={() => setLoginType('user')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 z-10 font-black text-[10px] uppercase tracking-widest transition-colors duration-300 ${loginType === 'user' ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
      >
        <Users size={14} />
        Employee
      </button>
      <button
        type="button"
        onClick={() => setLoginType('admin')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 z-10 font-black text-[10px] uppercase tracking-widest transition-colors duration-300 ${loginType === 'admin' ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
      >
        <ShieldCheck size={14} />
        Admin
      </button>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen md:fixed md:inset-0 flex items-center justify-center p-4 sm:p-8 md:p-4 overflow-y-auto md:overflow-hidden overflow-x-hidden font-inter bg-[#1a1c2e]">

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-[1000px] flex flex-col md:flex-row bg-[#252841] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 relative z-10 md:h-[520px] md:max-h-[95vh] md:-mt-16">

        {/* Visual Illustration Section - Fixed 280px on mobile, flex on desktop */}
        <div className="w-full h-[280px] md:h-auto md:w-[50%] relative group overflow-hidden bg-[#f1f3f6] shrink-0 border-b md:border-b-0 md:border-r border-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={empLogImage}
              alt="Employee"
              className={`w-full h-full object-cover object-top transition-all duration-700 ease-in-out ${loginType === 'admin' ? 'opacity-0 scale-90 blur-md' : 'opacity-100 scale-100'}`}
            />
            <img
              src={adminLogImage}
              alt="Admin"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-in-out ${loginType === 'admin' ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-md'}`}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full md:w-[50%] flex flex-col justify-start px-6 py-10 sm:px-8 md:px-12 md:py-8 relative bg-[#252841] h-auto md:h-full z-20 overflow-y-auto overflow-x-hidden md:overflow-hidden">
          <div className="w-full flex flex-col animate-fadeIn mx-auto max-w-sm md:max-w-none">
            <RoleSwitcher />
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tighter">
                {loginType === 'user' ? 'Employee Entry' : 'Admin Authority'}
              </h1>
              <div className={`h-1.5 w-16 rounded-none mb-3 shadow-lg ${loginType === 'user' ? 'bg-purple-500 shadow-purple-500/20' : 'bg-blue-500 shadow-blue-500/20'}`}></div>
            </div>

            <form
              onSubmit={loginType === 'user' ? handleUserLogin : handleAdminLogin}
              className="space-y-4"
            >
              {/* Employee ID field - Conditionally rendered to eliminate blank space */}
              {loginType === 'user' && (
                <div className="space-y-2 animate-fadeIn">
                  <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1">Employee ID</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-purple-400 transition-colors">
                      <LayoutGrid size={18} />
                    </div>
                    <input
                      type="text"
                      name="empId"
                      placeholder="e.g. EMP001"
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-4 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-white placeholder:text-white/50 text-sm"
                      required={loginType === 'user'}
                    />
                  </div>
                </div>
              )}

              {/* Email/Username - Positioned to stay stable */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1">
                  {loginType === 'user' ? 'Corporate Email' : 'Security User'}
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-${loginType === 'user' ? 'purple-400' : 'blue-400'} transition-colors`}>
                    {loginType === 'user' ? <Mail size={18} /> : <User size={18} />}
                  </div>
                  <input
                    type={loginType === 'user' ? 'email' : 'text'}
                    name={loginType === 'user' ? 'email' : 'username'}
                    placeholder={loginType === 'user' ? 'name@company.com' : 'admin_user'}
                    className={`w-full bg-white/5 border border-white/20 rounded-lg py-4 pl-11 pr-4 focus:outline-none focus:ring-1 ${loginType === 'user' ? 'focus:ring-purple-500/50 focus:border-purple-500/50' : 'focus:ring-blue-500/50 focus:border-blue-500/50'} transition-all text-white placeholder:text-white/50 text-sm`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1">Secure Password</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-${loginType === 'user' ? 'purple-400' : 'blue-400'} transition-colors`}>
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    className={`w-full bg-white/5 border border-white/20 rounded-lg py-4 pl-11 pr-10 focus:outline-none focus:ring-1 ${loginType === 'user' ? 'focus:ring-purple-500/50 focus:border-purple-500/50' : 'focus:ring-blue-500/50 focus:border-blue-500/50'} transition-all text-white placeholder:text-white/50 text-sm`}
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

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full relative group overflow-hidden py-4 rounded-lg font-bold text-white shadow-xl transition-all duration-300 transform active:scale-[0.98] mt-4 flex items-center justify-center gap-3 tracking-[0.2em] text-xs uppercase ${loginType === 'user'
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
