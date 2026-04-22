import React from 'react';
import { BarChart3, Users, IndianRupee, Smartphone, TrendingUp } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';

const businessTools = [
    {
        name: "Billing Dashboard",
        tagline: "Create and manage invoices",
        icon: <BarChart3 className="text-[#3D0448]" size={24} />,
        color: "bg-[#3D0448]/10"
    },
    {
        name: "Customer Management",
        tagline: "Track customer details",
        icon: <Users className="text-[#B564C3]" size={24} />,
        color: "bg-[#B564C3]/10"
    },
    {
        name: "Payment Tracking",
        tagline: "Monitor payment status",
        icon: <IndianRupee className="text-[#3D0448]" size={24} />,
        color: "bg-[#3D0448]/10"
    },
    {
        name: "WhatsApp Integration",
        tagline: "Send bills via WhatsApp",
        icon: <Smartphone className="text-[#B564C3]" size={24} />,
        color: "bg-[#B564C3]/10"
    },
    {
        name: "Reports & Analytics",
        tagline: "View sales reports",
        icon: <TrendingUp className="text-[#3D0448]" size={24} />,
        color: "bg-[#3D0448]/10"
    },
];

const ToolCard = ({ tool }) => (
    <TiltCard maxTilt={10} scale={1.02}>
        <div className="bg-gray-50 p-4 rounded-xl transition hover:shadow-lg hover:bg-white border border-transparent hover:border-gray-100 flex items-center space-x-3 cursor-pointer group h-full">
            <div className={`p-2.5 rounded-xl ${tool.color} group-hover:scale-110 transition-transform`}>
                {React.cloneElement(tool.icon, { size: 20 })}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 leading-tight">{tool.name}</h3>
                <p className="text-gray-500 text-[11px] leading-tight mt-0.5">{tool.tagline}</p>
            </div>
        </div>
    </TiltCard>
);

const Homesection8 = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden perspective-1000">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-left relative z-10">

                <ScrollReveal animation="fadeInDown">
                    <h2 className="text-4xl md:text-4xl font-headline bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent leading-tight mb-4 font-extrabold">
                        One <span className="highlight-bg pb-1 inline-block">solution</span>, complete <span className="highlight-bg pb-1 inline-block">billing</span>.
                    </h2>
                </ScrollReveal>

                <ScrollReveal animation="fadeIn" delay={200}>
                    <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-12">
                        Everything you need for footwear business billing.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {businessTools.map((tool, index) => (
                        <ScrollReveal key={index} animation="fadeInUp" delay={index * 100}>
                            <ToolCard tool={tool} />
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal animation="fadeIn" delay={700} className="mt-12">
                    <a href="/Dashboard" className="text-[#B564C3] text-lg font-semibold hover:underline flex items-center">
                        Get started now
                        <span className="ml-2 text-xl">→</span>
                    </a>
                </ScrollReveal>

            </div>
        </section>
    );
};

export default Homesection8;