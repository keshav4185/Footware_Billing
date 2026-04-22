import React, { useEffect, useState } from 'react';
import { Smartphone, IndianRupee, FileText, Search, Briefcase } from 'lucide-react';
import ScrollReveal from '../../ScrollReveal';

// Reusing a simplified version of the Button component for self-containment
const Button = ({ children, primary = false, outline = false, className = '', onClick }) => {
    const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition duration-200 text-sm md:text-base shadow-md';
    let styleClasses;
    if (primary) {
        styleClasses = 'bg-gradient-to-r from-[#B564C3] to-[#3D0448] text-white';
    } else if (outline) {
        styleClasses = 'bg-white text-gray-800 border border-gray-200 hover:border-[#B564C3] hover:text-[#B564C3]';
    } else {
        styleClasses = 'bg-[#3D0448] text-white hover:opacity-90';
    } 

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

const FeaturesSection1 = () => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <section className="py-24 md:py-32 relative overflow-hidden perspective-1000">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out transform-gpu"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="featuresBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23f3e8ff;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23fae8ff;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%23e0e7ff;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="invoice-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="%23B564C3" stroke-width="0.5" opacity="0.1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23featuresBg)"/>
                            <rect width="100%" height="100%" fill="url(%23invoice-grid)"/>
                            <circle cx="300" cy="200" r="120" fill="%23B564C3" opacity="0.05"/>
                            <circle cx="900" cy="600" r="150" fill="%233D0448" opacity="0.04"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(calc(var(--m-x) * -0.02px), calc(var(--m-y) * -0.02px)) scale(1.05)`
                }}
            ></div>
            
            {/* Professional Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Billing Dashboard Mockups */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.015px), calc(var(--m-y) * 0.015px))`
                    }}
                >
                    {/* Invoice Dashboard */}
                    <div className="absolute top-16 left-16 w-72 h-48 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#B564C3]/20 p-4 transform rotate-8">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-3">Billing Dashboard</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Today's Bills</span>
                                <span className="text-emerald-600 font-bold">8</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Total Customers</span>
                                <span className="text-[#3D0448] font-bold">156</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Monthly Revenue</span>
                                <span className="text-[#3D0448] font-bold">₹1,25,000</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#B564C3] font-bold">📱 WhatsApp Ready</div>
                        </div>
                    </div>
                    
                    {/* Feature Showcase */}
                    <div className="absolute bottom-20 right-16 w-64 h-44 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#3D0448]/20 p-4 transform -rotate-6">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-3">Key Features</div>
                        <div className="space-y-2">
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                <span>CGST/SGST Calculation</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                <span>WhatsApp Integration</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                <span>Digital Signatures</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                <span>Payment Tracking</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Analytics & Reporting */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.025px), calc(var(--m-y) * 0.025px))`
                    }}
                >
                    {/* Revenue Analytics */}
                    <div className="absolute top-1/3 left-1/4 w-56 h-36 bg-white/75 backdrop-blur-sm rounded-xl shadow-lg border border-[#B564C3]/25 p-3 transform rotate-12">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-2">Revenue Analytics</div>
                        <div className="flex items-end justify-between h-16 mb-2">
                            <div className="w-3 bg-[#B564C3] rounded-t animate-pulse" style={{height: '70%'}}></div>
                            <div className="w-3 bg-[#3D0448] rounded-t animate-pulse" style={{height: '90%', animationDelay: '0.5s'}}></div>
                            <div className="w-3 bg-indigo-400/50 rounded-t animate-pulse" style={{height: '60%', animationDelay: '1s'}}></div>
                            <div className="w-3 bg-[#B564C3] rounded-t animate-pulse" style={{height: '85%', animationDelay: '1.5s'}}></div>
                        </div>
                        <div className="text-xs text-[#3D0448] font-bold">₹1,85,000 this month</div>
                    </div>
                    
                    {/* Customer Management */}
                    <div className="absolute bottom-1/3 right-1/4 w-48 h-32 bg-white/75 backdrop-blur-sm rounded-xl shadow-lg border border-[#3D0448]/25 p-3 transform -rotate-8">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-2">Recent Customers</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>Raj Footwear</span>
                                <span className="text-emerald-600 font-bold">₹15,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shoe Palace</span>
                                <span className="text-[#3D0448] font-bold">₹12,500</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Style Steps</span>
                                <span className="text-[#3D0448] font-bold">₹8,750</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 3 - Feature Icons */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.035px), calc(var(--m-y) * 0.035px))`
                    }}
                >
                    {/* Billing Feature Icons */}
                    <div className="absolute top-1/4 right-1/3 text-[#B564C3] opacity-8 animate-bounce">
                        <Smartphone size={32} />
                    </div>
                    <div className="absolute top-2/3 left-1/6 text-[#3D0448] opacity-6 animate-bounce" style={{animationDelay: '1s'}}>
                        <IndianRupee size={24} />
                    </div>
                    <div className="absolute bottom-1/4 right-1/5 text-[#B564C3]/50 opacity-8 animate-bounce" style={{animationDelay: '2s'}}>
                        <FileText size={24} />
                    </div>
                    <div className="absolute top-1/2 left-1/8 text-[#B564C3] opacity-6 animate-bounce" style={{animationDelay: '0.5s'}}>
                        <Search size={24} />
                    </div>
                    <div className="absolute top-1/6 right-1/6 text-[#3D0448] opacity-5 animate-bounce" style={{animationDelay: '1.5s'}}>
                        <Briefcase size={20} />
                    </div>
                    
                    {/* Geometric Elements */}
                    <div className="absolute top-1/6 left-1/3 w-6 h-6 border-2 border-[#B564C3] opacity-5 rounded animate-spin" style={{animationDuration: '30s'}}></div>
                    <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-[#3D0448] opacity-6 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-1/2 w-8 h-1 bg-[#B564C3]/30 opacity-5 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Layer 4 - Data Connection Lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.02px), calc(var(--m-y) * 0.02px))`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.04}}>
                        <defs>
                            <linearGradient id="billingFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#B564C3" />
                                <stop offset="50%" stopColor="#3D0448" />
                                <stop offset="100%" stopColor="#4A4B4D" />
                            </linearGradient>
                        </defs>
                        <path d="M200,180 Q500,120 800,280 T1100,160" stroke="url(#billingFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M150,350 Q450,250 750,400 T1050,280" stroke="url(#billingFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                        <path d="M100,520 Q400,420 700,570 T1000,450" stroke="url(#billingFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                    </svg>
                </div>
            </div>
            <div 
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center transition-transform duration-300 ease-out transform-gpu"
                style={{
                    transform: `translate(calc(var(--m-x) * 0.01px), calc(var(--m-y) * 0.01px))`
                }}
            >
                
                {/* Main Headline */}
                <ScrollReveal animation="fadeInDown">
                    <h1 className="text-3xl md:text-7xl font-handwriting bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent leading-tight mb-4 font-extrabold drop-shadow-lg">
                        Essential <span className="text-[#B564C3]">Billing</span>
                    </h1>
                </ScrollReveal>
                <ScrollReveal animation="fadeInDown" delay={100}>
                    <h1 className="text-3xl md:text-7xl font-handwriting bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent leading-tight mb-8 font-extrabold drop-shadow-lg">
                        Features You Need
                    </h1>
                </ScrollReveal>
                
                {/* Subtext */}
                <ScrollReveal animation="fadeIn" delay={300}>
                    <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
                        From invoice creation to WhatsApp sharing and payment tracking - everything your footwear business needs.
                    </p>
                </ScrollReveal>

                {/* Call-to-Action Buttons */}
                <ScrollReveal animation="fadeInUp" delay={500}>
                    <div className="flex justify-center space-x-4">
                        <a href="/Account"><Button className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:bg-indigo-400 hover:text-white" outline>
                            Try It Free
                        </Button></a>
                        <Button 
                            onClick={() => setShowVideo(true)}
                            className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:bg-indigo-400 hover:text-white"
                        >
                            Watch Demo
                        </Button>
                    </div>
                </ScrollReveal>
                
                {/* Optional: Small trust indicator */}
                <p className="mt-8 text-sm text-gray-500">
                    Trusted by footwear retailers for professional billing.
                </p>

            </div>
            
            {/* Video Modal */}
            {showVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowVideo(false)}>
                    <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={() => setShowVideo(false)}
                            className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
                        >
                            ✕
                        </button>
                        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                            <iframe
                                src="https://www.youtube.com/embed/Yh6WXhOaL3s?autoplay=1"
                                title="Billing Software Demo"
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Background elements (Odoo style swooshes/shapes) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B564C3]/10 rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#3D0448]/10 rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

        </section>
    );
};

export default FeaturesSection1;