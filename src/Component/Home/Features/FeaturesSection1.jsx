
import React, { useEffect, useState } from 'react';

// Reusing a simplified version of the Button component for self-containment
const Button = ({ children, primary = false, outline = false, className = '', onClick }) => {
    const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition duration-200 text-sm md:text-base shadow-md';
    let styleClasses;
    if (primary) {
        styleClasses = 'bg-purple-main text-white hover:bg-[#4a3249]';
    } else if (outline) {
        styleClasses = 'bg-white text-black border border-gray-300 hover:bg-[#7A4B6D] hover:text-black';
    } else {
        styleClasses = 'bg-teal-highlight text-black hover:bg-[#7A4B6D] hover:text-black';
    } 

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

const FeaturesSection1 = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showVideo, setShowVideo] = useState(false);

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
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="featuresBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23f8fafc;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23e2e8f0;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%23cbd5e1;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="invoice-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="%237A4B6D" stroke-width="0.5" opacity="0.1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23featuresBg)"/>
                            <rect width="100%" height="100%" fill="url(%23invoice-grid)"/>
                            <circle cx="300" cy="200" r="120" fill="%237A4B6D" opacity="0.05"/>
                            <circle cx="900" cy="600" r="150" fill="%2315b090" opacity="0.04"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) scale(1.05)`
                }}
            ></div>
            
            {/* Professional Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Billing Dashboard Mockups */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                    }}
                >
                    {/* Invoice Dashboard */}
                    <div className="absolute top-16 left-16 w-72 h-48 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#8BC34A]/20 p-4 transform rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Invoice Dashboard</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Draft Invoices</span>
                                <span className="text-[#8BC34A] font-bold">12</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Sent Today</span>
                                <span className="text-[#2E4F7A] font-bold">25</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Total Revenue</span>
                                <span className="text-[#4A90E2] font-bold">₹2,45,000</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#8BC34A] font-bold">📈 Performance: +15%</div>
                        </div>
                    </div>
                    
                    {/* Feature Showcase */}
                    <div className="absolute bottom-20 right-16 w-64 h-44 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#2E4F7A]/20 p-4 transform -rotate-6">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Key Features</div>
                        <div className="space-y-2">
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>Auto Tax Calculation</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>Multi-Currency Support</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>Recurring Billing</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>Payment Tracking</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Analytics & Reporting */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`
                    }}
                >
                    {/* Revenue Analytics */}
                    <div className="absolute top-1/3 left-1/4 w-56 h-36 bg-white/75 backdrop-blur-sm rounded-xl shadow-lg border border-[#8BC34A]/25 p-3 transform rotate-12">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Revenue Analytics</div>
                        <div className="flex items-end justify-between h-16 mb-2">
                            <div className="w-3 bg-[#8BC34A] rounded-t animate-pulse" style={{height: '70%'}}></div>
                            <div className="w-3 bg-[#2E4F7A] rounded-t animate-pulse" style={{height: '90%', animationDelay: '0.5s'}}></div>
                            <div className="w-3 bg-[#4A90E2] rounded-t animate-pulse" style={{height: '60%', animationDelay: '1s'}}></div>
                            <div className="w-3 bg-[#8BC34A] rounded-t animate-pulse" style={{height: '85%', animationDelay: '1.5s'}}></div>
                        </div>
                        <div className="text-xs text-[#2E4F7A] font-bold">₹1,85,000 this month</div>
                    </div>
                    
                    {/* Customer Management */}
                    <div className="absolute bottom-1/3 right-1/4 w-48 h-32 bg-white/75 backdrop-blur-sm rounded-xl shadow-lg border border-[#2E4F7A]/25 p-3 transform -rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Top Customers</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>ABC Corp</span>
                                <span className="text-[#8BC34A] font-bold">₹55,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>XYZ Ltd</span>
                                <span className="text-[#2E4F7A] font-bold">₹42,500</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tech Inc</span>
                                <span className="text-[#4A90E2] font-bold">₹38,750</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 3 - Feature Icons */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.035}px, ${mousePosition.y * 0.035}px)`
                    }}
                >
                    {/* Billing Feature Icons */}
                    <div className="absolute top-1/4 right-1/3 text-3xl text-[#8BC34A] opacity-8 animate-bounce">📊</div>
                    <div className="absolute top-2/3 left-1/6 text-2xl text-[#2E4F7A] opacity-6 animate-bounce" style={{animationDelay: '1s'}}>💰</div>
                    <div className="absolute bottom-1/4 right-1/5 text-2xl text-[#4A90E2] opacity-8 animate-bounce" style={{animationDelay: '2s'}}>📄</div>
                    <div className="absolute top-1/2 left-1/8 text-2xl text-[#8BC34A] opacity-6 animate-bounce" style={{animationDelay: '0.5s'}}>⚙️</div>
                    <div className="absolute top-1/6 right-1/6 text-xl text-[#2E4F7A] opacity-5 animate-bounce" style={{animationDelay: '1.5s'}}>🌍</div>
                    
                    {/* Geometric Elements */}
                    <div className="absolute top-1/6 left-1/3 w-6 h-6 border-2 border-[#8BC34A] opacity-5 rounded animate-spin" style={{animationDuration: '30s'}}></div>
                    <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-[#2E4F7A] opacity-6 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-1/2 w-8 h-1 bg-[#4A90E2] opacity-5 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Layer 4 - Data Connection Lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.04}}>
                        <defs>
                            <linearGradient id="billingFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8BC34A" />
                                <stop offset="50%" stopColor="#2E4F7A" />
                                <stop offset="100%" stopColor="#4A90E2" />
                            </linearGradient>
                        </defs>
                        <path d="M200,180 Q500,120 800,280 T1100,160" stroke="url(#billingFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M150,350 Q450,250 750,400 T1050,280" stroke="url(#billingFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                        <path d="M100,520 Q400,420 700,570 T1000,450" stroke="url(#billingFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                    </svg>
                </div>
            </div>
            <div 
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
            >
                
                {/* Main Headline */}
                <h1 className="text-3xl md:text-7xl font-handwriting bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent leading-tight mb-4 font-extrabold drop-shadow-lg">
                    The <span className="text-purple-main">Invoicing</span>
                </h1>
                <h1 className="text-3xl md:text-7xl font-handwriting bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent leading-tight mb-8 font-extrabold drop-shadow-lg">
                    Features You Need
                </h1>
                
                {/* Subtext */}
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
                    From simple billing to automated payment collection and comprehensive reporting, Odoo does it all seamlessly.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <a href="trypage"><Button className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:bg-indigo-400 hover:text-white" outline>
                        Try It Free
                    </Button></a>
                    <Button 
                        onClick={() => setShowVideo(true)}
                        className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:bg-indigo-400 hover:text-white"
                    >
                        Watch Demo
                    </Button>
                </div>
                
                {/* Optional: Small trust indicator */}
                <p className="mt-8 text-sm text-gray-500">
                    Trusted by 7+ million users worldwide.
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-highlight rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-main rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

        </section>
    );
};

export default FeaturesSection1;