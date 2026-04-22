import React, { useEffect, useState } from 'react';
import { Smartphone, Calculator, PenTool, IndianRupee, Users, FileText } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const features = [
    {
        title: "WhatsApp Integration",
        description: "Send invoices directly to customers via WhatsApp with formatted bill details and payment reminders.",
        icon: <Smartphone className="text-[#3D0448]" size={24} />,
        color: "bg-[#3D0448]/10"
    },
    {
        title: "CGST/SGST Calculation", 
        description: "Automatic tax calculation with configurable CGST and SGST rates for Indian tax compliance.",
        icon: <Calculator className="text-[#3D0448]" size={24} />,
        color: "bg-[#3D0448]/10"
    },
    {
        title: "Digital Signatures",
        description: "Add your company's digital signature to invoices for professional authentication and branding.",
        icon: <PenTool className="text-[#B564C3]" size={24} />,
        color: "bg-[#B564C3]/10"
    },
    {
        title: "Payment Tracking",
        description: "Track advance payments, balance amounts, and payment status for each customer invoice.",
        icon: <IndianRupee className="text-[#B564C3]" size={24} />,
        color: "bg-[#B564C3]/10"
    },
    {
        title: "Customer Management",
        description: "Store and manage customer details including phone numbers, addresses, and purchase history.",
        icon: <Users className="text-[#3D0448]" size={24} />,
        color: "bg-[#3D0448]/10"
    },
    {
        title: "Professional Invoices",
        description: "Generate clean, branded invoices with your company logo and customizable templates.",
        icon: <FileText className="text-[#3D0448]" size={24} />,
        color: "bg-[#3D0448]/10"
    },
];

const FeatureCard = ({ feature }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-50 transition hover:shadow-xl flex flex-col justify-between group">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#B564C3] transition-colors">{feature.title}</h3>
            <div className={`p-2 rounded-lg ${feature.color} group-hover:scale-110 transition-transform`}>
                {feature.icon}
            </div>
        </div>
        
        <div className="text-gray-600">
            <p className="text-base">{feature.description}</p>
        </div>
    </div>
);

const Homesection7 = () => {
    return (
        <section className="py-24 bg-gray-100/50 relative overflow-hidden perspective-1000">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
                
                <ScrollReveal animation="fadeInDown">
                    <h2 className="text-4xl md:text-4xl font-headline bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent leading-tight mb-12 font-extrabold">
                        Essential <span className="highlight-bg pb-1 inline-block">features</span> for footwear billing.
                    </h2>
                </ScrollReveal>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {features.map((feature, index) => (
                        <ScrollReveal 
                            key={index} 
                            animation="fadeInUp" 
                            delay={index * 100}
                        >
                            <FeatureCard feature={feature} />
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal animation="fadeIn" delay={600} className="mt-12">
                    <a href="/Featurespage" className="text-[#B564C3] text-lg font-semibold hover:underline flex items-center justify-center">
                        Start using these features 
                        <span className="ml-2 text-xl">→</span>
                    </a>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Homesection7;