import React from 'react';
import { Send, Printer, Save, Eye, Calculator, FileCheck } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const PaymentCard = () => {
    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden mx-auto transition-all duration-300">
            {/* Header */}
            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-indigo-600/10 rounded-lg">
                    <Calculator className="text-indigo-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 tracking-tight">Bill Summary</h3>
            </div>

            <div className="p-6 space-y-6">
                {/* Regular Fields */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm md:text-base">
                        <span className="text-gray-500 font-medium tracking-wide">Untaxed Amount:</span>
                        <span className="text-gray-900 font-bold">₹ 1500.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base pt-2 border-t border-gray-50">
                        <span className="text-gray-500 font-medium tracking-wide">Discount Amount:</span>
                        <span className="text-gray-900 font-bold">₹ 15.00</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-600" />
                            <span className="text-sm md:text-base text-gray-500 font-medium">CGST:</span>
                            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-1 bg-white">
                                <span className="text-sm font-bold text-gray-700 mr-2">9</span>
                                <span className="text-xs text-gray-400 font-bold">%</span>
                            </div>
                        </div>
                        <span className="text-sm md:text-base text-gray-900 font-bold">₹ 133.65</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-600" />
                            <span className="text-sm md:text-base text-gray-500 font-medium">SGST:</span>
                            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-1 bg-white">
                                <span className="text-sm font-bold text-gray-700 mr-2">9</span>
                                <span className="text-xs text-gray-400 font-bold">%</span>
                            </div>
                        </div>
                        <span className="text-sm md:text-base text-gray-900 font-bold">₹ 133.65</span>
                    </div>
                </div>

                {/* Total Amount (Brand Indigo) */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 flex justify-between items-center shadow-sm">
                    <span className="text-indigo-700 font-black text-base tracking-wider uppercase">Total Amount:</span>
                    <span className="text-indigo-700 font-black text-xl">₹ 1752.30</span>
                </div>

                {/* Paid Amount (Emerald) */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 flex justify-between items-center shadow-sm">
                    <span className="text-emerald-700 font-black text-base tracking-wider uppercase">Paid Amount:</span>
                    <div className="flex items-center gap-4">
                        <div className="bg-white border border-emerald-200 rounded-lg px-8 py-2.5 shadow-sm">
                            <span className="text-lg font-black text-gray-700">0</span>
                        </div>
                        <span className="text-emerald-600 font-black text-xl">₹</span>
                    </div>
                </div>

                {/* Balance Amount (Orange) */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 flex justify-between items-center shadow-sm">
                    <span className="text-orange-700 font-black text-base tracking-wider uppercase">Balance Amount:</span>
                    <span className="text-orange-700 font-black text-xl">₹ 1752.30</span>
                </div>

                {/* Status + Generate Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-6">
                    <span className="px-8 py-2.5 bg-rose-500 text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-lg shadow-rose-200">Unpaid</span>
                    <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-3.5 rounded-xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-100 active:scale-95 text-sm uppercase tracking-widest">
                        <FileCheck size={18} />
                        Generate Bill
                    </button>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-center gap-4 pt-4">
                    <button className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-black flex items-center gap-3 transition-all shadow-lg shadow-indigo-100 active:scale-95 text-xs uppercase tracking-[0.2em]">
                        <Send size={16} className="rotate-[330deg]" /> Send
                    </button>
                    <button className="px-10 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black flex items-center gap-3 transition-all shadow-lg shadow-emerald-100 active:scale-95 text-xs uppercase tracking-[0.2em]">
                        <Printer size={16} /> Print
                    </button>
                </div>

                {/* Watermark Checkbox */}
                <div className="flex items-center gap-3 pt-6 justify-start">
                    <input type="checkbox" id="watermark" className="w-5 h-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-600 cursor-pointer" />
                    <label htmlFor="watermark" className="text-xs text-gray-400 font-black cursor-pointer hover:text-gray-600 transition-colors tracking-[0.1em] uppercase">
                        Show Company Watermark
                    </label>
                </div>
            </div>
        </div>
    );
};

const Homesection5 = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <ScrollReveal animation="fadeInDown">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent mb-4">
                            Payment Management
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal animation="fadeIn" delay={200}>
                        <p className="text-lg text-gray-600">Simple payment tracking and invoice management</p>
                    </ScrollReveal>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                    <ScrollReveal animation="slideInLeft" className="w-full lg:w-auto">
                        <PaymentCard />
                    </ScrollReveal>

                    <ScrollReveal animation="slideInRight" className="lg:max-w-md text-center lg:text-left">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Complete Payment Solution</h3>

                        <div className="space-y-4 text-sm text-gray-600">
                            {[
                                { color: 'blue', title: 'Total Amount Calculation', desc: 'Automatically calculate total invoice amount with taxes' },
                                { color: 'green', title: 'Advance Payment Tracking', desc: 'Record and manage advance payments from customers' },
                                { color: 'orange', title: 'Balance Management', desc: 'Track remaining balance after advance payments' },
                                { color: 'red', title: 'Payment Status', desc: 'Monitor payment status: Paid, Unpaid, Partial' },
                                { color: 'purple', title: 'Professional Branding', desc: 'Add company watermark to invoices' },
                                { color: 'indigo', title: 'Multiple Actions', desc: 'Send, Print, Save, and Preview invoices instantly' }
                            ].map((item, i) => (
                                <ScrollReveal key={i} animation="fadeInUp" delay={200 + (i * 100)} className="flex items-start">
                                    <span className={`text-[#3D0448] mr-2 font-bold`}>•</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.title}</p>
                                        <p>{item.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Homesection5;