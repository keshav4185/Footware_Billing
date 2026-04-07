import React, { useEffect, useState } from 'react';
import { Send, Printer, Save, Eye, Calculator, FileCheck } from 'lucide-react';

const PaymentCard = () => {
    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden mx-auto transition-all duration-300">
            {/* Header */}
            <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                <div className="p-2 bg-green-100/50 rounded-lg">
                    <Calculator className="text-green-600" size={20} />
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
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
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
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500" />
                            <span className="text-sm md:text-base text-gray-500 font-medium">SGST:</span>
                            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-1 bg-white">
                                <span className="text-sm font-bold text-gray-700 mr-2">9</span>
                                <span className="text-xs text-gray-400 font-bold">%</span>
                            </div>
                        </div>
                        <span className="text-sm md:text-base text-gray-900 font-bold">₹ 133.65</span>
                    </div>
                </div>

                {/* Total Amount (Blue) */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex justify-between items-center shadow-sm">
                    <span className="text-blue-700 font-black text-base tracking-wider uppercase">Total Amount:</span>
                    <span className="text-blue-700 font-black text-xl">₹ 1752.30</span>
                </div>

                {/* Paid Amount (Green) */}
                <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex justify-between items-center shadow-sm">
                    <span className="text-green-700 font-black text-base tracking-wider uppercase">Paid Amount:</span>
                    <div className="flex items-center gap-4">
                        <div className="bg-white border border-green-200 rounded-lg px-8 py-2.5 shadow-sm">
                            <span className="text-lg font-black text-gray-700">0</span>
                        </div>
                        <span className="text-green-600 font-black text-xl">₹</span>
                    </div>
                </div>

                {/* Balance Amount (Orange) */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 flex justify-between items-center shadow-sm">
                    <span className="text-orange-700 font-black text-base tracking-wider uppercase">Balance Amount:</span>
                    <span className="text-orange-700 font-black text-xl">₹ 1752.30</span>
                </div>

                {/* Status + Generate Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-6">
                    <span className="px-8 py-2.5 bg-red-500 text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-lg shadow-red-200">Unpaid</span>
                    <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-100 active:scale-95 text-sm uppercase tracking-widest">
                        <FileCheck size={18} />
                        Generate Bill
                    </button>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-center gap-4 pt-4">
                    <button className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black flex items-center gap-3 transition-all shadow-lg shadow-blue-100 active:scale-95 text-xs uppercase tracking-[0.2em]">
                        <Send size={16} className="rotate-[330deg]" /> Send
                    </button>
                    <button className="px-10 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-black flex items-center gap-3 transition-all shadow-lg shadow-green-100 active:scale-95 text-xs uppercase tracking-[0.2em]">
                        <Printer size={16} /> Print
                    </button>
                </div>

                {/* Watermark Checkbox */}
                <div className="flex items-center gap-3 pt-6 justify-start">
                    <input type="checkbox" id="watermark" className="w-5 h-5 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer" />
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
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent mb-4">
                        Payment Management
                    </h2>
                    <p className="text-lg text-gray-600">Simple payment tracking and invoice management</p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                    <div className="w-full lg:w-auto">
                        <PaymentCard />
                    </div>

                    <div className="lg:max-w-md text-center lg:text-left">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Complete Payment Solution</h3>

                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <div>
                                    <p className="font-semibold text-gray-800">Total Amount Calculation</p>
                                    <p>Automatically calculate total invoice amount with taxes</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <div>
                                    <p className="font-semibold text-gray-800">Advance Payment Tracking</p>
                                    <p>Record and manage advance payments from customers</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                <div>
                                    <p className="font-semibold text-gray-800">Balance Management</p>
                                    <p>Track remaining balance after advance payments</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                <div>
                                    <p className="font-semibold text-gray-800">Payment Status</p>
                                    <p>Monitor payment status: Paid, Unpaid, Partial</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                <div>
                                    <p className="font-semibold text-gray-800">Professional Branding</p>
                                    <p>Add company watermark to invoices</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <span className="text-indigo-500 mr-2">•</span>
                                <div>
                                    <p className="font-semibold text-gray-800">Multiple Actions</p>
                                    <p>Send, Print, Save, and Preview invoices instantly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homesection5;