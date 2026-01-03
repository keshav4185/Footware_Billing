// src/Component/SignInModal.jsx
import React, { useEffect, useState } from 'react';

const Signin = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showPassword, setShowPassword] = useState(false);
    const [loginType, setLoginType] = useState('select'); // 'select', 'user', 'admin'

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

    const handleUserLogin = (e) => {
        e.preventDefault();
        const employeeName = e.target.employeeName.value;
        localStorage.setItem('isSignedIn', 'true');
        localStorage.setItem('loggedInEmployee', employeeName);
        window.location.href = '/dashboard';
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

    if (loginType === 'select') {
        return (
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
                {/* Background */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                    style={{
                        backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                                <defs>
                                    <linearGradient id="loginBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" />
                                        <stop offset="50%" style="stop-color:%23764ba2;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:%2380628B;stop-opacity:1" />
                                    </linearGradient>
                                </defs>
                                <rect width="100%" height="100%" fill="url(%23loginBg)"/>
                            </svg>
                        `)}')
                        `,
                        transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) scale(1.1)`
                    }}
                ></div>
                
                <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
                        <p className="text-gray-600">Choose your login type</p>
                    </div>
                    
                    <div className="space-y-4">
                        <button
                            onClick={() => setLoginType('user')}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105"
                        >
                            👨💼 Employee Login
                        </button>
                        <a
                            href="/admin"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 text-center block"
                        >
                            🔐 Admin Login
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative p-4">
            {/* Content with subtle parallax */}
            <div 
                className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20 transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
            >
                <div className="text-center mb-6">
                    <button 
                        onClick={() => setLoginType('select')}
                        className="text-blue-600 hover:underline text-sm mb-4"
                    >
                        ← Back to selection
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {loginType === 'user' ? '👨💼 Employee Login' : '🔐 Admin Login'}
                    </h1>
                </div>
                
                <form onSubmit={loginType === 'user' ? handleUserLogin : handleAdminLogin} className="space-y-6">
                    {loginType === 'user' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Employee Name
                            </label>
                            <input
                                type="text"
                                name="employeeName"
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-main focus:border-purple-main transition duration-150"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {loginType === 'user' ? 'Email' : 'Username'}
                        </label>
                        <input
                            type={loginType === 'user' ? 'email' : 'text'}
                            name={loginType === 'user' ? 'email' : 'username'}
                            placeholder={loginType === 'user' ? 'Enter your email' : 'Enter username'}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-main focus:border-purple-main transition duration-150"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-main focus:border-purple-main pr-10 transition duration-150"
                                required
                            />
                            <span 
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-purple-600 transition-colors duration-200"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </span>
                        </div>
                        {loginType === 'user' && (
                            <div className="text-right mt-1">
                                {/* <a href="/Resetpassword" className="text-sm text-purple-main hover:underline">
                                    Reset Password
                                </a> */}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full px-4 py-3 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                            loginType === 'user' 
                                ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                        }`}
                    >
                        {loginType === 'user' ? 'SIGN IN' : 'LOGIN TO ADMIN'}
                    </button>
                </form>

                {loginType === 'user' && (
                    <div className="text-center mt-6">
                        {/* <a href="/Signup" className="text-sm text-teal-highlight hover:underline">
                            Don't have an account?
                        </a> */}
                    </div>
                )}
                
                {loginType === 'admin' && (
                    <div className="mt-4 text-center text-sm text-gray-500">
                        <p>Default: admin / admin123</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signin;