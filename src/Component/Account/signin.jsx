// src/Component/Account/signin.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Users,
  LogIn,
  LayoutGrid
} from 'lucide-react';
import empLogImage from '../../assets/Emp_Log_optimized.jpg';
import adminLogImage from '../../assets/Admin_Log.jpg';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Other initialization if needed
  }, []);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const empId = e.target.empId.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      const res = await axios.post(
        "https://backend-billing-software-ahxt.onrender.com/api/employees/login",
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
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-inter">
      <div className="w-full max-w-[950px] h-auto lg:h-[620px] flex flex-col lg:flex-row bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10">

        {/* Visual Illustration Section: Now responsive across all devices */}
        <div className="w-full h-48 sm:h-60 lg:h-full lg:w-[55%] relative group overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 shrink-0">

          {/* Image Container with Cross-Fade */}
          <div className="absolute inset-0 transition-all duration-1000 will-change-transform">
            <img
              src={empLogImage}
              alt="Employee"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-out will-change-opacity ${loginType === 'admin' ? 'opacity-0' : 'opacity-80'}`}
            />
            <img
              src={adminLogImage}
              alt="Admin"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-out will-change-opacity ${loginType === 'admin' ? 'opacity-80' : 'opacity-0'}`}
            />
          </div>

        </div>

        {/* Form Container: Adjusts padding and alignment based on screen size */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center p-6 sm:p-8 lg:p-10 relative bg-black/40 backdrop-blur-2xl overflow-y-auto transform-gpu flex-1">

          <div className="w-full flex flex-col animate-fadeIn will-change-opacity mx-auto max-w-sm lg:max-w-none">

            <RoleSwitcher />

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tighter">
                {loginType === 'user' ? 'Employee Entry' : 'Admin Authority'}
              </h1>
              <div className={`h-1.5 w-16 bg-${loginType === 'user' ? 'purple' : 'blue'}-600 rounded-full mb-3`}></div>

            </div>

            <form
              onSubmit={loginType === 'user' ? handleUserLogin : handleAdminLogin}
              className="space-y-5"
            >
              {loginType === 'user' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white uppercase tracking-wider ml-1">Employee ID</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-purple-500 transition-colors">
                      <LayoutGrid size={18} />
                    </div>
                    <input
                      type="text"
                      name="empId"
                      placeholder="EMP001"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder:text-white/10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white uppercase tracking-wider ml-1">
                  {loginType === 'user' ? 'Email ID' : 'Username'}
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-${loginType === 'user' ? 'purple' : 'blue'}-500 transition-colors`}>
                    {loginType === 'user' ? <Mail size={18} /> : <User size={18} />}
                  </div>
                  <input
                    type={loginType === 'user' ? 'email' : 'text'}
                    name={loginType === 'user' ? 'email' : 'username'}
                    placeholder={loginType === 'user' ? 'id@network.com' : 'security_admin'}
                    className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-${loginType === 'user' ? 'purple' : 'blue'}-500 transition-all text-white placeholder:text-white/10`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold text-white uppercase tracking-wider px-1">Password</label>
                </div>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-${loginType === 'user' ? 'purple' : 'blue'}-500 transition-colors`}>
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••••••"
                    className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:ring-1 focus:ring-${loginType === 'user' ? 'purple' : 'blue'}-500 transition-all text-white placeholder:text-white/10`}
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
                className={`w-full py-5 rounded-xl font-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 transform active:scale-[0.98] transform-gpu mt-4 flex items-center justify-center gap-3 tracking-[0.2em] text-xs uppercase ${loginType === 'user'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-700 hover:shadow-purple-500/30'
                  : 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:shadow-blue-500/30'
                  }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
