// src/Component/Home/Features/FeaturesSection5.jsx
import React, { useState, useEffect } from 'react';

const reportFeatures = [
    {
        title: "Invoice analysis report",
        description: "Get a comprehensive overview of your invoices and sales status.",
    },
    {
        title: "Sales reports",
        description: "Get direct access to key information with dynamic and customizable dashboards.",
    },
    // Note: The source image only provides two main reports. You could expand this list 
    // with typical accounting reports if needed, but for now, we stick to the source.
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
            {/* Billing Reports Parallax Background */}
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
                        <div className="text-sm font-bold text-gray-800 mb-3">Sales Analytics</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>This Month</span>
                                <span className="text-green-600 font-bold">₹4,85,000</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Growth Rate</span>
                                <span className="text-blue-600 font-bold">+23.5%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-blue-600 font-bold">📊 Real-time Data</div>
                        </div>
                    </div>
                    
                    {/* Invoice Status Report */}
                    <div className="absolute bottom-24 right-20 w-72 h-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-500/20 p-4 transform -rotate-6">
                        <div className="text-sm font-bold text-gray-800 mb-3">Invoice Status</div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Paid Invoices</span>
                                <span className="text-green-600 font-bold">142 (85%)</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Pending</span>
                                <span className="text-orange-600 font-bold">18 (11%)</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Overdue</span>
                                <span className="text-red-600 font-bold">7 (4%)</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-green-600 font-bold">✅ Comprehensive Overview</div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Dynamic Reports */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`
                    }}
                >
                    {/* Custom Dashboard */}
                    <div className="absolute top-1/3 right-1/4 w-64 h-40 bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-purple-500/25 p-3 transform rotate-12">
                        <div className="text-sm font-bold text-gray-800 mb-2">Custom Dashboard</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>Active Reports</span>
                                <span className="text-purple-600 font-bold">12</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Scheduled</span>
                                <span className="text-blue-600 font-bold">5</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Automated</span>
                                <span className="text-green-600 font-bold">8</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-purple-600 font-bold">🎯 Customizable</div>
                        </div>
                    </div>
                    
                    {/* Performance Metrics */}
                    <div className="absolute bottom-1/3 left-1/4 w-56 h-36 bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-500/25 p-3 transform -rotate-9">
                        <div className="text-sm font-bold text-gray-800 mb-2">Performance KPIs</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>Collection Rate</span>
                                <span className="text-green-600 font-bold">94.2%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Avg. Payment Time</span>
                                <span className="text-blue-600 font-bold">12 days</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Revenue Growth</span>
                                <span className="text-indigo-600 font-bold">+18.7%</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-indigo-600 font-bold">📈 Key Insights</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Title: "Reports" */}
                <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-16 text-center md:text-left text-green-700">
                    Reports
                </h2>

                {/* Features Grid (Responsive: 1 col on mobile, 2 on tablet/desktop) */}
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