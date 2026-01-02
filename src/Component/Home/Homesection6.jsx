// src/Component/Home/Homesection6.jsx
import React, { useEffect, useState } from 'react';

// Simplified component for the Invoices Dashboard/Follow-up Table
const FollowUpDashboardMockup = () => {
    return (
        <div className="w-full max-w-5xl p-4 md:p-6 bg-white rounded-xl shadow-2xl border border-gray-100 mx-auto">
            
            {/* Toolbar / Search Bar (Simplified) */}
            <div className="flex justify-between items-center pb-3 mb-4 border-b">
                <div className="flex space-x-3 text-sm">
                    <button className="px-3 py-1 rounded bg-purple-main text-white">New</button>
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-700">Upload</button>
                    <span className="text-gray-500 hidden sm:inline">Invoices ⓘ</span> {/* Hide on tiny screens */}
                </div>
                <div className="text-sm text-gray-500">1-80 / 81</div>
            </div>

            {/* Invoices Table (Responsive fix: Wrap table in scrollable div) */}
            <div className="overflow-x-auto"> 
                <table className="min-w-[700px] divide-y divide-gray-200 text-sm"> 
                    <thead>
                        <tr className="text-left text-gray-500 uppercase tracking-wider">
                            <th className="py-2 w-1/12">Number</th>
                            <th className="py-2 w-2/12">Customer</th>
                            <th className="py-2 w-1/12">Due Date</th>
                            <th className="py-2 w-3/12">Activities</th>
                            <th className="py-2 w-1/12 text-right">Total</th>
                            <th className="py-2 w-2/12 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Row 1: Paid Today */}
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 font-medium text-gray-900">24-0073</td>
                            <td className="py-3">Abigail Peterson</td>
                            <td className="py-3 text-green-600 font-semibold">Today</td>
                            <td className="py-3 text-blue-600">✔ Follow-up on payment</td>
                            <td className="py-3 text-right">12.00 €</td>
                            <td className="py-3 text-center"><span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-200 text-green-800">Paid</span></td>
                        </tr>
                        {/* Row 2: Overdue */}
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 font-medium text-gray-900">24-0072</td>
                            <td className="py-3">YourCompany, Joel Wills</td>
                            <td className="py-3 text-red-600">Overdue</td>
                            <td className="py-3 text-blue-600">📞 Call</td>
                            <td className="py-3 text-right">750.00 €</td>
                            <td className="py-3 text-center"><span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-200 text-yellow-800">In Payment</span></td>
                        </tr>
                        {/* Row 3: Follow-up needed */}
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 font-medium text-gray-900">24-0043</td>
                            <td className="py-3">Asia Foster</td>
                            <td className="py-3">28 days</td>
                            <td className="py-3 text-blue-600">ⓘ Include upsell</td>
                            <td className="py-3 text-right">88,711.50 €</td>
                            <td className="py-3 text-center"><span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-200 text-red-800">Not Paid</span></td>
                        </tr>
                    </tbody>
                </table>
            </div> {/* End of overflow-x-auto div */}
            
        </div>
    );
};

