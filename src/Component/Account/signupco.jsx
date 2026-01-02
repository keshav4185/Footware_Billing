// src/Component/SignUpModal.jsx
import React, { useEffect, useState } from 'react';
// 🛑 IMPORTANT: Importing 'Link' from react-router-dom for client-side navigation
import { Link } from 'react-router-dom'; 


// Note: The function name 'signupco' is kept as requested.
const signupco = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showPassword, setShowPassword] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        
        // Generate animated particles
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 20; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    delay: Math.random() * 6
                });
            }
            setParticles(newParticles);
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        generateParticles();
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="signupBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%2380628B;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23667eea;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%23764ba2;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="hexagon" width="60" height="52" patternUnits="userSpaceOnUse">
                                    <path d="M30 0 L52 15 L52 37 L30 52 L8 37 L8 15 Z" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.1"/>
                                </pattern>
                                <pattern id="circles" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <circle cx="15" cy="15" r="2" fill="%23ffffff" opacity="0.05"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23signupBg)"/>
                            <rect width="100%" height="100%" fill="url(%23hexagon)"/>
                            <rect width="100%" height="100%" fill="url(%23circles)"/>
                            <circle cx="200" cy="150" r="120" fill="%23ffffff" opacity="0.03"/>
                            <circle cx="1000" cy="200" r="180" fill="%23ffffff" opacity="0.02"/>
                            <circle cx="800" cy="650" r="150" fill="%23ffffff" opacity="0.04"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px) scale(1.1)`
                }}
            ></div>
            
            {/* Parallax Layer 1 - Registration Elements */}
            <div 
                className="absolute inset-0 opacity-12 transition-transform duration-800 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`
                }}
            >
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-overlay filter blur-3xl"></div>
            </div>
            
            {/* Parallax Layer 2 - Accent Elements */}
            <div 
                className="absolute inset-0 opacity-15 transition-transform duration-600 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`
                }}
            >
                <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-overlay filter blur-2xl"></div>
            </div>
            
            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute bg-white rounded-full opacity-25 animate-bounce"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDelay: `${particle.delay}s`,
                            transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`,
                            transition: 'transform 0.6s ease-out'
                        }}
                    />
                ))}
            </div>
            
            {/* Floating UI Elements */}
            <div 
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`
                }}
            >
                <div className="absolute top-1/4 left-1/5 w-6 h-6 bg-white rounded opacity-25 float-animation"></div>
                <div className="absolute top-1/3 right-1/5 w-8 h-8 bg-purple-200 rounded-full opacity-20 float-animation" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-white rounded opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-blue-200 rounded-full opacity-25 float-animation" style={{animationDelay: '3s'}}></div>
                <div className="absolute top-1/6 right-1/2 w-3 h-3 bg-indigo-200 rounded-full opacity-20 float-animation" style={{animationDelay: '4s'}}></div>
            </div>
            
            {/* The White Card/Modal Container with Parallax */}
            <div 
                className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20 transition-all duration-300 ease-out hover:shadow-purple-500/20 hover:shadow-3xl hover:scale-105"
                style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
            >
                
                {/* Odoo Logo */}
                <div className="flex justify-center mb-6">
                    {/* Simplified SVG placeholder for Odoo purple logo */}
                    <svg className="h-6 w-auto" fill="#80628B" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
                        <text x="50%" y="70%" fontSize="20" fontWeight="bold" textAnchor="middle">Smart</text>
                    </svg>
                </div>

                {/* Info Alert Box */}
                <div className="bg-blue-100/50 text-gray-700 p-4 rounded-lg mb-6 border border-blue-200">
                    <p className="text-sm">Access and manage your documents and databases from Smart.com.</p>
                </div>

                <form className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-main focus:border-purple-main transition-all duration-200 hover:border-purple-300 focus:shadow-lg focus:shadow-purple-500/20"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-main focus:border-purple-main transition-all duration-200 hover:border-purple-300 focus:shadow-lg focus:shadow-purple-500/20"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-main focus:border-purple-main pr-10 transition-all duration-200 hover:border-purple-300 focus:shadow-lg focus:shadow-purple-500/20"
                                required
                            />
                            {/* Eye Icon Toggle */}
                            <span 
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-purple-600 transition-colors duration-200"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </span>
                        </div>
                    </div>

                    {/* Sign Up Button with Enhanced Effects */}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white font-semibold rounded-lg transition-all duration-300 
                                   bg-purple-dark hover:bg-purple-main shadow-lg hover:shadow-purple-500/50 hover:shadow-2xl 
                                   transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                        style={{ 
                            backgroundColor: '#80628B',
                            background: 'linear-gradient(135deg, #80628B 0%, #764ba2 50%, #667eea 100%)'
                        }}
                    >
                        <span className="relative z-10">SIGN UP</span>
                    </button>
                </form>

                {/* Already have an account link */}
                <div className="text-center mt-4">
                    {/* Link to the Sign In page, which should be routed as /signin */}
                    <Link to="/signin" className="text-sm text-purple-main hover:underline">
                        I already have an account
                    </Link>
                </div>

                {/* Privacy Policy Note */}
                <div className="text-center mt-4 text-xs text-gray-500">
                    ⓘ Your personal data will be handled as outlined in our 
                    <a href="#" className="text-purple-main hover:underline ml-1">Privacy Policy.</a>
                </div>
            </div>
        </div>
    );
};

export default signupco;