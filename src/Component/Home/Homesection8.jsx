// Essential Business Tools for Footwear Billing
import React, { useEffect, useState } from 'react';

const businessTools = [
    {
        name: "Billing Dashboard",
        tagline: "Create and manage invoices",
        icon: "📊",
        color: "bg-blue-400"
    },
    {
        name: "Customer Management",
        tagline: "Track customer details",
        icon: "👥",
        color: "bg-green-400"
    },
    {
        name: "Payment Tracking",
        tagline: "Monitor payment status",
        icon: "💰",
        color: "bg-yellow-400"
    },
    {
        name: "WhatsApp Integration",
        tagline: "Send bills via WhatsApp",
        icon: "📱",
        color: "bg-green-500"
    },
    {
        name: "Reports & Analytics",
        tagline: "View sales reports",
        icon: "📈",
        color: "bg-purple-400"
    },
];

const ToolCard = ({ tool }) => (
    <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-lg flex items-center space-x-4 cursor-pointer">
        <div className={`p-3 rounded-xl bg-opacity-20 ${tool.color} text-4xl`}>
            {tool.icon}
        </div>
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{tool.name}</h3>
            <p className="text-gray-600 text-sm">{tool.tagline}</p>
        </div>
    </div>
);

const Homesection8 = () => {
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
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-left relative z-10">
                
                <h2 className="text-4xl md:text-4xl font-headline bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent leading-tight mb-4 font-extrabold">
                    One <span className="highlight-bg pb-1 inline-block">solution</span>, complete <span className="highlight-bg pb-1 inline-block">billing</span>.
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-12">
                    Everything you need for footwear business billing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                    {businessTools.map((tool, index) => (
                        <ToolCard key={index} tool={tool} />
                    ))}
                </div>

                <div className="mt-12">
                    <a href="/Dashboard" className="text-blue-600 text-lg font-semibold hover:underline flex items-center">
                        Get started now 
                        <span className="ml-2 text-xl">→</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Homesection8;