import React from 'react';
import { 
    BarChart3, 
    PieChart, 
    TrendingUp, 
    DownloadCloud, 
    CheckCircle2, 
    ArrowRight,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

import ReportsMockup from '../../Component/Solutions/ReportsMockup';

const SalesReports = () => {
    const features = [
        {
            title: "Daily Sales Summaries",
            description: "Get a clear picture of your store's performance every single day. Track revenue, bill counts, and average order value.",
            icon: <BarChart3 className="text-blue-500" />
        },
        {
            title: "Tax-Ready Reporting",
            description: "Generate CGST and SGST reports for tax filing with a single click. Save hours of manual accounting work.",
            icon: <TrendingUp className="text-green-500" />
        },
        {
            title: "Customer Insights",
            description: "Identify your most loyal customers and tracking their buying patterns to run targeted promotions.",
            icon: <PieChart className="text-purple-500" />
        },
        {
            title: "One-Click Export",
            description: "Export all your billing and tax data in CSV or Excel format for easy sharing with your accountant.",
            icon: <DownloadCloud className="text-indigo-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
                                <BarChart3 size={12} />
                                <span>Real-time Analytics</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                                Turn Data Into <span className="text-blue-600">Decision Power</span>
                            </h1>
                            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
                                Advanced sales reports and analytics designed to help footwear store owners grow their business with confidence.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/Signin" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                                    View Live Reports <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                        
                        {/* Interactive Analytics Mockup */}
                        <div className="relative group">
                            <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-2xl relative z-10">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="font-black text-gray-900">Revenue Overview</div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-xl">
                                        <Calendar size={14}/> This Month
                                    </div>
                                </div>
                                <div className="flex items-end justify-between h-48 gap-4 px-4 overflow-hidden rounded-2xl bg-gray-50/50 p-6">
                                    {[60, 40, 85, 50, 95, 70, 80].map((h, i) => (
                                        <div key={i} className="flex-1 bg-blue-500 rounded-t-lg transition-all duration-1000 group-hover:bg-indigo-600 origin-bottom" style={{height: `${h}%`, transitionDelay: `${i * 100}ms`}}></div>
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-between items-center">
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Sales</div>
                                        <div className="text-2xl font-black text-gray-900">₹4,85,240</div>
                                    </div>
                                    <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-xl font-black text-[10px] flex items-center gap-1">
                                        <ArrowUpRight size={14}/> +12.5%
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-blue-400 blur-[80px] opacity-10 pointer-events-none rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Insights That Matter</h2>
                        <p className="text-gray-500 text-lg">Detailed reports covering every aspect of your operations.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                    {React.cloneElement(feature.icon, { size: 24 })}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-black text-gray-900 mb-2 whitespace-nowrap">Explore The Analytics</h3>
                        <p className="text-gray-500">A live preview of how you analyze your store's growth.</p>
                    </div>
                    <ReportsMockup />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <img 
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
                                alt="Analytics dashboard" 
                                className="rounded-[3rem] shadow-2xl"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">Tax Reporting <br/><span className="text-blue-600">Made Instant</span></h2>
                            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                                No more manual spreadsheets. Our system automatically aggregates your CGST and SGST data, providing you with a complete tax liability summary whenever you need it.
                            </p>
                            <div className="space-y-4">
                                {['Automated GST summaries', 'Detailed purchase & sales history', 'Exportable Excel reports'].map((text, i) => (
                                    <div key={i} className="flex gap-4 items-center font-bold text-gray-800">
                                        <div className="text-blue-600"><CheckCircle2 size={24}/></div>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-blue-600 text-center relative overflow-hidden mx-6 rounded-[3rem] mb-24 shadow-2xl shadow-blue-200">
                <div className="relative z-10 px-6 text-white">
                    <h2 className="text-3xl md:text-5xl font-black mb-8">Better Data. <br/>Better Decisions.</h2>
                    <Link to="/Signin" className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl inline-block">
                        Build Your Reports
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default SalesReports;
