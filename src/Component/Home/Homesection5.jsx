// src/Component/Home/Homesection5.jsx
import React, { useEffect, useState } from 'react';

// Simplified component for the Invoice Payment Portal Card
const PaymentPortalCard = () => {
    return (
        <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-2xl border border-gray-100 mx-auto">
            
            {/* Breadcrumb / Invoice Number */}
            <div className="text-xs text-gray-500 mb-4">
                <a href="#" className="hover:text-purple-main">🏠 Invoices & Bills</a> / INV/2024/00005
            </div>

            {/* Total Amount */}
            <h3 className="text-3xl font-bold text-gray-900 mb-1">$4,427.50</h3>
            
            {/* Due Date */}
            <div className="flex items-center text-sm text-gray-500 mb-6 pb-4 border-b">
                <span className="mr-1">🕒</span> Due in 30 days
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button className="w-full py-3 font-semibold text-white bg-purple-main rounded-lg shadow-md hover:bg-[#4a3249] transition">
                    <span className="mr-2">💳</span> Pay Now
                </button>
                <button className="w-full py-3 font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    <span className="mr-2">⬇️</span> Download
                </button>
            </div>

            {/* Salesperson / Contact Info */}
            <div className="mt-6 pt-4 border-t text-sm space-y-2">
                <div className="flex items-center">
                    <span className="mr-2">👤</span> 
                    <div>
                        <p className="font-semibold">Mitchell Admin</p>
                        <p className="text-xs text-blue-500 cursor-pointer hover:underline">Send message</p>
                    </div>
                </div>
                <p className="text-gray-600">📍 Scranton, United States</p>
                <p className="text-gray-600">📞 +1 555-555-5555</p>
            </div>
        </div>
    );
};

