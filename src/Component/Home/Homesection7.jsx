// Essential Features for Footwear Billing
import React, { useEffect, useState } from 'react';

const features = [
    {
        title: "WhatsApp Integration",
        description: "Send invoices directly to customers via WhatsApp with formatted bill details and payment reminders.",
        icon: "📱",
        color: "bg-green-400"
    },
    {
        title: "CGST/SGST Calculation", 
        description: "Automatic tax calculation with configurable CGST and SGST rates for Indian tax compliance.",
        icon: "🧮",
        color: "bg-blue-400"
    },
    {
        title: "Digital Signatures",
        description: "Add your company's digital signature to invoices for professional authentication and branding.",
        icon: "✍️",
        color: "bg-purple-400"
    },
    {
        title: "Payment Tracking",
        description: "Track advance payments, balance amounts, and payment status for each customer invoice.",
        icon: "💰",
        color: "bg-yellow-400"
    },
    {
        title: "Customer Management",
        description: "Store and manage customer details including phone numbers, addresses, and purchase history.",
        icon: "👥",
        color: "bg-indigo-400"
    },
    {
        title: "Professional Invoices",
        description: "Generate clean, branded invoices with your company logo and customizable templates.",
        icon: "📄",
        color: "bg-teal-400"
    },
];

const FeatureCard = ({ feature }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-50 transition hover:shadow-xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <span className="text-2xl">{feature.icon}</span>
        </div>
        
        <div className="text-gray-600">
            <p className="text-base">{feature.description}</p>
        </div>
    </div>
);

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
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
                
                <h2 className="text-4xl md:text-4xl font-headline bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent leading-tight mb-12 font-extrabold">
                    Essential <span className="highlight-bg pb-1 inline-block">features</span> for footwear billing.
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>

                <div className="mt-12">
                    <a href="/Featurespage" className="text-blue-600 text-lg font-semibold hover:underline flex items-center justify-center">
                        Start using these features 
                        <span className="ml-2 text-xl">→</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Homesection7;