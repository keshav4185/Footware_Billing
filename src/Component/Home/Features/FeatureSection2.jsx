// src/Component/Home/Features/FeaturesSection2And3Combined.jsx
import React, { useEffect, useState } from 'react';

const invoiceFeatures = [
    // --- Features from former FeaturesSection2 (Manage Invoices) ---
    {
        title: "Create customer invoices",
        description: "Issue clear, complete and professional invoices in seconds.",
        group: "Manage invoices"
    },
    {
        title: "Print or send by email",
        description: "Print a hard copy of your invoices to send them by post or email.",
        group: "Manage invoices"
    },
    {
        title: "Issue refunds",
        description: "Create credit notes and manage reimbursements.",
        group: "Manage invoices"
    },
    {
        title: "Multi-company rules",
        description: "Automatically mirror orders and invoices in multi-company setup.",
        group: "Manage invoices"
    },
    {
        title: "Address autocomplete",
        description: "Enter a valid VAT number, and Odoo will autocomplete the customer's name and address (Europe only).",
        group: "Manage invoices"
    },
    {
        title: "3-Way matching payments",
        description: "Compare the information on purchase orders, vendor bills, and receipts to determine whether or not your bill should be paid.",
        group: "Manage invoices"
    },
    {
        title: "Manage supplier invoices",
        description: "Record supplier invoices in the system to manage payments and integrate them into your accounting.",
        group: "Manage invoices"
    },
    {
        title: "Handle recurring invoices",
        description: "Set product invoicing frequency according to contract specifications.",
        group: "Manage invoices"
    },
    // --- Features from former FeaturesSection3 (Compliance/Other) ---
    {
        title: "Include Incoterms®",
        description: "Use Incoterms standards to ensure you have the right contract terms.",
        group: "Accounting & Compliance"
    },
    {
        title: "Payments terms",
        description: "Set up and use your preferred payment terms.",
        group: "Accounting & Compliance"
    },
    {
        title: "Customers payments",
        description: "Easily keep track of payments with options such as batch deposit.",
        group: "Accounting & Compliance"
    },
    {
        title: "Automated tax",
        description: "Set up your tax rules to automatically calculate taxes on your invoice, and define where rounding occurs to get accurate reports.",
        group: "Accounting & Compliance"
    },
    {
        title: "Compliance with International invoicing requirements",
        description: "Germany, Italy, Spain, Belgium, and many more.",
        group: "Accounting & Compliance"
    },
    {
        title: "Peppol",
        description: "Odoo supports - but not only - the Peppol electronic invoice format for countries' part of the EAS.",
        group: "Accounting & Compliance"
    },
    {
        title: "Customization",
        description: "Choose your preferred design, style, and logo to personalize your invoices.",
        group: "Accounting & Compliance"
    },
    {
        title: "Vendor bills import",
        description: "Manage your vendor bills easily with document digitization. Set up an email alias to directly get all your bills on your Odoo database.",
        group: "Accounting & Compliance"
    },
];

