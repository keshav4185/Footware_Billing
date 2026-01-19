// Essential Reporting Features for Footwear Billing
import React, { useState, useEffect } from 'react';

const reportFeatures = [
    {
        title: "Bill History & Search",
        description: "View and search through all your billing history with detailed invoice records.",
    },
    {
        title: "Customer Reports",
        description: "Track customer purchase history, payment patterns, and outstanding balances.",
    },
    {
        title: "Daily Sales Summary",
        description: "Get daily, weekly, and monthly sales summaries with revenue tracking.",
    },
    {
        title: "Payment Status Reports",
        description: "Monitor payment collection rates and identify overdue accounts.",
    },
    {
        title: "Tax Reports",
        description: "Generate CGST and SGST reports for tax compliance and filing.",
    },
    {
        title: "Employee Performance",
        description: "Track individual employee sales performance and billing activity.",
    },
];

const FeaturesSection4 = () => {
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
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Reporting Dashboard Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Analytics Dashboard */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                    }}
                >
                    {/* Sales Analytics Chart */}
                    <div className="absolute top-20 left-16 w-80 h-56 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-500/20 p-4 transform rotate-3">
                        <div className="text-sm font-bold text-gray-800 mb-3">Sales Dashboard</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Today's Sales</span>
                                <span className="text-green-600 font-bold">₹45,000</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>This Month</span>
                                <span className="text-blue-600 font-bold">₹4,85,000</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Bills Created</span>
                                <span className="text-purple-600 font-bold">156</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-blue-600 font-bold">📊 Real-time Data</div>
                        </div>
                    </div>
                    
                    {/* Customer Analytics */}
                    <div className="absolute bottom-24 right-20 w-72 h-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-500/20 p-4 transform -rotate-6">
                        <div className="text-sm font-bold text-gray-800 mb-3">Customer Insights</div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Total Customers</span>
                                <span className="text-green-600 font-bold">342</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Active This Month</span>
                                <span className="text-blue-600 font-bold">156</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Repeat Customers</span>
                                <span className="text-purple-600 font-bold">89</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-green-600 font-bold">👥 Customer Analytics</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-16 text-center md:text-left bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent">
                    Reports & Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {reportFeatures.map((feature, index) => (
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

export default FeaturesSection4;