const Homesection5 = () => {
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
        <section className="py-24 relative overflow-hidden">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="paymentBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23f1f5f9;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23e2e8f0;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%23cbd5e1;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="lightning" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M30 10 L20 35 L35 35 L25 50 L40 25 L25 25 Z" fill="%23fbbf24" opacity="0.1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23paymentBg)"/>
                            <rect width="100%" height="100%" fill="url(%23lightning)"/>
                            <circle cx="200" cy="150" r="100" fill="%237c3aed" opacity="0.08"/>
                            <circle cx="1000" cy="200" r="150" fill="%233b82f6" opacity="0.06"/>
                            <circle cx="800" cy="600" r="120" fill="%236366f1" opacity="0.08"/>
                            <path d="M 0 400 Q 300 350 600 400 T 1200 400" stroke="%237c3aed" stroke-width="3" fill="none" opacity="0.15"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) scale(1.05)`
                }}
            ></div>
            
            {/* Parallax Layer 1 - Professional Billing Elements */}
            <div 
                className="absolute inset-0 opacity-5 transition-transform duration-800 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
            >
                {/* Payment Gateway Interface */}
                <div className="absolute top-32 left-16 w-72 h-48 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-[#8BC34A]/10 p-5 transform rotate-6">
                    <div className="text-sm font-bold text-[#4A4A4A] mb-3">Payment Gateway</div>
                    <div className="space-y-3">
                        <div className="flex items-center p-2 bg-[#8BC34A]/5 rounded">
                            <div className="w-4 h-4 bg-[#8BC34A] rounded mr-3"></div>
                            <span className="text-xs">Credit/Debit Cards</span>
                        </div>
                        <div className="flex items-center p-2 bg-[#2E4F7A]/5 rounded">
                            <div className="w-4 h-4 bg-[#2E4F7A] rounded mr-3"></div>
                            <span className="text-xs">UPI & Digital Wallets</span>
                        </div>
                        <div className="flex items-center p-2 bg-[#4A90E2]/5 rounded">
                            <div className="w-4 h-4 bg-[#4A90E2] rounded mr-3"></div>
                            <span className="text-xs">Net Banking</span>
                        </div>
                    </div>
                    <div className="mt-3 pt-2 border-t">
                        <div className="text-xs font-bold text-[#8BC34A]">Secure Payment Processing</div>
                    </div>
                </div>
                
                {/* Transaction History */}
                <div className="absolute bottom-32 right-16 w-64 h-40 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-[#2E4F7A]/10 p-4 transform -rotate-8">
                    <div className="text-sm font-bold text-[#4A4A4A] mb-3">Recent Transactions</div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                            <span>Payment Received</span>
                            <span className="text-[#8BC34A] font-bold">+₹25,000</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span>Invoice Sent</span>
                            <span className="text-[#2E4F7A] font-bold">₹18,500</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span>Payment Pending</span>
                            <span className="text-yellow-600 font-bold">₹12,750</span>
                        </div>
                    </div>
                    <div className="mt-3 pt-2 border-t">
                        <div className="text-xs text-[#4A90E2] font-bold">Balance: ₹1,45,250</div>
                    </div>
                </div>
                
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#8BC34A] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-30"></div>
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#2E4F7A] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-30" style={{animationDelay: '2s'}}></div>
            </div>
            
            {/* Parallax Layer 2 - Payment Processing Elements */}
            <div 
                className="absolute inset-0 opacity-8 transition-transform duration-600 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                }}
            >
                {/* Payment Success Notification */}
                <div className="absolute top-1/2 left-1/6 w-56 h-24 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-[#8BC34A]/15 p-3 transform rotate-12">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#8BC34A] rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm">✓</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-[#4A4A4A]">Payment Successful!</div>
                            <div className="text-xs text-gray-500">₹25,000 received from ABC Corp</div>
                        </div>
                    </div>
                </div>
                
                {/* Payment Methods */}
                <div className="absolute bottom-1/3 right-1/4 w-48 h-32 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-[#2E4F7A]/15 p-3 transform -rotate-6">
                    <div className="text-sm font-bold text-[#4A4A4A] mb-2">Accepted Methods</div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#8BC34A]/10 p-1 rounded text-center">
                            <div className="text-xs">VISA</div>
                        </div>
                        <div className="bg-[#2E4F7A]/10 p-1 rounded text-center">
                            <div className="text-xs">UPI</div>
                        </div>
                        <div className="bg-[#4A90E2]/10 p-1 rounded text-center">
                            <div className="text-xs">GPay</div>
                        </div>
                        <div className="bg-[#8BC34A]/10 p-1 rounded text-center">
                            <div className="text-xs">PayTM</div>
                        </div>
                        <div className="bg-[#2E4F7A]/10 p-1 rounded text-center">
                            <div className="text-xs">HDFC</div>
                        </div>
                        <div className="bg-[#4A90E2]/10 p-1 rounded text-center">
                            <div className="text-xs">SBI</div>
                        </div>
                    </div>
                </div>
                
                <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-[#4A90E2] rounded-full mix-blend-multiply filter blur-2xl animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Parallax Layer 3 - Financial Icons & Currency */}
            <div 
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                }}
            >
                {/* Payment Icons */}
                <div className="absolute top-1/4 right-1/3 text-4xl text-[#8BC34A] opacity-5 animate-bounce">⚡</div>
                <div className="absolute top-2/3 left-1/5 text-3xl text-[#2E4F7A] opacity-4 animate-bounce" style={{animationDelay: '1s'}}>💳</div>
                <div className="absolute bottom-1/4 right-1/5 text-2xl text-[#4A90E2] opacity-5 animate-bounce" style={{animationDelay: '2s'}}>💰</div>
                <div className="absolute top-1/2 left-1/8 text-3xl text-[#8BC34A] opacity-4 animate-bounce" style={{animationDelay: '0.5s'}}>₹</div>
                
                {/* Geometric Payment Elements */}
                <div className="absolute top-1/6 left-1/3 w-8 h-8 border-2 border-[#8BC34A] opacity-3 rounded animate-spin" style={{animationDuration: '10s'}}></div>
                <div className="absolute bottom-1/3 right-1/6 w-6 h-6 bg-[#2E4F7A] opacity-5 transform rotate-45 animate-pulse"></div>
                <div className="absolute top-3/4 left-1/2 w-10 h-2 bg-[#4A90E2] opacity-4 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
            
            {/* Parallax Layer 4 - Payment Flow Lines */}
            <div 
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                }}
            >
                <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.03}}>
                    <defs>
                        <linearGradient id="paymentFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8BC34A" />
                            <stop offset="50%" stopColor="#2E4F7A" />
                            <stop offset="100%" stopColor="#4A90E2" />
                        </linearGradient>
                    </defs>
                    <path d="M100,200 Q400,100 700,300 T1000,150" stroke="url(#paymentFlow)" strokeWidth="3" fill="none" className="animate-pulse" />
                    <path d="M200,400 Q500,250 800,450 T1100,200" stroke="url(#paymentFlow)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                    <path d="M50,350 Q350,150 650,400 T950,250" stroke="url(#paymentFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                </svg>
            </div>
            
            {/* Top Headline Area (outside the main content box) */}
            <div 
                className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center pb-12 transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
            >
                <div className="relative inline-block">
                    <p className="font-headline text-1xl md:text-2xl text-gray-700 mb-3 absolute -top-20 left-1/2 transform -translate-x-1/2 rotate-[-5deg] elc">
                        So fast you'll get a ticket
                        <span className="block text-2xl mt-1">↑</span>
                    </p>
                    <h2 className="font-headline text-4xl md:text-4xl leading-tight elc bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent font-extrabold   ">
                        Get paid in a <span className="text-purple-main">Flash</span>
                    </h2>
                    {/* Lightning Bolt Doodles with Parallax */}
                    <span 
                        className="absolute top-0 right-[-60px] text-7xl md:text-6xl text-yellow-500 transition-transform duration-500"
                        style={{transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`}}
                    >⚡</span>
                    <span 
                        className="absolute top-[-20px] right-[-80px] text-4xl text-yellow-500 opacity-70 transition-transform duration-700"
                        style={{transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * 0.12}px)`}}
                    >⚡</span>
                </div>
            </div>

            {/* Main Content Area: Card and Text */}
            <div 
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 transition-transform duration-400 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                }}
            >
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
                    
                    {/* Left Column: Invoice Card */}
                    <div className="lg:w-1/2 w-full flex justify-center lg:justify-end mb-12 lg:mb-0">
                        <PaymentPortalCard />
                    </div>
                    
                    {/* Right Column: Payment Info and Logos */}
                    <div className="lg:w-1/2 w-full lg:pl-16 lg:pt-10 lg:text-left text-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Online payments.</h3>
                        <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto lg:mx-0">
                            Redirect your clients to a flawless customer portal and let them pay with their preferred online payment method.
                        </p>

                        {/* Payment Logos (Simplified placeholders) */}
                       
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homesection5;