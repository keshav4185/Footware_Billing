// src/Component/ResetPasswordModal.jsx
import React, { useEffect, useState } from 'react';

const Resetpasswordco = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        
        // Generate floating particles
        const generateParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 12; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 4 + 2,
                    delay: Math.random() * 5
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
                                <linearGradient id="resetBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23764ba2;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%2380628B;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%23667eea;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="waves" width="100" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M0 10 Q25 0 50 10 T100 10" stroke="%23ffffff" stroke-width="0.5" fill="none" opacity="0.1"/>
                                </pattern>
                                <pattern id="reset-dots" width="25" height="25" patternUnits="userSpaceOnUse">
                                    <circle cx="12.5" cy="12.5" r="1.5" fill="%23ffffff" opacity="0.08"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23resetBg)"/>
                            <rect width="100%" height="100%" fill="url(%23waves)"/>
                            <rect width="100%" height="100%" fill="url(%23reset-dots)"/>
                            <circle cx="250" cy="200" r="100" fill="%23ffffff" opacity="0.04"/>
                            <circle cx="950" cy="300" r="150" fill="%23ffffff" opacity="0.03"/>
                            <circle cx="700" cy="600" r="120" fill="%23ffffff" opacity="0.05"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(${mousePosition.x * -0.025}px, ${mousePosition.y * -0.025}px) scale(1.1)`
                }}
            ></div>
            
            {/* Parallax Layer 1 - Reset Elements */}
            <div 
                className="absolute inset-0 opacity-12 transition-transform duration-800 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.035}px, ${mousePosition.y * 0.035}px)`
                }}
            >
                <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 rounded-full mix-blend-overlay filter blur-3xl"></div>
            </div>
            
            {/* Parallax Layer 2 - Accent Elements */}
            <div 
                className="absolute inset-0 opacity-18 transition-transform duration-600 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.055}px, ${mousePosition.y * 0.055}px)`
                }}
            >
                <div className="absolute top-1/2 left-1/3 w-70 h-70 bg-blue-300 rounded-full mix-blend-overlay filter blur-2xl"></div>
            </div>
            
            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute bg-white rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDelay: `${particle.delay}s`,
                            transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`,
                            transition: 'transform 0.7s ease-out'
                        }}
                    />
                ))}
            </div>
            
            {/* Floating UI Elements */}
            <div 
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.09}px, ${mousePosition.y * 0.09}px)`
                }}
            >
                <div className="absolute top-1/4 left-1/5 w-5 h-5 bg-white rounded opacity-25 float-animation"></div>
                <div className="absolute top-1/3 right-1/5 w-7 h-7 bg-purple-200 rounded-full opacity-20 float-animation" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-white rounded opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-3/4 right-1/3 w-6 h-6 bg-blue-200 rounded-full opacity-25 float-animation" style={{animationDelay: '3s'}}></div>
            </div>
            
            {/* The White Card/Modal Container with Parallax */}
            <div 
                className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20 transition-all duration-300 ease-out hover:shadow-purple-500/20 hover:shadow-3xl hover:scale-105"
                style={{
                    transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
            >
                
                {/* Odoo Logo */}
                <div className="flex justify-center mb-10">
                    {/* Simplified SVG placeholder for Odoo purple logo */}
                    <svg className="h-6 w-auto" fill="#80628B" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
                        <text x="50%" y="70%" fontSize="20" fontWeight="bold" textAnchor="middle">Smart</text>
                    </svg>
                </div>

                <form className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-main focus:border-purple-main transition-all duration-200 hover:border-purple-300 focus:shadow-lg focus:shadow-purple-500/20"
                            required
                        />
                    </div>

                    {/* Reset Password Button with Enhanced Effects */}
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
                        <span className="relative z-10">RESET PASSWORD</span>
                    </button>
                </form>

                {/* Back to Login Link */}
                <div className="text-center mt-4">
                    <a href="/signin" className="text-sm text-teal-highlight hover:underline transition-all duration-200 hover:text-purple-600">
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Resetpasswordco;