// src/Component/Home/Homesection9.jsx
import React, { useEffect, useState } from 'react';

const apps = [
    {
        name: "Sales",
        tagline: "Invoice from sales orders",
        icon: "📈", // Simplified icon representation
        color: "bg-orange-400"
    },
    {
        name: "Subscriptions",
        tagline: "Manage recurring invoices",
        icon: "🔄",
        color: "bg-teal-highlight" // Uses custom teal color
    },
    {
        name: "Project",
        tagline: "Set invoicing policies",
        icon: "✅",
        color: "bg-green-400"
    },
    {
        name: "eCommerce",
        tagline: "Access invoices online",
        icon: "🛍️",
        color: "bg-purple-main" // Uses custom purple color
    },
    {
        name: "Point of Sale",
        tagline: "Print invoices in-store",
        icon: "💳",
        color: "bg-red-400"
    },
];

const AppCard = ({ app }) => (
    <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-lg flex items-center space-x-4 cursor-pointer">
        <div className={`p-3 rounded-xl bg-opacity-20 ${app.color} text-4xl`}>
            {/* Icon Placeholder */}
            {app.icon}
        </div>
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{app.name}</h3>
            <p className="text-gray-600 text-sm">{app.tagline}</p>
        </div>
    </div>
);

const Homesection9 = () => {
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
            {/* Professional Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - App Integration Interfaces */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                >
                    {/* Sales Integration */}
                    <div className="absolute top-20 left-16 w-64 h-44 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#8BC34A]/30 p-4 transform rotate-6">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Sales Integration</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Orders → Invoices</span>
                                <span className="text-[#8BC34A] font-bold">Auto</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Customer Sync</span>
                                <span className="text-[#2E4F7A] font-bold">Real-time</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Product Catalog</span>
                                <span className="text-[#4A90E2] font-bold">Linked</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#8BC34A] font-bold">📈 Sales Module Active</div>
                        </div>
                    </div>
                    
                    {/* eCommerce Integration */}
                    <div className="absolute bottom-24 right-16 w-72 h-40 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#2E4F7A]/30 p-4 transform -rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">eCommerce Integration</div>
                        <div className="space-y-2">
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>Shopify Connected</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>WooCommerce Synced</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                <span>Magento Setup Pending</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#2E4F7A] font-bold">🛍️ Online Store Ready</div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Subscription & Project Management */}
                <div 
                    className="absolute inset-0 opacity-12 transition-transform duration-700 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                    }}
                >
                    {/* Subscription Management */}
                    <div className="absolute top-1/3 left-1/4 w-56 h-36 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#8BC34A]/35 p-3 transform rotate-12">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Subscriptions</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>Monthly Plans</span>
                                <span className="text-[#8BC34A] font-bold">25 Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Annual Plans</span>
                                <span className="text-[#2E4F7A] font-bold">12 Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Custom Plans</span>
                                <span className="text-[#4A90E2] font-bold">5 Active</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-[#8BC34A] font-bold">🔄 Auto Renewal</div>
                        </div>
                    </div>
                    
                    {/* Project Billing */}
                    <div className="absolute bottom-1/3 right-1/4 w-48 h-32 bg-white/85 backdrop-blur-sm rounded-xl shadow-xl border border-[#2E4F7A]/35 p-3 transform -rotate-6">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-2">Project Billing</div>
                        <div className="space-y-2">
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#8BC34A] rounded mr-2"></div>
                                <span>Time Tracking: On</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#2E4F7A] rounded mr-2"></div>
                                <span>Milestone Billing</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#4A90E2] rounded mr-2"></div>
                                <span>Expense Tracking</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t">
                            <div className="text-xs text-[#2E4F7A] font-bold">✅ Projects Active</div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 3 - App Integration Icons */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`
                    }}
                >
                    {/* App Icons */}
                    <div className="absolute top-1/4 right-1/3 text-3xl text-[#8BC34A] opacity-10 animate-bounce">📈</div>
                    <div className="absolute top-2/3 left-1/6 text-2xl text-[#2E4F7A] opacity-8 animate-bounce" style={{animationDelay: '1s'}}>🔄</div>
                    <div className="absolute bottom-1/4 right-1/5 text-2xl text-[#4A90E2] opacity-10 animate-bounce" style={{animationDelay: '2s'}}>✅</div>
                    <div className="absolute top-1/2 left-1/8 text-2xl text-[#8BC34A] opacity-8 animate-bounce" style={{animationDelay: '0.5s'}}>🛍️</div>
                    <div className="absolute top-1/6 right-1/6 text-xl text-[#2E4F7A] opacity-6 animate-bounce" style={{animationDelay: '1.5s'}}>💳</div>
                    
                    {/* Integration Lines */}
                    <div className="absolute top-1/6 left-1/3 w-6 h-6 border-2 border-[#8BC34A] opacity-6 rounded animate-spin" style={{animationDuration: '20s'}}></div>
                    <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-[#2E4F7A] opacity-8 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-1/2 w-8 h-1 bg-[#4A90E2] opacity-6 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Layer 4 - App Connection Network */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out"
                    style={{
                        transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.06}}>
                        <defs>
                            <linearGradient id="appFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8BC34A" />
                                <stop offset="50%" stopColor="#2E4F7A" />
                                <stop offset="100%" stopColor="#4A90E2" />
                            </linearGradient>
                        </defs>
                        <path d="M250,200 Q550,140 850,300 T1150,180" stroke="url(#appFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M200,380 Q500,280 800,420 T1100,300" stroke="url(#appFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                        <path d="M150,520 Q450,420 750,560 T1050,460" stroke="url(#appFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                    </svg>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-left relative z-10">
                
                {/* Headline: "One need, one app. Expand as you grow." */}
                <h2 className="text-4xl md:text-4xl font-headline bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent leading-tight mb-4 elc font-extrabold">
                    One <span className="highlight-bg pb-1 inline-block">need</span>, one <span className="highlight-bg pb-1 inline-block">app</span>.
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-12">
                    Expand as you grow.
                </p>

                {/* Apps Grid (Responsive: 1 col on mobile, 2 on sm, 3 on lg) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                    {apps.map((app, index) => (
                        <AppCard key={index} app={app} />
                    ))}
                </div>

                {/* See All Apps CTA */}
                <div className="mt-12">
                    <a href="/trypage" className="text-purple-main text-lg font-semibold hover:underline flex items-center">
                        See all Apps 
                        <span className="ml-2 text-xl">→</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Homesection9;