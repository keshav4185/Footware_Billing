// Essential Payment Features for Footwear Billing
import React, { useEffect, useState } from 'react';

const PaymentCard = () => {
    return (
        <div className="w-full max-w-xs p-4 bg-white rounded-xl shadow-lg border border-gray-100 mx-auto">
            
            {/* Total Amount */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <p className="text-xs font-semibold text-blue-800 mb-1">Total Amount:</p>
                <p className="text-base font-bold text-blue-900">₹ 0.00</p>
            </div>

            {/* Advance Amount */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                <p className="text-xs font-semibold text-green-800 mb-2">Advance Amount:</p>
                <div className="flex items-center">
                    <div className="w-16 p-1 border border-green-300 rounded mr-2 text-center text-sm bg-white">0</div>
                    <span className="text-green-800 font-semibold">₹</span>
                </div>
            </div>

            {/* Balance Amount */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
                <p className="text-xs font-semibold text-orange-800 mb-1">Balance Amount:</p>
                <p className="text-base font-bold text-orange-900">₹ 0.00</p>
            </div>

            {/* Payment Status */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <p className="text-xs font-semibold text-gray-800 mb-2">Payment Status:</p>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">Unpaid</span>
            </div>

            {/* Watermark Option */}
            <div className="mb-4">
                <div className="flex items-center text-xs text-gray-600">
                    <div className="w-3 h-3 border border-gray-400 rounded mr-2"></div>
                    Show Company Watermark
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                    <div className="py-2 px-2 bg-blue-500 text-white rounded text-xs font-semibold text-center">
                        📤 Send
                    </div>
                    <div className="py-2 px-2 bg-green-500 text-white rounded text-xs font-semibold text-center">
                        🖨 Print
                    </div>
                    <div className="py-2 px-2 bg-purple-500 text-white rounded text-xs font-semibold text-center">
                        💾 Save
                    </div>
                </div>
                <div className="w-full py-2 bg-orange-500 text-white rounded text-sm font-semibold text-center">
                    👁 Preview
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