const Homesection6 = () => {
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
                {/* Layer 1 - Banking & Automation Interface */}
                <div 
                    className="absolute inset-0 opacity-20 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                    }}
                >
                    {/* Bank Connection Interface */}
                    <div className="absolute top-20 left-16 w-64 h-48 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#8BC34A]/30 p-4 transform rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Bank Integration</div>
                        <div className="space-y-2">
                            <div className="flex items-center p-2 bg-[#8BC34A]/10 rounded">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-xs">HDFC Bank Connected</span>
                            </div>
                            <div className="flex items-center p-2 bg-[#2E4F7A]/10 rounded">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-xs">SBI Account Linked</span>
                            </div>
                            <div className="flex items-center p-2 bg-[#4A90E2]/10 rounded">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                <span className="text-xs">ICICI Pending</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#8BC34A] font-bold">Auto-sync: Enabled</div>
                        </div>
                    </div>
                    
                    {/* Follow-up Automation */}
                    <div className="absolute bottom-24 right-16 w-72 h-40 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#2E4F7A]/30 p-4 transform -rotate-6">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Automated Follow-ups</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Overdue Reminders</span>
                                <span className="text-[#8BC34A] font-bold">12 Sent</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Payment Confirmations</span>
                                <span className="text-[#2E4F7A] font-bold">8 Received</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Due Date Alerts</span>
                                <span className="text-[#4A90E2] font-bold">5 Scheduled</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#2E4F7A] font-bold">Next Follow-up: Tomorrow 10 AM</div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Payment Status & Tracking */}
                <div 
                    className="absolute inset-0 opacity-25 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    {/* Payment Status Dashboard */}
                    <div className="absolute top-1/3 left-1/4 w-56 h-32 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-[#8BC34A]/35 p-3 transform rotate-12">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Payment Tracking</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-green-100 p-2 rounded text-center">
                                <div className="font-bold text-green-600">25</div>
                                <div>Paid</div>
                            </div>
                            <div className="bg-yellow-100 p-2 rounded text-center">
                                <div className="font-bold text-yellow-600">8</div>
                                <div>Pending</div>
                            </div>
                            <div className="bg-red-100 p-2 rounded text-center">
                                <div className="font-bold text-red-600">3</div>
                                <div>Overdue</div>
                            </div>
                            <div className="bg-blue-100 p-2 rounded text-center">
                                <div className="font-bold text-blue-600">12</div>
                                <div>Due Soon</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Automation Rules */}
                    <div className="absolute bottom-1/3 right-1/4 w-48 h-28 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-[#2E4F7A]/35 p-3 transform -rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Auto Rules</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-[#8BC34A] rounded mr-2"></div>
                                <span>Send reminder at 7 days</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-[#2E4F7A] rounded mr-2"></div>
                                <span>Mark overdue at 30 days</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-[#4A90E2] rounded mr-2"></div>
                                <span>Auto-reconcile payments</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 3 - Banking & Automation Icons */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                    }}
                >
                    {/* Banking Icons */}
                    <div className="absolute top-1/4 right-1/3 text-3xl text-[#8BC34A] opacity-20 animate-bounce">🏦</div>
                    <div className="absolute top-2/3 left-1/6 text-2xl text-[#2E4F7A] opacity-18 animate-bounce" style={{animationDelay: '1s'}}>⚙️</div>
                    <div className="absolute bottom-1/4 right-1/5 text-2xl text-[#4A90E2] opacity-20 animate-bounce" style={{animationDelay: '2s'}}>🔄</div>
                    <div className="absolute top-1/2 left-1/8 text-2xl text-[#8BC34A] opacity-18 animate-bounce" style={{animationDelay: '0.5s'}}>✓</div>
                    
                    {/* Geometric Elements */}
                    <div className="absolute top-1/6 left-1/3 w-6 h-6 border-2 border-[#8BC34A] opacity-15 rounded animate-spin" style={{animationDuration: '12s'}}></div>
                    <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-[#2E4F7A] opacity-20 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-1/2 w-8 h-1 bg-[#4A90E2] opacity-18 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Layer 4 - Data Flow Lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.12}}>
                        <defs>
                            <linearGradient id="bankingFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8BC34A" />
                                <stop offset="50%" stopColor="#2E4F7A" />
                                <stop offset="100%" stopColor="#4A90E2" />
                            </linearGradient>
                        </defs>
                        <path d="M150,250 Q450,150 750,350 T1050,200" stroke="url(#bankingFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M100,400 Q400,300 700,450 T1000,300" stroke="url(#bankingFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1.5s'}} />
                    </svg>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
                
                {/* Headline: Adjusted font sizes for better responsiveness and removed non-standard 'elc' class */}
                <h2 className="text-4xl md:text-4xl font-headline bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent leading-tight mb-2 elc font-extrabold">
                    Connect your bank <span className="text-teal-highlight">☑️</span>
                </h2>
                <h3 className="text-5xl md:text-4xl font-headline leading-tight mb-8 elc bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent font-extrabold">
                    <span className="text-purple-main">⚙️</span> Automate <span className="highlight-bg pb-1 inline-block">follow-ups</span>
                </h3>
                
                {/* Subtext */}
                <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12">
                    Track open payments with clear statuses and due dates. 
                    Set reminders for entries that need follow-up.
                </p>

                {/* Dashboard Mockup */}
                <FollowUpDashboardMockup />

            </div>
        </section>
    );
};

export default Homesection6;