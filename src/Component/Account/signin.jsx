// src/Component/SignInModal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Signin = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState('select');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 🔹 EMPLOYEE LOGIN (CONNECTED TO BACKEND)
//   const handleUserLogin = async (e) => {
//     e.preventDefault();

//     // const empId = e.target.empId.value;
//     const employeeData = res.data;



// // Optional (UI only)
// localStorage.setItem("loggedInEmployee", employeeData.name);
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const res = await axios.post(
//         'http://localhost:8080/api/employees/login',
//         { empId, email, password }
//       );

//       // Store employee data in localStorage
//       const employeeData = res.data;
//       localStorage.setItem('isSignedIn', 'true');
//       localStorage.setItem('employee', JSON.stringify(employeeData));
//       localStorage.setItem('loggedInEmployee', employeeData.name || employeeData.empId);
//       // localStorage.setItem('employeeId', empId); // Store the empId from login form
//       localStorage.setItem('employeeEmail', employeeData.email);
//       localStorage.setItem("isSignedIn", "true");

      
//       window.location.href = '/dashboard';

//     } catch (err) {
//       alert('Invalid Employee Credentials');
//     }
//   };
const handleUserLogin = async (e) => {
  e.preventDefault();

  // ✅ Get values from form
  const empId = e.target.empId.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    // ✅ Call backend login API
    const res = await axios.post(
      "https://backend-billing-software-ahxt.onrender.com/api/employees/login",
      { empId, email, password }
    );

    const employeeData = res.data;

    // ✅ Store FULL employee object (must include DB id)
    localStorage.setItem("employee", JSON.stringify(employeeData));
    localStorage.setItem("isSignedIn", "true");
    localStorage.setItem("loggedInEmployee", employeeData.name);

    alert("✅ Login successful");

    // ✅ Redirect to dashboard
    window.location.href = "/employee/dashboard";

  } catch (error) {
    console.error("Login error:", error);
    alert(
      error.response?.data?.message || "Invalid employee credentials"
    );
  }
};








  // 🔹 ADMIN LOGIN (unchanged)
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

  if (loginType === 'select') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
        <div className="relative z-10 w-full max-w-md bg-white/95 rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
            <p className="text-gray-600">Choose your login type</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setLoginType('user')}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-lg"
            >
              👨💼 Employee Login
            </button>

            <button
              onClick={() => setLoginType('admin')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg"
            >
              🔐 Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4">
      <div className="relative z-10 w-full max-w-md bg-white/95 rounded-xl shadow-2xl p-8">

        <div className="text-center mb-6">
          <button
            onClick={() => setLoginType('select')}
            className="text-blue-600 text-sm mb-4"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {loginType === 'user' ? '👨💼 Employee Login' : '🔐 Admin Login'}
          </h1>
        </div>

        <form
          onSubmit={loginType === 'user' ? handleUserLogin : handleAdminLogin}
          className="space-y-5"
        >

          {/* ✅ EMP ID FIELD (NEW) */}
          {loginType === 'user' && (
            <div>
              <label className="block text-sm font-medium mb-2">Employee ID</label>
              <input
                type="text"
                name="empId"
                placeholder="EMP001"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              {loginType === 'user' ? 'Email' : 'Username'}
            </label>
            <input
              type={loginType === 'user' ? 'email' : 'text'}
              name={loginType === 'user' ? 'email' : 'username'}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="w-full px-4 py-2 border rounded-lg pr-10"
                required
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg"
          >
            {loginType === 'user' ? 'SIGN IN' : 'ADMIN LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
