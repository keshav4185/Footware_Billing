// src/Component/Home/Homesection1.jsx
import React, { useEffect, useState } from 'react';

import { Smartphone, IndianRupee, FileText, ChevronDown } from 'lucide-react';
import TiltCard from '../TiltCard';

// Reusing the button component locally for styling consistency
const Button = ({ children, primary = false, outline = false, className = '', ...props }) => {
    const baseClasses = 'px-6 py-2.5 font-semibold rounded-lg transition duration-200 cursor-pointer text-base';
    
    let styleClasses;
    if (primary) {
        // Unique button style for 'Start now - It's free'
        styleClasses = 'bg-gradient-to-r from-[#B564C3] to-[#3D0448] text-white hover:from-[#3D0448] hover:to-[#B564C3] shadow-lg';
    } else if (outline) {
        // Unique button style for 'Meet an advisor' (minimal border/shadow)
        styleClasses = 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 shadow-sm';
    } else {
        styleClasses = 'text-gray-600';
    }

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};


const Homesection1 = () => {
    return (
        <div className="min-h-[90vh] relative overflow-hidden perspective-1000">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out transform-gpu"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23f8fafc;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23e0e7ff;stop-opacity:0" />
                                    <stop offset="100%" style="stop-color:%23ddd6fe;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23e2e8f0" stroke-width="0.5" opacity="0.3"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23bg)"/>
                            <rect width="100%" height="100%" fill="url(%23grid)"/>
                            <circle cx="200" cy="150" r="80" fill="%23B564C3" opacity="0.1"/>
                            <circle cx="900" cy="200" r="120" fill="%233D0448" opacity="0.08"/>
                            <circle cx="1000" cy="600" r="100" fill="%23B564C3" opacity="0.1"/>
                            <rect x="100" y="400" width="200" height="4" fill="%23B564C3" opacity="0.2" rx="2"/>
                            <rect x="800" y="500" width="150" height="4" fill="%233D0448" opacity="0.2" rx="2"/>
                            <rect x="300" y="300" width="100" height="4" fill="%23B564C3" opacity="0.2" rx="2"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(calc(var(--m-x) * -0.02px), calc(var(--m-y) * -0.02px)) scale(1.1)`
                }}
            ></div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-blue-50/60 to-indigo-100/80"></div>
            
            {/* Parallax Layer 1 - Financial Dashboard Elements */}
            <div 
                className="absolute inset-0 opacity-15 transition-transform duration-1000 ease-out transform-gpu"
                style={{
                    transform: `translate(calc(var(--m-x) * 0.03px), calc(var(--m-y) * 0.03px))`
                }}
            >
                {/* Invoice Card Mockup */}
                <TiltCard className="absolute top-32 left-32" maxTilt={20}>
                    <div className="w-64 h-40 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-[#B564C3]/30 p-4 transform rotate-12">
                        <div className="flex justify-between items-center mb-3">
                            <div className="h-3 bg-[#B564C3] rounded w-16"></div>
                            <div className="text-xs text-[#3D0448] font-bold">#INV-001</div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                        </div>
                        <div className="mt-3 flex justify-between">
                            <div className="h-2 bg-[#2E4F7A] rounded w-1/4"></div>
                            <div className="text-xs font-bold text-[#8BC34A]">₹12,500</div>
                        </div>
                    </div>
                </TiltCard>
                
                {/* Payment Status Dashboard */}
                <TiltCard className="absolute bottom-32 right-32" maxTilt={25}>
                    <div className="w-56 h-32 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-[#3D0448]/30 p-4 transform -rotate-6">
                        <div className="text-xs font-bold text-[#4A4B4D] mb-2">Payment Status</div>
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                <span className="text-xs">Paid</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-600">₹8,500</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                                <span className="text-xs">Pending</span>
                            </div>
                            <span className="text-xs font-bold text-amber-600">₹4,000</span>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                                <span className="text-xs">Overdue</span>
                            </div>
                            <span className="text-xs font-bold text-rose-600">₹1,200</span>
                        </div>
                    </div>
                </TiltCard>
                
                <div className="absolute top-20 left-20 w-64 h-64 bg-[#B564C3] rounded-full mix-blend-multiply filter blur-2xl pulse-slow"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#3D0448] rounded-full mix-blend-multiply filter blur-2xl pulse-slow" style={{animationDelay: '2s'}}></div>
            </div>
            
            {/* Parallax Layer 2 - Analytics & Charts */}
            <div 
                className="absolute inset-0 opacity-12 transition-transform duration-700 ease-out transform-gpu"
                style={{
                    transform: `translate(calc(var(--m-x) * 0.06px), calc(var(--m-y) * 0.06px))`
                }}
            >
                {/* Revenue Chart */}
                <TiltCard className="absolute top-1/2 left-1/4" maxTilt={30}>
                    <div className="w-48 h-32 bg-white/85 backdrop-blur-sm rounded-lg shadow-xl border border-[#B564C3]/30 p-3 transform rotate-3">
                        <div className="text-xs font-bold text-[#4A4B4D] mb-2">Monthly Revenue</div>
                        <div className="flex items-end justify-between h-16">
                            <div className="w-3 bg-[#B564C3] rounded-t animate-pulse" style={{height: '60%'}}></div>
                            <div className="w-3 bg-[#3D0448] rounded-t animate-pulse" style={{height: '80%', animationDelay: '0.5s'}}></div>
                            <div className="w-3 bg-[#B564C3]/50 rounded-t animate-pulse" style={{height: '40%', animationDelay: '1s'}}></div>
                            <div className="w-3 bg-[#3D0448]/50 rounded-t animate-pulse" style={{height: '90%', animationDelay: '1.5s'}}></div>
                            <div className="w-3 bg-[#B564C3] rounded-t animate-pulse" style={{height: '70%', animationDelay: '2s'}}></div>
                        </div>
                    </div>
                </TiltCard>
                
                {/* Customer List */}
                <div className="absolute bottom-1/3 left-1/6 w-40 h-24 bg-white/85 backdrop-blur-sm rounded-lg shadow-xl border border-[#B564C3]/30 p-2 transform -rotate-12">
                    <div className="text-xs font-bold text-[#4A4B4D] mb-1">Recent Customers</div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span>Shoe Palace</span>
                            <span className="text-[#B564C3] font-bold">₹15K</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span>Style Steps</span>
                            <span className="text-[#3D0448] font-bold">₹12K</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span>Footwear Hub</span>
                            <span className="text-[#B564C3] font-bold">₹8K</span>
                        </div>
                    </div>
                </div>
                
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#4A90E2] rounded-full mix-blend-multiply filter blur-3xl pulse-slow" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Parallax Layer 3 - Financial Icons & Currency */}
            <div 
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out transform-gpu"
                style={{
                    transform: `translate(calc(var(--m-x) * 0.08px), calc(var(--m-y) * 0.08px))`
                }}
            >
                {/* Currency Symbols - Only Rupee */}
                <div className="absolute top-1/4 left-1/5 text-3xl text-[#B564C3] opacity-20 animate-bounce">₹</div>
                <div className="absolute top-1/3 right-1/5 text-2xl text-[#3D0448] opacity-15 animate-bounce" style={{animationDelay: '1s'}}>₹</div>
                <div className="absolute bottom-1/3 left-1/3 text-xl text-[#B564C3] opacity-20 animate-bounce" style={{animationDelay: '2s'}}>₹</div>
                <div className="absolute top-1/2 right-1/3 text-lg text-[#3D0448] opacity-15 animate-bounce" style={{animationDelay: '3s'}}>₹</div>
                <div className="absolute top-3/4 left-1/2 text-2xl text-[#3D0448] opacity-20 animate-bounce" style={{animationDelay: '4s'}}>₹</div>
                
                {/* Financial Icons */}
                <div className="absolute top-1/6 left-1/4 w-8 h-8 border-2 border-[#B564C3] opacity-15 rounded-full animate-spin" style={{animationDuration: '10s'}}></div>
                <div className="absolute bottom-1/4 right-1/6 w-6 h-6 bg-[#3D0448] opacity-20 transform rotate-45 animate-pulse"></div>
                <div className="absolute top-2/3 left-1/6 w-10 h-2 bg-[#B564C3] opacity-15 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Parallax Layer 4 - Data Flow Lines */}
            <div 
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out transform-gpu"
                style={{
                    transform: `translate(calc(var(--m-x) * 0.04px), calc(var(--m-y) * 0.04px))`
                }}
            >
                <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.08}}>
                    <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#B564C3" />
                            <stop offset="50%" stopColor="#3D0448" />
                            <stop offset="100%" stopColor="#B564C3" />
                        </linearGradient>
                    </defs>
                    <path d="M100,300 Q400,150 700,400 T1100,200" stroke="url(#flowGradient)" strokeWidth="3" fill="none" className="animate-pulse" />
                    <path d="M0,500 Q300,250 600,450 T900,300" stroke="url(#flowGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '1.5s'}} />
                    <path d="M200,100 Q500,350 800,150 T1200,400" stroke="url(#flowGradient)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '3s'}} />
                </svg>
            </div>
            
            {/* Content with subtle parallax and 3D perspective */}
            <div 
                className="relative z-20 max-w-4xl mx-auto flex flex-col items-center justify-center py-12 px-6 lg:px-8 text-center min-h-[90vh] transition-transform duration-300 ease-out preserve-3d transform-gpu"
                style={{
                    transform: `translate(calc(var(--m-x) * 0.015px), calc(var(--m-y) * 0.015px)) perspective(1000px) rotateX(calc((var(--m-y) - 50) * -0.05deg)) rotateY(calc((var(--m-x) - 50) * 0.05deg))`
                }}
            >
            
            {/* Headline */}
            <h1 className="text-4xl md:text-7xl font-headline leading-none mb-8 bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent font-extrabold drop-shadow-lg animate-fadeInDown">
             Billing Software
            </h1>
            
            {/* Sub-headline with custom highlight */}
            <div className="text-2xl md:text-5xl font-headline leading-none mb-10 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                <span className="highlight-bg pb-1.5 simple text-gray-600 font-bold drop-shadow-md">Simple. Professional.</span>
            </div>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-black max-w-2xl mb-10 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                Complete billing solution with invoice generation, customer management, and WhatsApp integration.
            </p>

            {/* Action Button */}
            <div className="flex justify-center mb-8 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
               <a href="/Account"> 
                <Button 
                    className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 btn-ripple animate-pulse-glow px-12 py-4 text-lg" 
                    primary
                >
                    Start now - It's free
                </Button>
               </a>
            </div>
            
            {/* Footer Text */}
            <p className="text-sm text-gray-500 animate-fadeIn" style={{ animationDelay: '800ms' }}>
                Professional billing software for businesses. <a href="#" className="text-blue-500 hover:underline">Learn more</a>
            </p>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow flex flex-col items-center gap-2 text-gray-400">
                <span className="text-xs font-bold uppercase tracking-widest">Scroll Down</span>
                <ChevronDown size={20} />
            </div>



            </div>
        </div>
    );
};

export default Homesection1; 