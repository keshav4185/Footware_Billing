import React from 'react';
import { FileText, Calendar, Search, IndianRupee, Eye, Printer, Trash2 } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const BillManagementMockup = () => {
    return (
        <div className="w-full max-w-5xl p-6 md:p-10 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 mx-auto relative overflow-hidden">
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>

            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/10 rounded-xl">
                        <FileText className="text-blue-600" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">My Billings</h3>
                        <p className="text-sm text-gray-500 font-medium tracking-wide">View and manage your billing history</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    {/* Date Input Mockup */}
                    <div className="relative w-full sm:w-56 group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <div className="w-full pl-12 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-400 flex items-center justify-between hover:border-gray-300 transition-all">
                            <span>dd/mm/yyyy</span>
                            <Calendar size={14} className="text-gray-400" />
                        </div>
                    </div>

                    {/* Search Input Mockup */}
                    <div className="relative w-full sm:w-72 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <div className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-400 flex items-center hover:border-gray-300 transition-all">
                            Search bills...
                        </div>
                    </div>
                </div>
            </div>

            {/* Table wrapper */}
            <div className="overflow-x-auto relative z-10 rounded-xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="text-left py-5 px-4 font-bold text-gray-600 text-[13px] uppercase tracking-wider whitespace-nowrap">Invoice No.</th>
                            <th className="text-left py-5 px-4 font-bold text-gray-600 text-[13px] uppercase tracking-wider">Customer</th>
                            <th className="text-left py-5 px-4 font-bold text-gray-600 text-[13px] uppercase tracking-wider">Date</th>
                            <th className="text-left py-5 px-4 font-bold text-gray-600 text-[13px] uppercase tracking-wider">Amount</th>
                            <th className="text-left py-5 px-4 font-bold text-gray-600 text-[13px] uppercase tracking-wider">Status</th>
                            <th className="text-left py-5 px-4 font-bold text-gray-600 text-[13px] uppercase tracking-wider">Payment</th>
                            <th className="text-center py-5 px-4 font-bold text-gray-600 text-[13px] uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {[
                            { id: "INV-079381", name: "Keshav Pralhad Golande", date: "01/04/2026", amount: 177.00 },
                            { id: "INV-693152", name: "Keshav Pralhad Golande", date: "31/03/2026", amount: 112.10 },
                            { id: "INV-574063", name: "Keshav Pralhad Golande", date: "31/03/2026", amount: 112.10 }
                        ].map((row, idx) => (
                            <tr key={idx} className="group hover:bg-indigo-50 transition-colors">
                                <td className="py-6 px-4 whitespace-nowrap">
                                    <span className="text-blue-600 font-bold tracking-tight hover:underline cursor-pointer">{row.id}</span>
                                </td>
                                <td className="py-6 px-4 text-gray-700 font-medium">{row.name}</td>
                                <td className="py-6 px-4 text-gray-500 font-medium">{row.date}</td>
                                <td className="py-6 px-4 text-emerald-600 font-bold">₹{row.amount.toFixed(2)}</td>
                                <td className="py-6 px-4">
                                    <span className="px-3 py-1.5 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-tight">Completed</span>
                                </td>
                                <td className="py-6 px-4">
                                    <span className="px-3 py-1.5 text-[11px] font-bold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center gap-1.5 uppercase tracking-tight">
                                        <div className="w-3.5 h-3.5 rounded-full border border-emerald-500 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                        </div>
                                        Paid
                                    </span>
                                </td>
                                <td className="py-6 px-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95">
                                            <Eye size={20} />
                                        </button>
                                        <button className="p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-sm hover:shadow-md active:scale-95">
                                            <Printer size={20} />
                                        </button>
                                        <button className="p-2.5 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all shadow-sm hover:shadow-md active:scale-95">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Homesection6 = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <ScrollReveal animation="fadeInDown">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent mb-4">
                        Bill Management Dashboard
                    </h2>
                </ScrollReveal>

                <ScrollReveal animation="fadeIn" delay={200}>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                        Track all your invoices, manage payments, and monitor billing history in one place.
                    </p>
                </ScrollReveal>

                <ScrollReveal animation="fadeInUp" delay={400}>
                    <BillManagementMockup />
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Homesection6;