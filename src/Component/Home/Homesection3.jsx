// src/Component/Home/Homesection3.jsx
import React, { useEffect, useState } from 'react';
import backgroundvideo from '../../assets/Home/video.webm';
// ADD any UI image in assets (example path below)
import uiImage from '../../assets/Home/01.svg';

const Button = ({ children, primary = false, className = '', ...props }) => {
    const baseClasses = 'px-8 py-3 font-semibold rounded-lg transition duration-200 shadow-lg cursor-pointer';
    const styleClasses = primary 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50';

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Homesection3 = () => {
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
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Professional Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Billing Dashboard Mockups */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    {/* Invoice Template */}
                    <div className="absolute top-20 left-10 w-72 h-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-[#8BC34A]/20 p-5 transform rotate-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-4 bg-[#8BC34A] rounded w-20"></div>
                            <div className="text-sm font-bold text-[#2E4F7A]">INVOICE</div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="h-2 bg-gray-300 rounded w-full"></div>
                            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                        </div>
                        <div className="border-t pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-[#4A4A4A]">Total:</span>
                                <span className="text-lg font-bold text-[#8BC34A]">₹45,250</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Payment Methods Interface */}
                    <div className="absolute bottom-32 right-16 w-64 h-40 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-[#2E4F7A]/20 p-4 transform -rotate-3">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Payment Methods</div>
                        <div className="space-y-2">
                            <div className="flex items-center p-2 bg-[#8BC34A]/10 rounded">
                                <div className="w-3 h-3 bg-[#8BC34A] rounded mr-2"></div>
                                <span className="text-xs">Cash Payment</span>
                            </div>
                            <div className="flex items-center p-2 bg-[#2E4F7A]/10 rounded">
                                <div className="w-3 h-3 bg-[#2E4F7A] rounded mr-2"></div>
                                <span className="text-xs">WhatsApp Share</span>
                            </div>
                            <div className="flex items-center p-2 bg-[#4A90E2]/10 rounded">
                                <div className="w-3 h-3 bg-[#4A90E2] rounded mr-2"></div>
                                <span className="text-xs">Digital Receipt</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Financial Analytics */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`
                    }}
                >
                    {/* Revenue Analytics */}
                    <div className="absolute top-1/3 left-1/4 w-56 h-36 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#8BC34A]/30 p-4 transform rotate-12">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Revenue Analytics</div>
                        <div className="flex items-end justify-between h-16 mb-2">
                            <div className="w-4 bg-gradient-to-t from-[#8BC34A] to-[#8BC34A]/50 rounded-t animate-pulse" style={{height: '70%'}}></div>
                            <div className="w-4 bg-gradient-to-t from-[#2E4F7A] to-[#2E4F7A]/50 rounded-t animate-pulse" style={{height: '90%', animationDelay: '0.5s'}}></div>
                            <div className="w-4 bg-gradient-to-t from-[#4A90E2] to-[#4A90E2]/50 rounded-t animate-pulse" style={{height: '60%', animationDelay: '1s'}}></div>
                            <div className="w-4 bg-gradient-to-t from-[#8BC34A] to-[#8BC34A]/50 rounded-t animate-pulse" style={{height: '85%', animationDelay: '1.5s'}}></div>
                        </div>
                        <div className="text-xs text-[#2E4F7A] font-bold">₹1,25,000 this month</div>
                    </div>
                    
                    {/* Tax Calculation */}
                    <div className="absolute bottom-1/4 left-1/6 w-48 h-28 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#2E4F7A]/30 p-3 transform -rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Tax Summary</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>CGST (9%)</span>
                                <span className="text-[#8BC34A] font-bold">₹4,072</span>
                            </div>
                            <div className="flex justify-between">
                                <span>SGST (9%)</span>
                                <span className="text-[#2E4F7A] font-bold">₹4,072</span>
                            </div>
                            <div className="border-t pt-1 flex justify-between font-bold">
                                <span>Total Tax</span>
                                <span className="text-[#4A90E2]">₹8,144</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 3 - Floating Financial Elements */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`
                    }}
                >
                    {/* Floating Currency & Symbols */}
                    <div className="absolute top-1/5 right-1/4 text-4xl text-[#8BC34A] opacity-15 animate-bounce">₹</div>
                    <div className="absolute top-2/3 left-1/5 text-2xl text-[#2E4F7A] opacity-12 animate-bounce" style={{animationDelay: '1s'}}>%</div>
                    <div className="absolute bottom-1/5 right-1/3 text-3xl text-[#4A90E2] opacity-15 animate-bounce" style={{animationDelay: '2s'}}>+</div>
                    
                    {/* Financial Icons */}
                    <div className="absolute top-1/2 left-1/8 w-8 h-8 border-2 border-[#8BC34A] opacity-10 rounded-full animate-spin" style={{animationDuration: '12s'}}></div>
                    <div className="absolute bottom-1/3 right-1/5 w-6 h-6 bg-[#2E4F7A] opacity-15 transform rotate-45 animate-pulse"></div>
                    <div className="absolute top-1/4 left-1/2 w-12 h-2 bg-[#4A90E2] opacity-12 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
                </div>
                
                {/* Layer 4 - Data Connection Lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.06}}>
                        <defs>
                            <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8BC34A" />
                                <stop offset="50%" stopColor="#2E4F7A" />
                                <stop offset="100%" stopColor="#4A90E2" />
                            </linearGradient>
                        </defs>
                        <path d="M50,200 Q300,100 550,300 T850,150" stroke="url(#dataFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M100,400 Q350,200 600,350 T900,250" stroke="url(#dataFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                    </svg>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-12">
                    
                    {/* Left Column */}
                    <div className="lg:w-1/2 space-y-6 mb-12 lg:mb-0 lg:text-left text-center">
                        <span className="text-sm font-semibold uppercase text-blue-600 tracking-wider">
                            Essential Features
                        </span>
                        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent leading-tight elc">
                            Professional Footwear Billing Made Simple
                        </h2>
                        <p className="text-xl text-gray-600">
                            Create professional invoices with CGST/SGST calculation, send via WhatsApp, 
                            and track payments - everything your footwear business needs in one place.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-1/2 w-full flex justify-center">
                        <div className="relative w-full max-w-lg pt-[56.25%] rounded-xl shadow-2xl overflow-hidden"> 
                            
                            {/* YouTube Video */}
                            <iframe
                                className="absolute inset-0 w-full h-full rounded-xl"
                                src="https://www.youtube.com/embed/PD2eKTzkZ70?autoplay=1&mute=1&loop=1&playlist=PD2eKTzkZ70&controls=0&modestbranding=1"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Feature Video"
                            ></iframe>

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/20"></div>

                            {/* UI Image Overlay */}
                            <img
                                src={uiImage}
                                alt="App UI Preview"
                                className="absolute inset-0 m-auto w-[85%] rounded-lg shadow-2xl z-10"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Homesection3;
