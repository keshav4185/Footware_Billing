import React from 'react';
import { IndianRupee, Smartphone } from 'lucide-react';
import ScrollReveal from '../../ScrollReveal';
import TiltCard from '../../TiltCard';

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

const FeatureSection3 = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden perspective-1000">
            {/* Payment Management Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Payment Processing */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.02px), calc(var(--m-y) * 0.02px))`
                    }}
                >
                    {/* Payment Status Interface */}
                    <div className="absolute top-16 right-20 w-80 h-52 bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-[#B564C3]/20 p-4 transform -rotate-3">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-3">Payment Status</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Paid Today</span>
                                <span className="text-emerald-600 font-bold">₹25,000</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Pending</span>
                                <span className="text-orange-600 font-bold">₹8,500</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Advance Received</span>
                                <span className="text-indigo-600 font-bold">₹12,000</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                <IndianRupee size={14} /> Cash Payments
                            </div>
                        </div>
                    </div>
                    
                    {/* WhatsApp Integration */}
                    <div className="absolute bottom-20 left-16 w-64 h-40 bg-white/85 backdrop-blur-sm rounded-xl shadow-lg border border-[#3D0448]/20 p-4 transform rotate-6">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-3">WhatsApp Reminders</div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Sent Today</span>
                                <span className="text-indigo-600 font-bold">15</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Delivered</span>
                                <span className="text-emerald-600 font-bold">14</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span>Responses</span>
                                <span className="text-[#B564C3] font-bold">8</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t text-indigo-600">
                            <div className="text-xs font-bold flex items-center gap-1">
                                <Smartphone size={14} /> WhatsApp Ready
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <ScrollReveal animation="fadeInDown">
                    <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-16 text-center md:text-left bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent">
                        Payment Management
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {paymentFeatures.map((feature, index) => (
                        <ScrollReveal 
                            key={index} 
                            animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"} 
                            delay={index * 100} 
                            className="h-full"
                        >
                            <TiltCard maxTilt={10} className="h-full">
                                <div className="flex flex-col p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 h-full card-hover">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
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

export default FeatureSection3;
