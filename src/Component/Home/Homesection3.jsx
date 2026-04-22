import React from 'react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
// ADD any UI image in assets (example path below)
import uiImage from '../../assets/Home/01.svg';

const Button = ({ children, primary = false, className = '', ...props }) => {
    const baseClasses = 'px-8 py-3 font-semibold rounded-lg transition duration-200 shadow-lg cursor-pointer';
    const styleClasses = primary 
        ? 'bg-gradient-to-r from-[#B564C3] to-[#3D0448] text-white hover:opacity-90' 
        : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50';

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Homesection3 = () => {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden perspective-1000">
            {/* Professional Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Billing Dashboard Mockups */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.02px), calc(var(--m-y) * 0.02px))`
                    }}
                >
                    {/* Invoice Template */}
                    <TiltCard className="absolute top-20 left-10" maxTilt={20}>
                        <div className="w-72 h-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-[#B564C3]/20 p-5 transform rotate-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="h-4 bg-[#B564C3] rounded w-20"></div>
                                <div className="text-sm font-bold text-[#3D0448]">INVOICE</div>
                            </div>
                            <div className="space-y-2 mb-4">
                                <div className="h-2 bg-gray-300 rounded w-full"></div>
                                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                            </div>
                            <div className="border-t pt-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#4A4B4D]">Total:</span>
                                    <span className="text-lg font-bold text-[#B564C3]">₹45,250</span>
                                </div>
                            </div>
                        </div>
                    </TiltCard>
                    
                    {/* Payment Methods Interface */}
                    <TiltCard className="absolute bottom-32 right-16" maxTilt={25}>
                        <div className="w-64 h-40 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-[#3D0448]/20 p-4 transform -rotate-3">
                            <div className="text-sm font-bold text-[#4A4B4D] mb-3">Payment Methods</div>
                            <div className="space-y-2">
                                <div className="flex items-center p-2 bg-[#B564C3]/10 rounded">
                                    <div className="w-3 h-3 bg-[#B564C3] rounded mr-2"></div>
                                    <span className="text-xs">Cash Payment</span>
                                </div>
                                <div className="flex items-center p-2 bg-[#3D0448]/10 rounded">
                                    <div className="w-3 h-3 bg-[#3D0448] rounded mr-2"></div>
                                    <span className="text-xs">WhatsApp Share</span>
                                </div>
                                <div className="flex items-center p-2 bg-[#B564C3]/10 rounded">
                                    <div className="w-3 h-3 bg-[#B564C3] rounded mr-2"></div>
                                    <span className="text-xs">Digital Receipt</span>
                                </div>
                            </div>
                        </div>
                    </TiltCard>
                </div>
                
                {/* Layer 2 - Financial Analytics */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.04px), calc(var(--m-y) * 0.04px))`
                    }}
                >
                    {/* Revenue Analytics */}
                    <TiltCard className="absolute top-1/3 left-1/4" maxTilt={30}>
                        <div className="w-56 h-36 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#B564C3]/30 p-4 transform rotate-12">
                            <div className="text-sm font-bold text-[#4A4B4D] mb-2">Revenue Analytics</div>
                            <div className="flex items-end justify-between h-16 mb-2">
                                <div className="w-4 bg-gradient-to-t from-[#B564C3] to-[#B564C3]/50 rounded-t animate-pulse" style={{height: '70%'}}></div>
                                <div className="w-4 bg-gradient-to-t from-[#3D0448] to-[#3D0448]/50 rounded-t animate-pulse" style={{height: '90%', animationDelay: '0.5s'}}></div>
                                <div className="w-4 bg-gradient-to-t from-[#B564C3] to-[#B564C3]/50 rounded-t animate-pulse" style={{height: '60%', animationDelay: '1s'}}></div>
                                <div className="w-4 bg-gradient-to-t from-[#3D0448] to-[#3D0448]/50 rounded-t animate-pulse" style={{height: '85%', animationDelay: '1.5s'}}></div>
                            </div>
                            <div className="text-xs text-[#3D0448] font-bold">₹1,25,000 this month</div>
                        </div>
                    </TiltCard>
                    
                    {/* Tax Calculation */}
                    <div className="absolute bottom-1/4 left-1/6 w-48 h-28 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#3D0448]/30 p-3 transform -rotate-8">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-2">Tax Summary</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>CGST (9%)</span>
                                <span className="text-[#B564C3] font-bold">₹4,072</span>
                            </div>
                            <div className="flex justify-between">
                                <span>SGST (9%)</span>
                                <span className="text-[#3D0448] font-bold">₹4,072</span>
                            </div>
                            <div className="border-t pt-1 flex justify-between font-bold">
                                <span>Total Tax</span>
                                <span className="text-[#B564C3]">₹8,144</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 3 - Floating Financial Elements */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.06px), calc(var(--m-y) * 0.06px))`
                    }}
                >
                    {/* Floating Currency & Symbols */}
                    <div className="absolute top-1/5 right-1/4 text-4xl text-[#B564C3] opacity-15 animate-bounce">₹</div>
                    <div className="absolute top-2/3 left-1/5 text-2xl text-[#3D0448] opacity-12 animate-bounce" style={{animationDelay: '1s'}}>%</div>
                    <div className="absolute bottom-1/5 right-1/3 text-3xl text-[#B564C3] opacity-15 animate-bounce" style={{animationDelay: '2s'}}>+</div>
                    
                    {/* Financial Icons */}
                    <div className="absolute top-1/2 left-1/8 w-8 h-8 border-2 border-[#B564C3] opacity-10 rounded-full animate-spin" style={{animationDuration: '12s'}}></div>
                    <div className="absolute bottom-1/3 right-1/5 w-6 h-6 bg-[#3D0448] opacity-15 transform rotate-45 animate-pulse"></div>
                    <div className="absolute top-1/4 left-1/2 w-12 h-2 bg-[#B564C3] opacity-12 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
                </div>
                
                {/* Layer 4 - Data Connection Lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.03px), calc(var(--m-y) * 0.03px))`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.06}}>
                        <defs>
                            <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#B564C3" />
                                <stop offset="50%" stopColor="#3D0448" />
                                <stop offset="100%" stopColor="#B564C3" />
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
                    <ScrollReveal animation="slideInLeft" className="lg:w-1/2 space-y-6 mb-12 lg:mb-0 lg:text-left text-center">
                        <span className="text-sm font-semibold uppercase text-[#B564C3] tracking-wider">
                            Essential Features
                        </span>
                        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent leading-tight elc">
                            Professional Footwear Billing Made Simple
                        </h2>
                        <p className="text-xl text-gray-600">
                            Create professional invoices with CGST/SGST calculation, send via WhatsApp, 
                            and track payments - everything your footwear business needs in one place.
                        </p>
                    </ScrollReveal>

                    {/* Right Column */}
                    <ScrollReveal animation="slideInRight" className="lg:w-1/2 w-full flex justify-center">
                        <TiltCard maxTilt={5} perspective={2000} className="w-full">
                            <div className="relative w-full max-w-lg pt-[56.25%] rounded-xl shadow-2xl overflow-hidden bg-gray-900"> 
                                
                                {/* YouTube Video */}
                                <iframe
                                    className="absolute inset-0 w-full h-full rounded-xl"
                                    src="https://www.youtube.com/embed/PD2eKTzkZ70?autoplay=1&mute=1&loop=1&playlist=PD2eKTzkZ70&controls=0&modestbranding=1"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="Feature Video"
                                ></iframe>

                            </div>
                        </TiltCard>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
};

export default Homesection3;
