// src/Component/Home/Homesection4.jsx
import React, { useEffect, useState } from 'react';

// Using a placeholder image/div for the iPhone mock-up seen in the source image
const MobileInvoiceMockup = () => {
    return (
        <div className="relative w-full max-w-sm mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white border-[10px] border-gray-900 scale-90 lg:scale-100">
            {/* Mock phone notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-20"></div>
            
            {/* The Invoice Content (simplified based on source image) */}
            <div className="p-4 pt-8">
                {/* Header with "PAID" badge */}
                <div className="relative mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Customer Invoice</h3>
                    {/* The angled "PAID" banner is complex to replicate perfectly, using a simple diagonal positioning here */}
                    <div className="absolute top-0 right-0 transform -rotate-12 translate-x-4">
                        <span className="bg-teal-highlight text-white font-bold px-4 py-1 text-sm shadow-lg">PAID</span>
                    </div>
                </div>
                
                <p className="text-sm text-gray-500">INV/2023/00327</p>
                <div className="mt-4 text-sm">
                    <p className="text-gray-600 font-medium">Customer: Fiona's Floral Cafe</p>
                    <p className="text-xs text-gray-500">Champs de Mars, Paris</p>
                    <p className="text-xs text-gray-500">Date: 09/06/2023</p>
                </div>
                
                <div className="border-t pt-4 mt-6">
                    <h4 className="font-semibold text-sm mb-2">Invoice Lines</h4>
                    {/* Item 1 */}
                    <div className="flex justify-between items-start text-sm mb-3">
                        <div>
                            <p className="font-medium">Brazilian Bouncy Brew (Big, Whole bean)</p>
                            <p className="text-xs text-gray-500">Quantity: 5.00 | Unit Price: 240.00</p>
                        </div>
                        <span className="font-bold">1,200.00 €</span>
                    </div>
                    {/* Item 2 */}
                    <div className="flex justify-between items-start text-sm mb-3">
                        <div>
                            <p className="font-medium">New partner onboarding</p>
                            <p className="text-xs text-gray-500">Quantity: 1.00 | Unit Price: 900.00</p>
                        </div>
                        <span className="font-bold">900.00 €</span>
                    </div>
                </div>
            </div>
            {/* Ensure it has enough height to simulate a phone screen */}
            <div className="h-40 bg-white"></div> 
        </div>
    );
};


