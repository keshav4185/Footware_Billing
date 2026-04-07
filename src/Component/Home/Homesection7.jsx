import React, { useEffect, useState } from 'react';
import { Smartphone, Calculator, PenTool, IndianRupee, Users, FileText } from 'lucide-react';

const features = [
    {
        title: "WhatsApp Integration",
        description: "Send invoices directly to customers via WhatsApp with formatted bill details and payment reminders.",
        icon: <Smartphone className="text-green-600" size={24} />,
        color: "bg-green-100"
    },
    {
        title: "CGST/SGST Calculation", 
        description: "Automatic tax calculation with configurable CGST and SGST rates for Indian tax compliance.",
        icon: <Calculator className="text-blue-600" size={24} />,
        color: "bg-blue-100"
    },
    {
        title: "Digital Signatures",
        description: "Add your company's digital signature to invoices for professional authentication and branding.",
        icon: <PenTool className="text-purple-600" size={24} />,
        color: "bg-purple-100"
    },
    {
        title: "Payment Tracking",
        description: "Track advance payments, balance amounts, and payment status for each customer invoice.",
        icon: <IndianRupee className="text-yellow-600" size={24} />,
        color: "bg-yellow-100"
    },
    {
        title: "Customer Management",
        description: "Store and manage customer details including phone numbers, addresses, and purchase history.",
        icon: <Users className="text-indigo-600" size={24} />,
        color: "bg-indigo-100"
    },
    {
        title: "Professional Invoices",
        description: "Generate clean, branded invoices with your company logo and customizable templates.",
        icon: <FileText className="text-teal-600" size={24} />,
        color: "bg-teal-100"
    },
];

const FeatureCard = ({ feature }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-50 transition hover:shadow-xl flex flex-col justify-between group">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
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