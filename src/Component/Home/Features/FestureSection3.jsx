// Essential Payment Features for Footwear Billing
import React, { useState, useEffect } from 'react';

const paymentFeatures = [
    {
        title: "Payment Status Tracking",
        description: "Monitor paid, pending, and overdue invoices with clear status indicators.",
    },
    {
        title: "Advance Payment Management", 
        description: "Track advance payments and calculate balance amounts automatically.",
    },
    {
        title: "Cash Payment Processing",
        description: "Handle cash transactions with proper receipt generation and tracking.",
    },
    {
        title: "WhatsApp Payment Reminders",
        description: "Send payment reminders and invoice details directly via WhatsApp.",
    },
    {
        title: "Payment History",
        description: "Maintain complete payment records for all customers and transactions.",
    },
    {
        title: "Balance Calculation",
        description: "Automatic calculation of outstanding balances and payment due amounts.",
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
            {/* Payment Management Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Payment Processing */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    {/* Payment Status Interface */}
                    <div className="absolute top-16 right-20 w-80 h-52 bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-green-500/20 p-4 transform -rotate-3">
                        <div className="text-sm font-bold text-gray-800 mb-3">Payment Status</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Paid Today</span>
                                <span className="text-green-600 font-bold">₹25,000</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Pending</span>
                                <span className="text-orange-600 font-bold">₹8,500</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Advance Received</span>
                                <span className="text-blue-600 font-bold">₹12,000</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-green-600 font-bold">💰 Cash Payments</div>
                        </div>
                    </div>
                    
                    {/* WhatsApp Integration */}
                    <div className="absolute bottom-20 left-16 w-64 h-40 bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-blue-500/20 p-4 transform rotate-6">
                        <div className="text-sm font-bold text-gray-800 mb-3">WhatsApp Reminders</div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Sent Today</span>
                                <span className="text-blue-600 font-bold">15</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Delivered</span>
                                <span className="text-green-600 font-bold">14</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Responses</span>
                                <span className="text-purple-600 font-bold">8</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-blue-600 font-bold">📱 WhatsApp Ready</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-16 text-center md:text-left bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent">
                    Payment Management
                </h2>

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