const FeaturesSection2 = () => {
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

    // Group features by their assigned category
    const groupedFeatures = invoiceFeatures.reduce((acc, feature) => {
        if (!acc[feature.group]) {
            acc[feature.group] = [];
        }
        acc[feature.group].push(feature);
        return acc;
    }, {});

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Professional Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Invoice Management Interfaces */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                    }}
                >
                    {/* Invoice Creation Interface */}
                    <div className="absolute top-20 left-16 w-72 h-48 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#8BC34A]/20 p-4 transform rotate-6">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Invoice Creation</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Customer Details</span>
                                <span className="text-[#8BC34A] font-bold">Auto-filled</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Tax Calculation</span>
                                <span className="text-[#2E4F7A] font-bold">Automated</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Payment Terms</span>
                                <span className="text-[#4A90E2] font-bold">Configured</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#8BC34A] font-bold">📝 Ready to Send</div>
                        </div>
                    </div>
                    
                    {/* Compliance Dashboard */}
                    <div className="absolute bottom-24 right-16 w-64 h-44 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#2E4F7A]/20 p-4 transform -rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Compliance Status</div>
                        <div className="space-y-2">
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>PEPPOL Compliant</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>VAT Rules Applied</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>Incoterms Included</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#2E4F7A] font-bold">✅ All Requirements Met</div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Payment & Refund Management */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`
                    }}
                >
                    {/* Payment Tracking */}
                    <div className="absolute top-1/3 left-1/4 w-56 h-36 bg-white/75 backdrop-blur-sm rounded-xl shadow-lg border border-[#8BC34A]/25 p-3 transform rotate-12">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Payment Tracking</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>Received Today</span>
                                <span className="text-[#8BC34A] font-bold">₹45,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Pending</span>
                                <span className="text-[#2E4F7A] font-bold">₹18,500</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Overdue</span>
                                <span className="text-red-600 font-bold">₹7,250</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-[#8BC34A] font-bold">💳 Batch Deposits</div>
                        </div>
                    </div>
                    
                    {/* Refund Management */}
                    <div className="absolute bottom-1/3 right-1/4 w-48 h-32 bg-white/75 backdrop-blur-sm rounded-xl shadow-lg border border-[#2E4F7A]/25 p-3 transform -rotate-6">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Credit Notes</div>
                        <div className="space-y-2">
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#8BC34A] rounded mr-2"></div>
                                <span>CN-001: ₹5,000</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#2E4F7A] rounded mr-2"></div>
                                <span>CN-002: ₹3,250</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#4A90E2] rounded mr-2"></div>
                                <span>CN-003: ₹1,800</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-[#2E4F7A] font-bold">💰 Refunds Processed</div>
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
                    {/* Invoice Feature Icons */}
                    <div className="absolute top-1/4 right-1/3 text-3xl text-[#8BC34A] opacity-8 animate-bounce">📄</div>
                    <div className="absolute top-2/3 left-1/6 text-2xl text-[#2E4F7A] opacity-6 animate-bounce" style={{animationDelay: '1s'}}>💼</div>
                    <div className="absolute bottom-1/4 right-1/5 text-2xl text-[#4A90E2] opacity-8 animate-bounce" style={{animationDelay: '2s'}}>⚖️</div>
                    <div className="absolute top-1/2 left-1/8 text-2xl text-[#8BC34A] opacity-6 animate-bounce" style={{animationDelay: '0.5s'}}>📧</div>
                    <div className="absolute top-1/6 right-1/6 text-xl text-[#2E4F7A] opacity-5 animate-bounce" style={{animationDelay: '1.5s'}}>🔄</div>
                    
                    {/* Geometric Elements */}
                    <div className="absolute top-1/6 left-1/3 w-6 h-6 border-2 border-[#8BC34A] opacity-5 rounded animate-spin" style={{animationDuration: '25s'}}></div>
                    <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-[#2E4F7A] opacity-6 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-1/2 w-8 h-1 bg-[#4A90E2] opacity-5 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Layer 4 - Data Flow Lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.04}}>
                        <defs>
                            <linearGradient id="invoiceFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8BC34A" />
                                <stop offset="50%" stopColor="#2E4F7A" />
                                <stop offset="100%" stopColor="#4A90E2" />
                            </linearGradient>
                        </defs>
                        <path d="M200,150 Q500,100 800,250 T1100,130" stroke="url(#invoiceFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M150,320 Q450,220 750,370 T1050,250" stroke="url(#invoiceFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                        <path d="M100,480 Q400,380 700,530 T1000,410" stroke="url(#invoiceFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                    </svg>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* --- Group 1: Manage Invoices --- */}
                <h2 className=" font-extrabold text-3xl md:text-4xl font-script text-purple-main leading-tight mb-16 text-center md:text-left font-handwriting bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent">
                    {Object.keys(groupedFeatures)[0]}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-24 ">
                    {groupedFeatures["Manage invoices"].map((feature, index) => (
                        <div key={index} className="flex flex-col">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2 ">
                                {feature.title}
                            </h3>
                            <p className="text-lg text-gray-700">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* --- Group 2: Accounting & Compliance --- */}
                <h2 className=" font-extrabold text-3xl md:text-4xl font-script text-teal-highlight leading-tight mb-16 text-center md:text-left border-t pt-16 font-handwriting bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent">
                    {Object.keys(groupedFeatures)[1]}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12   ">
                    {groupedFeatures["Accounting & Compliance"].map((feature, index) => (
                        <div key={index} className="flex flex-col">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2 ">
                                {feature.title}
                            </h3>
                            <p className="text-lg text-gray-700 ">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection2;