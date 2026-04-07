import React, { useEffect, useState } from 'react';
import { BarChart3, Users, IndianRupee, Smartphone, TrendingUp } from 'lucide-react';

const businessTools = [
    {
        name: "Billing Dashboard",
        tagline: "Create and manage invoices",
        icon: <BarChart3 className="text-blue-600" size={24} />,
        color: "bg-blue-100"
    },
    {
        name: "Customer Management",
        tagline: "Track customer details",
        icon: <Users className="text-green-600" size={24} />,
        color: "bg-green-100"
    },
    {
        name: "Payment Tracking",
        tagline: "Monitor payment status",
        icon: <IndianRupee className="text-yellow-600" size={24} />,
        color: "bg-yellow-100"
    },
    {
        name: "WhatsApp Integration",
        tagline: "Send bills via WhatsApp",
        icon: <Smartphone className="text-emerald-600" size={24} />,
        color: "bg-emerald-100"
    },
    {
        name: "Reports & Analytics",
        tagline: "View sales reports",
        icon: <TrendingUp className="text-purple-600" size={24} />,
        color: "bg-purple-100"
    },
];

const ToolCard = ({ tool }) => (
    <div className="bg-gray-50 p-4 rounded-xl transition hover:shadow-lg hover:bg-white border border-transparent hover:border-gray-100 flex items-center space-x-3 cursor-pointer group">
        <div className={`p-2.5 rounded-xl ${tool.color} group-hover:scale-110 transition-transform`}>
            {React.cloneElement(tool.icon, { size: 20 })}
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800 leading-tight">{tool.name}</h3>
            <p className="text-gray-500 text-[11px] leading-tight mt-0.5">{tool.tagline}</p>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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