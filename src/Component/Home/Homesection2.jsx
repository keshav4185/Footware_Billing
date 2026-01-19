
// src/Component/Home/Homesection2.jsx
import React, { useEffect, useState } from 'react';

const features = [
    { 
        icon: '📱', 
        title: 'WhatsApp Integration', 
        description: 'Send invoices directly to customers via WhatsApp with formatted bill details.'
    },
    { 
        icon: '💰', 
        title: 'Payment Tracking', 
        description: 'Track advance payments, balance amounts, and payment status for each invoice.'
    },
    { 
        icon: '🧾', 
        title: 'Professional Invoices', 
        description: 'Generate clear, branded invoices with CGST/SGST calculation and digital signatures.'
    },
];

const Homesection2 = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Parallax Background Layers */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Large floating shapes */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    <div className="absolute top-20 left-20 w-64 h-64 bg-[#8BC34A] rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#2E4F7A] rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
                
                {/* Layer 2 - Financial UI Elements */}
                <div 
                    className="absolute inset-0 opacity-12 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`
                    }}
                >
                    {/* Invoice mockup */}
                    <div className="absolute top-32 left-32 w-48 h-32 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-[#8BC34A]/20 p-4 transform rotate-12">
                        <div className="h-2 bg-[#8BC34A] rounded mb-2"></div>
                        <div className="h-1 bg-gray-300 rounded mb-1 w-3/4"></div>
                        <div className="h-1 bg-gray-300 rounded mb-1 w-1/2"></div>
                        <div className="h-1 bg-[#2E4F7A] rounded w-1/3"></div>
                    </div>
                    
                    {/* Chart mockup */}
                    <div className="absolute bottom-32 right-32 w-40 h-24 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-[#2E4F7A]/20 p-3 transform -rotate-6">
                        <div className="flex items-end justify-between h-full">
                            <div className="w-2 bg-[#8BC34A] rounded-t" style={{height: '60%'}}></div>
                            <div className="w-2 bg-[#2E4F7A] rounded-t" style={{height: '80%'}}></div>
                            <div className="w-2 bg-[#4A90E2] rounded-t" style={{height: '40%'}}></div>
                            <div className="w-2 bg-[#8BC34A] rounded-t" style={{height: '90%'}}></div>
                        </div>
                    </div>
                    
                    {/* Payment status mockup */}
                    <div className="absolute top-1/2 left-1/4 w-32 h-20 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-[#4A90E2]/20 p-2 transform rotate-3">
                        <div className="flex items-center mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <div className="h-1 bg-gray-300 rounded w-16"></div>
                        </div>
                        <div className="h-1 bg-[#8BC34A] rounded w-12 mb-1"></div>
                        <div className="h-1 bg-gray-300 rounded w-20"></div>
                    </div>
                </div>
                
                {/* Layer 3 - Floating financial icons */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`
                    }}
                >
                    {/* Currency symbols - Only Rupee */}
                    <div className="absolute top-1/4 left-1/5 text-2xl text-[#8BC34A] opacity-20 animate-bounce">₹</div>
                    <div className="absolute top-1/3 right-1/5 text-xl text-[#2E4F7A] opacity-15 animate-bounce" style={{animationDelay: '1s'}}>₹</div>
                    <div className="absolute bottom-1/3 left-1/3 text-lg text-[#4A90E2] opacity-20 animate-bounce" style={{animationDelay: '2s'}}>₹</div>
                    
                    {/* Geometric shapes representing data */}
                    <div className="absolute top-3/4 right-1/4 w-6 h-6 border-2 border-[#8BC34A] opacity-15 transform rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
                    <div className="absolute top-1/6 right-1/3 w-4 h-4 bg-[#2E4F7A] opacity-20 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                    <div className="absolute bottom-1/4 left-1/6 w-8 h-1 bg-[#4A90E2] opacity-15 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                {/* Layer 4 - Grid pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-5 transition-transform duration-300 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${encodeURIComponent('8BC34A')}' fill-opacity='0.1'%3E%3Cpath d='M40 40V0h-1v40h1zM0 40V0h1v40H0z'/%3E%3C/g%3E%3C/svg%3E")`
                    }}
                ></div>
                
                {/* Layer 5 - Animated connecting lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.1}}>
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8BC34A" />
                                <stop offset="50%" stopColor="#2E4F7A" />
                                <stop offset="100%" stopColor="#4A90E2" />
                            </linearGradient>
                        </defs>
                        <path d="M100,200 Q300,100 500,300 T800,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M0,300 Q200,150 400,250 T700,180" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                    </svg>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
                
                {/* Section Header */}
                <h2 className="text-4xl font-extrabold mb-4 elc bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent">
                    Essential Features for Footwear Billing
                </h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    Everything you need to manage your footwear business billing efficiently and professionally.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 bg-gray-50"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Optional Call to Action (if needed in a second section) */}
                <div className="mt-16">
                    <a 
                        href="#features" 
                        className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition"
                    >
                
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Homesection2;

