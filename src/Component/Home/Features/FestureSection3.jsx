// src/Component/Home/Features/FeaturesSection4.jsx
import React, { useState, useEffect } from 'react';

// Data for the payment features based on image_095858.png and image_fefdfb.png
const paymentFeatures = [
    {
        title: "Invoices overview",
        description: "Get a broad view of all invoices and filter them by status.",
    },
    {
        title: "Payments types",
        description: "SEPA payments and check printing in US format.",
    },
    {
        title: "Multiple currencies",
        description: "Allow customers to pay in their currency with an automatic currency converter and record gains and losses for each conversion. Automated update of currency rates based on chosen frequency: daily, weekly, or monthly.",
    },
    {
        title: "Get paid online",
        description: "Send your invoices by email and add a link to Authorize, Paypal, Ingenico, Buckaroo, or Adyen to get paid quickly, easily, and securely.",
    },
    {
        title: "Batch Payments",
        description: "Select multiple vendor bills and pay them all at once. Credit a batch of customers via SEPA Direct Debit or credit card tokens.",
    },
    {
        title: "Manage and customize sequence numbers",
        description: "Invoice sequence numbers are handled automatically once the invoice is confirmed. If a gap in the sequence occurs, Odoo automatically warns you.",
    },
    {
        title: "Credit limit",
        description: "Specific credit limits can be set to notify the user if the limit chosen for a customer is being exceeded.",
    },
];

const FeaturesSection3 = () => {
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
            {/* Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Payment Processing */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    {/* Payment Gateway Interface */}
                    <div className="absolute top-16 right-20 w-80 h-52 bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-green-500/20 p-4 transform -rotate-3">
                        <div className="text-sm font-bold text-gray-800 mb-3">Payment Gateway</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>PayPal Integration</span>
                                <span className="text-green-600 font-bold">✓ Active</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Stripe Processing</span>
                                <span className="text-green-600 font-bold">✓ Connected</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>SEPA Payments</span>
                                <span className="text-blue-600 font-bold">✓ Enabled</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-green-600 font-bold">💳 Ready for Payments</div>
                        </div>
                    </div>
                    
                    {/* Currency Converter */}
                    <div className="absolute bottom-20 left-16 w-64 h-40 bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-blue-500/20 p-4 transform rotate-6">
                        <div className="text-sm font-bold text-gray-800 mb-3">Multi-Currency</div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>USD → EUR</span>
                                <span className="text-blue-600 font-bold">0.85</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>GBP → USD</span>
                                <span className="text-blue-600 font-bold">1.27</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>INR → USD</span>
                                <span className="text-blue-600 font-bold">0.012</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-blue-600 font-bold">🔄 Auto-Updated</div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Batch Processing */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                    }}
                >
                    {/* Batch Payment Dashboard */}
                    <div className="absolute top-1/2 left-1/3 w-72 h-44 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-500/25 p-4 transform rotate-12">
                        <div className="text-sm font-bold text-gray-800 mb-2">Batch Processing</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>Pending Payments</span>
                                <span className="text-orange-600 font-bold">24</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Processed Today</span>
                                <span className="text-green-600 font-bold">156</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Amount</span>
                                <span className="text-purple-600 font-bold">₹2,45,000</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-purple-600 font-bold">⚡ Bulk Operations</div>
                        </div>
                    </div>
                    
                    {/* Credit Limit Monitor */}
                    <div className="absolute bottom-1/4 right-1/3 w-56 h-36 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-red-500/25 p-3 transform -rotate-8">
                        <div className="text-sm font-bold text-gray-800 mb-2">Credit Monitoring</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>Available Credit</span>
                                <span className="text-green-600 font-bold">₹85,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Used Credit</span>
                                <span className="text-orange-600 font-bold">₹15,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Alerts</span>
                                <span className="text-red-600 font-bold">2 Active</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-red-600 font-bold">⚠️ Limit Monitoring</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Title: "Handle payments" */}
                <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-16 text-center md:text-left text-green-700">
                    Handle payments
                </h2>

                {/* Features Grid (Responsive: 1 col on mobile, 2 on tablet/desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {paymentFeatures.map((feature, index) => (
                        <div key={index} className="flex flex-col">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-lg text-gray-700">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default FeaturesSection3;