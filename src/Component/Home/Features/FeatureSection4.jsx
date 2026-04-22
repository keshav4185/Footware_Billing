import React, { useState, useEffect } from 'react';
import { BarChart3, Users } from 'lucide-react';
import ScrollReveal from '../../ScrollReveal';
import TiltCard from '../../TiltCard';

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
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden perspective-1000">
            {/* Reporting Dashboard Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Analytics Dashboard */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.015px), calc(var(--m-y) * 0.015px))`
                    }}
                >
                    {/* Sales Analytics Chart */}
                    <div className="absolute top-20 left-16 w-80 h-56 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-[#B564C3]/20 p-4 transform rotate-3">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-3">Sales Dashboard</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Today's Sales</span>
                                <span className="text-emerald-600 font-bold">₹45,000</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>This Month</span>
                                <span className="text-indigo-600 font-bold">₹4,85,000</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Bills Created</span>
                                <span className="text-purple-600 font-bold">156</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-indigo-600 font-bold flex items-center gap-1">
                                <BarChart3 size={14} /> Real-time Data
                            </div>
                        </div>
                    </div>
                    
                    {/* Customer Analytics */}
                    <div className="absolute bottom-24 right-20 w-72 h-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-[#3D0448]/20 p-4 transform -rotate-6">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-3">Customer Insights</div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Total Customers</span>
                                <span className="text-emerald-600 font-bold">342</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Active This Month</span>
                                <span className="text-indigo-600 font-bold">156</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Repeat Customers</span>
                                <span className="text-purple-600 font-bold">89</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                <Users size={14} /> Customer Analytics
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <ScrollReveal animation="fadeInDown">
                    <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-16 text-center md:text-left bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent">
                        Reports & Analytics
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {reportFeatures.map((feature, index) => (
                        <ScrollReveal 
                            key={index} 
                            animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"} 
                            delay={index * 100} 
                            className="h-full"
                        >
                            <TiltCard maxTilt={10} className="h-full">
                                <div className="flex flex-col p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 h-full card-hover">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 ">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </TiltCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection4;