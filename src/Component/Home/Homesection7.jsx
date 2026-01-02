// src/Component/Home/Homesection8.jsx
import React, { useEffect, useState } from 'react';

// Define the data for the feature cards
const features = [
    {
        title: "160 countries supported",
        description: "Full support with electronic invoicing, bank integrations, taxes statements, etc.",
        link: "List of supported countries",
        image: "CountriesMockup"
    },
    {
        title: "Issue refunds",
        description: "Create credit notes and manage reimbursements Electronic invoicing, bank integrations,tax statements, and local compliance —all in one global billing platform.",
        image: "RefundsMockup"
    },
    {
        title: "Handle recurring invoices",
        description: "Set the frequency of invoicing for subscriptions of recurring services and products.",
        image: "RecurringInvoicesMockup" // Placeholder for the screenshot
    },
    {
        title: "Sales reports",
        description: "Get direct access to key information with dynamic and customizable dashboards.",
        image:"RecurringInvoicesMockup"
    },
    {
        title: "Multiple currencies",
        description: "Issue invoices and receive payments in different currencies with an automatic update of the conversion rate.",
        image: "CurrencyMockup"
    },
    {
        title: "Your invoice, your style",
        description: "Customize your invoices according to your branding.",
        image: "InvoiceStyleMockup" // Placeholder for the customization screenshot
    },
    {
        title: "Snail mail",
        description: "Automate the sending of invoices and payment follow-ups by post.",
        image: "SnailMailMockup"
    },
];

