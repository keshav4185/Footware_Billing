import React from 'react';
import {
    FileText,
    Smartphone,
    Printer,
    Send,
    IndianRupee,
    CheckCircle2,
    ArrowRight,
    Play
} from 'lucide-react';
import { Link } from 'react-router-dom';

import BillManagementMockup from '../../Component/Solutions/BillManagementMockup';

const BillingSystem = () => {
    const features = [
        {
            title: "WhatsApp Integrated Invoicing",
            description: "Send professional PDF invoices directly to your customers' WhatsApp with a single click. No more physical printing unless you want to.",
            icon: <Smartphone className="text-green-500" />
        },
        {
            title: "GST Compliant Billing",
            description: "Automatically calculate CGST and SGST with configurable tax rates. Stay 100% compliant with Indian tax regulations.",
            icon: <FileText className="text-blue-500" />
        },
        {
            title: "Hybrid Payment Support",
            description: "Accept split payments (Cash + Digital) and track advance payments with automatic balance calculation.",
            icon: <IndianRupee className="text-indigo-500" />
        },
        {
            title: "High-Speed Printing",
            description: "Optimized thermal and standard printing support. Generate clear, compact bills that shoppers love.",
            icon: <Printer className="text-purple-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D0448]/10 text-[#3D0448] text-[10px] font-black uppercase tracking-widest mb-6">
                                <CheckCircle2 size={12} />
                                <span>Premium Billing Solution</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                                Professional <span className="text-[#3D0448]">Billing</span> Made Simple
                            </h1>
                            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
                                Create GST-compliant invoices, share them via WhatsApp, and manage payments in seconds. Specifically designed for speed and accuracy in footwear retail.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/Signin" className="bg-[#3D0448] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
                                    Get Started Free <ArrowRight size={20} />
                                </Link>
                                <button className="bg-white text-gray-700 border border-gray-200 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                    <Play size={20} /> Watch Demo
                                </button>
                            </div>
                        </div>

                        {/* Mockup Preview */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                            <div className="relative bg-white border border-gray-100 p-4 rounded-[2.5rem] shadow-2xl overflow-hidden">
                                <div className="bg-gray-50 rounded-[1.8rem] p-8 aspect-[4/3] flex flex-col justify-center items-center">
                                    <div className="w-full max-w-xs space-y-4">
                                        <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                            <div className="flex justify-between mb-4">
                                                <div className="text-[10px] font-bold text-gray-400">INVOICE #07931</div>
                                                <div className="text-[10px] font-bold text-green-500">PAID</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-600">Formal Shoe (Black)</span>
                                                    <span className="font-bold">₹1,450</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-gray-600">Tax (18%)</span>
                                                    <span className="font-bold">₹261</span>
                                                </div>
                                                <div className="pt-2 border-t flex justify-between font-black text-indigo-600 ">
                                                    <span>TOTAL</span>
                                                    <span>₹1,711</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-10 bg-green-500 rounded-xl flex-1 flex items-center justify-center text-white"><Send size={16} /></div>
                                            <div className="h-10 bg-indigo-600  rounded-xl flex-1 flex items-center justify-center text-white"><Printer size={16} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">


                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-black text-gray-900 mb-2 whitespace-nowrap">Explore The Interface</h3>
                        <p className="text-gray-500">A live preview of how you manage your daily billings.</p>
                    </div>
                    <BillManagementMockup />
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1000"
                                alt="Billing in action"
                                className="rounded-[3rem] shadow-2xl"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">GST Compliance Without <span className="text-[#3D0448]">The Headache</span></h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="mt-1 text-[#3D0448]"><CheckCircle2 size={24} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">HSN Code Management</h4>
                                        <p className="text-gray-500">Pre-configured HSN codes for different footwear categories to ensure accurate tax filing.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 text-[#3D0448]"><CheckCircle2 size={24} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">State-Wise Tax Rules</h4>
                                        <p className="text-gray-500">Automatic switching between IGST and CGST/SGST based on customer location.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 text-[#3D0448]"><CheckCircle2 size={24} /></div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Downloadable Tax Reports</h4>
                                        <p className="text-gray-500">Export your monthly billing data in tax-ready formats for your accountant.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default BillingSystem;