const Homesection4 = () => {
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
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Professional Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Mobile Billing Interface Mockups */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    {/* Mobile Invoice List */}
                    <div className="absolute top-16 right-16 w-48 h-64 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#8BC34A]/20 p-4 transform rotate-12">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Recent Invoices</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-[#8BC34A]/10 rounded">
                                <div>
                                    <div className="text-xs font-bold">#INV-001</div>
                                    <div className="text-xs text-gray-500">ABC Corp</div>
                                </div>
                                <div className="text-xs font-bold text-[#8BC34A]">₹15,000</div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-[#2E4F7A]/10 rounded">
                                <div>
                                    <div className="text-xs font-bold">#INV-002</div>
                                    <div className="text-xs text-gray-500">XYZ Ltd</div>
                                </div>
                                <div className="text-xs font-bold text-[#2E4F7A]">₹28,500</div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-[#4A90E2]/10 rounded">
                                <div>
                                    <div className="text-xs font-bold">#INV-003</div>
                                    <div className="text-xs text-gray-500">Tech Inc</div>
                                </div>
                                <div className="text-xs font-bold text-[#4A90E2]">₹12,750</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Payment Status Mobile View */}
                    <div className="absolute bottom-20 left-16 w-52 h-48 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#2E4F7A]/20 p-4 transform -rotate-6">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Payment Status</div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-xs">Paid Today</span>
                                </div>
                                <span className="text-xs font-bold text-green-600">₹45,000</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                    <span className="text-xs">Due This Week</span>
                                </div>
                                <span className="text-xs font-bold text-yellow-600">₹18,500</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                    <span className="text-xs">Overdue</span>
                                </div>
                                <span className="text-xs font-bold text-red-600">₹7,250</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#2E4F7A] font-bold">Total Outstanding: ₹25,750</div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Mobile App Features */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`
                    }}
                >
                    {/* Quick Actions Mobile */}
                    <div className="absolute top-1/3 left-1/4 w-44 h-32 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#8BC34A]/30 p-3 transform rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Quick Actions</div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-[#8BC34A]/20 p-2 rounded text-center">
                                <div className="text-lg">📝</div>
                                <div className="text-xs">New Invoice</div>
                            </div>
                            <div className="bg-[#2E4F7A]/20 p-2 rounded text-center">
                                <div className="text-lg">💳</div>
                                <div className="text-xs">Payment</div>
                            </div>
                            <div className="bg-[#4A90E2]/20 p-2 rounded text-center">
                                <div className="text-lg">📈</div>
                                <div className="text-xs">Reports</div>
                            </div>
                            <div className="bg-[#8BC34A]/20 p-2 rounded text-center">
                                <div className="text-lg">📞</div>
                                <div className="text-xs">Contact</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile Notification */}
                    <div className="absolute bottom-1/3 right-1/4 w-56 h-20 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#2E4F7A]/30 p-3 transform -rotate-12">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-[#8BC34A] rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-[#4A4A4A]">Payment Received</div>
                                <div className="text-xs text-gray-500">ABC Corp paid ₹15,000</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 3 - Mobile UI Elements */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`
                    }}
                >
                    {/* Mobile Icons */}
                    <div className="absolute top-1/5 right-1/3 text-3xl opacity-15 animate-bounce">📱</div>
                    <div className="absolute top-2/3 left-1/6 text-2xl opacity-12 animate-bounce" style={{animationDelay: '1s'}}>💰</div>
                    <div className="absolute bottom-1/4 right-1/5 text-2xl opacity-15 animate-bounce" style={{animationDelay: '2s'}}>⚙️</div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-1/4 left-1/8 w-6 h-6 border-2 border-[#8BC34A] opacity-10 rounded animate-spin" style={{animationDuration: '8s'}}></div>
                    <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-[#2E4F7A] opacity-15 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/3 w-8 h-1 bg-[#4A90E2] opacity-12 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Layer 4 - Connection Lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.05}}>
                        <defs>
                            <linearGradient id="mobileFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8BC34A" />
                                <stop offset="50%" stopColor="#2E4F7A" />
                                <stop offset="100%" stopColor="#4A90E2" />
                            </linearGradient>
                        </defs>
                        <path d="M100,150 Q400,250 700,100 T1000,300" stroke="url(#mobileFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M200,400 Q500,200 800,350 T1100,150" stroke="url(#mobileFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1.5s'}} />
                    </svg>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10">
                
                {/* Left Column: Mockup */}
                <div className="lg:w-1/2 w-full flex justify-center lg:justify-start relative z-10 mb-12 lg:mb-0">
                    <MobileInvoiceMockup />
                    {/* The Download Doodle Icon */}
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-teal-highlight">
                        <span role="img" aria-label="Download Icon">⬇️</span> 
                    </div>
                </div>
                
                {/* Right Column: Text and CTA */}
                <div className="lg:w-1/2 w-full lg:pl-16 lg:text-left text-center">
                    <h2 className="text-4xl font-headline text-purple-main leading-tight mb-6 elc bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent font-extrabold">
                        Your invoices <span className="highlight-bg pb-1 inline-block">in your pocket</span>
                    </h2>
                    
                    <p className="text-xl text-gray-700 mb-10">
                        Use the **mobile app** to issue invoices to your customers, update payment status, 
                        or even create batch payments for your vendor bills! Anytime, anywhere.
                    </p>

                    {/* App Store Buttons */}
                    <div className="flex justify-center lg:justify-start space-x-4">
                        {/* Google Play Button */}
                        <a href="#" className="flex items-center bg-gray-100 p-3 rounded-xl hover:shadow transition">
                            <span className="text-3xl mr-2">▶️</span> 
                            <div><p className="text-xs text-gray-600">Get it on</p><p className="font-semibold">Google Play</p></div>
                        </a>
                        {/* App Store Button */}
                        <a href="#" className="flex items-center bg-gray-100 p-3 rounded-xl hover:shadow transition">
                            <span className="text-3xl mr-2"></span> 
                            <div><p className="text-xs text-gray-600">Download on</p><p className="font-semibold">the App Store</p></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homesection4;