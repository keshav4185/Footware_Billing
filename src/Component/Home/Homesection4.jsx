import React, { useEffect, useState } from 'react';
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
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <FileText className="text-blue-600" size={20} />
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
                                    <p className="text-blue-600 font-black text-xs tracking-tight">{bill.id}</p>
                                    <p className="font-bold text-gray-800 text-xs truncate max-w-[120px]">{bill.name}</p>
                                    <p className="text-[10px] text-gray-500 font-black">{bill.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-600 font-black text-sm mb-1">₹{bill.amount}</p>
                                    <div className="flex flex-col gap-1 items-end">
                                        <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border border-green-100">Completed</span>
                                        <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1 border border-green-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Paid
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2 border-t border-gray-100">
                                <button className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center">
                                    <Eye size={14} />
                                </button>
                                <button className="flex-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center">
                                    <Printer size={14} />
                                </button>
                                <button className="flex-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center">
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
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10">

                <div className="lg:w-1/2 w-full flex justify-center lg:justify-start relative z-10 mb-12 lg:mb-0">
                    <MobileBillingMockup />
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-teal-highlight bg-white p-3 rounded-full shadow-lg">
                        <Smartphone size={40} />
                    </div>
                </div>

                <div className="lg:w-1/2 w-full lg:pl-16 lg:text-left text-center">
                    <h2 className="text-4xl font-headline leading-tight mb-6 bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent font-extrabold">
                        Access your bills <span className="highlight-bg pb-1 inline-block">anywhere</span>
                    </h2>

                    <p className="text-xl text-gray-700 mb-10">
                        Use any device to create invoices, track payments, and manage your footwear business billing. Works on mobile, tablet, and desktop.
                    </p>

                    <div className="flex justify-center lg:justify-start space-x-4">
                        <a href="#" className="flex items-center bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition shadow-lg gap-3">
                            <Globe size={32} />
                            <div><p className="text-sm">Access via</p><p className="font-semibold text-lg">Web Browser</p></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homesection4;