// Helper Component for a single card
const FeatureCard = ({ feature }) => {
    // Mockup components for the features that include screenshots
    const Mockup = () => {
        if (feature.image === "RecurringInvoicesMockup") {
            return (
                <div className="bg-gray-100 p-3 rounded-lg mt-4 shadow-inner text-xs text-gray-700 overflow-x-auto">
                    {/* Simplified table structure based on the screenshot */}
                    <p className="font-semibold mb-2">Recurring Plans ⚙️</p>
                    <table className="min-w-[300px] w-full">
                        <thead>
                            <tr className="text-left text-gray-500">
                                <th className="py-1">Name</th>
                                <th className="py-1">Billing Period</th>
                                <th className="py-1">Closing After</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-gray-200">
                                <td className="py-1">Monthly</td>
                                <td className="py-1">1 Month</td>
                                <td className="py-1">60 days</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <td className="py-1">6 Months</td>
                                <td className="py-1">6 Months</td>
                                <td className="py-1">15 days</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
        if (feature.image === "CountriesMockup") {
            return (
                <div className="bg-gray-100 p-3 rounded-lg mt-4 shadow-inner text-xs text-gray-700">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-lg">🌍</span>
                        <span className="font-semibold">Global Coverage</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center">
                        <div className="bg-white p-1 rounded">🇺🇸 US</div>
                        <div className="bg-white p-1 rounded">🇬🇧 UK</div>
                        <div className="bg-white p-1 rounded">🇩🇪 DE</div>
                        <div className="bg-white p-1 rounded">🇫🇷 FR</div>
                        <div className="bg-white p-1 rounded">🇯🇵 JP</div>
                        <div className="bg-white p-1 rounded">🇨🇦 CA</div>
                        <div className="bg-white p-1 rounded">🇦🇺 AU</div>
                        <div className="bg-white p-1 rounded text-purple-600">+153</div>
                    </div>
                </div>
            );
        }
        if (feature.image === "RefundsMockup") {
            return (
                <div className="bg-gray-100 p-3 rounded-lg mt-4 shadow-inner text-xs text-gray-700">
                    <div className="bg-white p-2 rounded border-l-4 border-red-400">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold">Credit Note #CN001</span>
                            <span className="text-red-600">-$250.00</span>
                        </div>
                        <p className="text-gray-500">Refund processed</p>
                        <div className="flex items-center mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            <span className="text-green-600">Completed</span>
                        </div>
                    </div>
                </div>
            );
        }
        if (feature.image === "SnailMailMockup") {
            return (
                <div className="bg-gray-100 p-3 rounded-lg mt-4 shadow-inner text-xs text-gray-700">
                    <div className="bg-white p-2 rounded border">
                        <div className="flex items-center mb-2">
                            <span className="text-lg mr-2">📮</span>
                            <span className="font-semibold">Mail Queue</span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <span>Invoice #INV-001</span>
                                <span className="text-blue-600">Scheduled</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Reminder #REM-002</span>
                                <span className="text-green-600">Sent</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (feature.image === "CurrencyMockup") {
            return (
                <div className="bg-gray-100 p-3 rounded-lg mt-4 shadow-inner text-xs text-gray-700">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-lg">💱</span>
                        <span className="font-semibold">Currency Exchange</span>
                    </div>
                    <div className="space-y-2">
                        <div className="bg-white p-2 rounded flex justify-between items-center">
                            <span>💵 USD $1,250.00</span>
                            <span className="text-green-600">↗️ 1.08</span>
                        </div>
                        <div className="bg-white p-2 rounded flex justify-between items-center">
                            <span>💶 EUR €1,157.41</span>
                            <span className="text-blue-600">→ 1.00</span>
                        </div>
                        <div className="bg-white p-2 rounded flex justify-between items-center">
                            <span>💷 GBP £987.50</span>
                            <span className="text-purple-600">↗️ 0.85</span>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 mt-2">Auto-updated rates</p>
                </div>
            );
        }
        if (feature.image === "InvoiceStyleMockup") {
            return (
                <div className="bg-gray-100 p-3 rounded-lg mt-4 shadow-inner text-xs text-gray-700">
                    {/* Simplified color picker/preview based on the screenshot */}
                    <div className="flex justify-between items-start">
                        <div className="w-1/3">
                            <p className="text-gray-500 mb-1">Company Origin</p>
                            <p className="font-bold text-lg text-purple-main leading-none">Monkey Coffee Lab</p>
                            <div className="flex space-x-1 mt-2">
                                <div className="w-4 h-4 rounded-full bg-red-600 border border-gray-300"></div>
                                <div className="w-4 h-4 rounded-full bg-orange-300 border border-gray-300"></div>
                                <div className="w-4 h-4 rounded-full bg-gray-600 border border-purple-main ring-2 ring-purple-main"></div>
                            </div>
                        </div>
                        <div className="w-2/3 ml-4 border p-2 bg-white text-right">
                            <p className="text-[10px] text-gray-400">Invoice R430230</p>
                            <p className="font-semibold text-sm">2,350.00 €</p>
                            <p className="text-[10px] text-red-600 mt-2">Unpaid</p>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-50 transition hover:shadow-xl flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <span className="text-yellow-500 text-2xl">⭐</span>
            </div>
            
            <div className="text-gray-600">
                <p className="text-base">{feature.description}</p>
                {feature.link && (
                    <a href="#" className="text-purple-main font-medium hover:underline mt-1 block text-sm">
                        {feature.link}
                    </a>
                )}
            </div>

            {/* Render the mockup if an image tag is defined */}
            {feature.image && <Mockup />}
        </div>
    );
};


const Homesection7 = () => {
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
        <section className="py-24 bg-gray-100/50 relative overflow-hidden">
            {/* Professional Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Feature Interface Mockups */}
                <div 
                    className="absolute inset-0 opacity-18 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    {/* Multi-Currency Interface */}
                    <div className="absolute top-16 left-16 w-64 h-40 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#8BC34A]/30 p-4 transform rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Multi-Currency</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>💵 USD</span>
                                <span className="text-[#8BC34A] font-bold">$25,000</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>💶 EUR</span>
                                <span className="text-[#2E4F7A] font-bold">€18,500</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>₹ INR</span>
                                <span className="text-[#4A90E2] font-bold">₹1,85,000</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#8BC34A] font-bold">Auto Exchange Rates</div>
                        </div>
                    </div>
                    
                    {/* Invoice Templates */}
                    <div className="absolute bottom-20 right-16 w-72 h-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#2E4F7A]/30 p-4 transform -rotate-6">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Invoice Templates</div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-[#8BC34A]/20 p-2 rounded text-center">
                                <div className="text-xs font-bold">Professional</div>
                                <div className="text-xs text-gray-500">Clean & Modern</div>
                            </div>
                            <div className="bg-[#2E4F7A]/20 p-2 rounded text-center">
                                <div className="text-xs font-bold">Corporate</div>
                                <div className="text-xs text-gray-500">Business Ready</div>
                            </div>
                            <div className="bg-[#4A90E2]/20 p-2 rounded text-center">
                                <div className="text-xs font-bold">Creative</div>
                                <div className="text-xs text-gray-500">Colorful Design</div>
                            </div>
                            <div className="bg-[#8BC34A]/20 p-2 rounded text-center">
                                <div className="text-xs font-bold">Minimal</div>
                                <div className="text-xs text-gray-500">Simple Layout</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Advanced Features */}
                <div 
                    className="absolute inset-0 opacity-22 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                    }}
                >
                    {/* Tax Management */}
                    <div className="absolute top-1/3 left-1/4 w-56 h-36 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#8BC34A]/35 p-3 transform rotate-12">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Tax Management</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>GST (18%)</span>
                                <span className="text-[#8BC34A] font-bold">₹4,500</span>
                            </div>
                            <div className="flex justify-between">
                                <span>CGST (9%)</span>
                                <span className="text-[#2E4F7A] font-bold">₹2,250</span>
                            </div>
                            <div className="flex justify-between">
                                <span>SGST (9%)</span>
                                <span className="text-[#4A90E2] font-bold">₹2,250</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-[#8BC34A] font-bold">Auto Tax Calculation</div>
                        </div>
                    </div>
                    
                    {/* Recurring Billing */}
                    <div className="absolute bottom-1/3 right-1/4 w-48 h-32 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#2E4F7A]/35 p-3 transform -rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Recurring Billing</div>
                        <div className="space-y-2">
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#8BC34A] rounded mr-2"></div>
                                <span>Monthly: 15 Active</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#2E4F7A] rounded mr-2"></div>
                                <span>Quarterly: 8 Active</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#4A90E2] rounded mr-2"></div>
                                <span>Yearly: 3 Active</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-[#2E4F7A] font-bold">Next: Tomorrow</div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 3 - Feature Icons */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`
                    }}
                >
                    {/* Feature Icons */}
                    <div className="absolute top-1/4 right-1/3 text-3xl text-[#8BC34A] opacity-25 animate-bounce">📊</div>
                    <div className="absolute top-2/3 left-1/6 text-2xl text-[#2E4F7A] opacity-22 animate-bounce" style={{animationDelay: '1s'}}>💱</div>
                    <div className="absolute bottom-1/4 right-1/5 text-2xl text-[#4A90E2] opacity-25 animate-bounce" style={{animationDelay: '2s'}}>⚙️</div>
                    <div className="absolute top-1/2 left-1/8 text-2xl text-[#8BC34A] opacity-22 animate-bounce" style={{animationDelay: '0.5s'}}>📄</div>
                    <div className="absolute top-1/6 right-1/6 text-xl text-[#2E4F7A] opacity-20 animate-bounce" style={{animationDelay: '1.5s'}}>🌍</div>
                    
                    {/* Geometric Elements */}
                    <div className="absolute top-1/6 left-1/3 w-6 h-6 border-2 border-[#8BC34A] opacity-18 rounded animate-spin" style={{animationDuration: '15s'}}></div>
                    <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-[#2E4F7A] opacity-22 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-1/2 w-8 h-1 bg-[#4A90E2] opacity-20 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Layer 4 - Feature Connection Lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.15}}>
                        <defs>
                            <linearGradient id="featureFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8BC34A" />
                                <stop offset="50%" stopColor="#2E4F7A" />
                                <stop offset="100%" stopColor="#4A90E2" />
                            </linearGradient>
                        </defs>
                        <path d="M200,180 Q500,120 800,280 T1100,160" stroke="url(#featureFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M150,350 Q450,250 750,400 T1050,280" stroke="url(#featureFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                        <path d="M100,500 Q400,400 700,550 T1000,450" stroke="url(#featureFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                    </svg>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
                
                {/* Headline: "All the features done right." */}
                <h2 className="text-4xl md:text-4xl font-headline bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent leading-tight mb-12 font-extrabold">
                    All the <span className="highlight-bg pb-1 inline-block">features</span> done right.
                </h2>
                
                {/* Features Grid (Responsive: 1 col on mobile, 2 on md, 3 on lg) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>

                {/* Final CTA link */}
                <div className="mt-12">
                    <a href="/Featurespage" className="text-purple-main text-lg font-semibold hover:underline flex items-center justify-center">
                        See all features 
                        <span className="ml-2 text-xl">→</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Homesection7;