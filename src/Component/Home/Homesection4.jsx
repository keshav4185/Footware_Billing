import React, { useEffect, useState } from 'react';
import ScrollReveal from '../ScrollReveal';
import TiltCard from '../TiltCard';
import { FileText, Eye, Printer, Trash2, Smartphone, Globe } from 'lucide-react';

const MobileBillingMockup = () => {
    return (
        <div className="relative w-full max-w-[320px] mx-auto shadow-2xl rounded-[2.5rem] overflow-hidden bg-white border-[8px] border-gray-900 scale-90 lg:scale-100 transition-all duration-500 hover:shadow-blue-200/50">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-20"></div>

            <div className="p-5 pt-10 h-[580px] overflow-y-auto no-scrollbar">
                {/* Header Context */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#3D0448]/10 rounded-lg">
                            <FileText className="text-[#3D0448]" size={20} />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 tracking-tight text-left">My Billings</h3>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none text-left">View and manage history</p>
                </div>

                {/* Bill Items */}
                <div className="space-y-4">
                    {[
                        { id: "INV-451143", name: "Pranjal Rohankar", date: "07/04/2026", amount: "5310.00" },
                        { id: "INV-079381", name: "Keshav Pralhad Golande", date: "01/04/2026", amount: "177.00" },
                        { id: "INV-693152", name: "Keshav Pralhad Golande", date: "31/03/2026", amount: "112.10" },
                        { id: "INV-574063", name: "Pranjal Rohankar", date: "31/03/2026", amount: "112.10" }
                    ].map((bill, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow bg-gray-50/30">
                            <div className="flex justify-between items-start mb-3">
                                <div className="space-y-1 text-left">
                                    <p className="text-[#3D0448] font-black text-xs tracking-tight">{bill.id}</p>
                                    <p className="font-bold text-gray-800 text-xs truncate max-w-[120px]">{bill.name}</p>
                                    <p className="text-[10px] text-gray-500 font-black">{bill.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-emerald-600 font-black text-sm mb-1">₹{bill.amount}</p>
                                    <div className="flex flex-col gap-1 items-end">
                                        <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border border-emerald-100">Completed</span>
                                        <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1 border border-emerald-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Paid
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2 border-t border-gray-100">
                                <button className="flex-1 bg-blue-600 text-white p-2 rounded-lg hover:opacity-90 transition-all active:scale-95 flex items-center justify-center">
                                    <Eye size={14} />
                                </button>
                                <button className="flex-1 bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center">
                                    <Printer size={14} />
                                </button>
                                <button className="flex-1 bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-600 transition-all active:scale-95 flex items-center justify-center">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-200 rounded-full opacity-50"></div>
        </div>
    );
};

const Homesection4 = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden perspective-1000">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center lg:gap-x-12 relative z-10">

                <ScrollReveal animation="slideInLeft" className="lg:w-1/2 w-full flex justify-center lg:justify-end relative z-10 mb-8 lg:mb-0">
                    <TiltCard maxTilt={15} perspective={1500}>
                        <MobileBillingMockup />
                    </TiltCard>
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-[#B564C3] bg-white p-3 rounded-full shadow-lg z-20">
                        <Smartphone size={40} />
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="slideInRight" className="lg:w-1/2 w-full lg:text-left text-center">
                    <h2 className="text-4xl font-headline leading-tight mb-6 bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent font-extrabold">
                        Access your bills <span className="highlight-bg pb-1 inline-block">anywhere</span>
                    </h2>

                    <p className="text-xl text-gray-700 mb-10">
                        Use any device to create invoices, track payments, and manage your footwear business billing. Works on mobile, tablet, and desktop.
                    </p>

                    <div className="flex justify-center lg:justify-start space-x-4">
                        <a href="/Account" className="flex items-center bg-gradient-to-r from-[#B564C3] to-[#3D0448] text-white p-4 rounded-xl hover:opacity-90 transition shadow-lg gap-3">
                            <Globe size={32} />
                            <div><p className="text-sm">Access via</p><p className="font-semibold text-lg">Web Browser</p></div>
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Homesection4;