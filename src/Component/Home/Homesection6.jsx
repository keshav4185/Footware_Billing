// Essential Bill Management for Footwear Billing
import React, { useEffect, useState } from 'react';

const BillManagementMockup = () => {
    return (
        <div className="w-full max-w-5xl p-4 md:p-6 bg-white rounded-xl shadow-2xl border border-gray-100 mx-auto">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-6 border-b">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">📄 My Billings</h3>
                    <p className="text-sm text-gray-500">View and manage your billing history</p>
                </div>
                <div className="flex space-x-2 mt-3 sm:mt-0">
                    <div className="flex items-center border rounded px-3 py-2">
                        <span className="text-blue-500 mr-2">📅</span>
                        <span className="text-sm text-gray-500">mm/dd/yyyy</span>
                    </div>
                    <div className="flex items-center border rounded px-3 py-2">
                        <span className="text-blue-500 mr-2">🔍</span>
                        <span className="text-sm text-gray-500">Search bills...</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto"> 
                <table className="min-w-full divide-y divide-gray-200 text-sm"> 
                    <thead>
                        <tr className="text-left text-gray-600 font-semibold">
                            <th className="py-3 px-2">Invoice No.</th>
                            <th className="py-3 px-2">Customer</th>
                            <th className="py-3 px-2">Date</th>
                            <th className="py-3 px-2">Amount</th>
                            <th className="py-3 px-2">Status</th>
                            <th className="py-3 px-2">Payment</th>
                            <th className="py-3 px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="py-4 px-2 text-blue-600 font-semibold">INV-539305</td>
                            <td className="py-4 px-2 font-medium">JAYSHRI BHISE</td>
                            <td className="py-4 px-2">1/19/2026</td>
                            <td className="py-4 px-2 text-green-600 font-bold">₹548700.00</td>
                            <td className="py-4 px-2">
                                <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">Completed</span>
                            </td>
                            <td className="py-4 px-2">
                                <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">💰 Paid</span>
                            </td>
                            <td className="py-4 px-2">
                                <div className="flex space-x-1">
                                    <button className="px-2 py-1 bg-blue-500 text-white rounded text-xs">👁 View</button>
                                    <button className="px-2 py-1 bg-green-500 text-white rounded text-xs">🖨 Print</button>
                                    <button className="px-2 py-1 bg-red-500 text-white rounded text-xs">🗑 Delete</button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-4 px-2 text-blue-600 font-semibold">INV-275063</td>
                            <td className="py-4 px-2 font-medium">Keshav Pralhad Golande</td>
                            <td className="py-4 px-2">1/19/2026</td>
                            <td className="py-4 px-2 text-green-600 font-bold">₹2655.00</td>
                            <td className="py-4 px-2">
                                <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">Completed</span>
                            </td>
                            <td className="py-4 px-2">
                                <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">💰 Paid</span>
                            </td>
                            <td className="py-4 px-2">
                                <div className="flex space-x-1">
                                    <button className="px-2 py-1 bg-blue-500 text-white rounded text-xs">👁 View</button>
                                    <button className="px-2 py-1 bg-green-500 text-white rounded text-xs">🖨 Print</button>
                                    <button className="px-2 py-1 bg-red-500 text-white rounded text-xs">🗑 Delete</button>
                                </div>
                            </td>
                        </tr>
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
                
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent mb-4">
                    Bill Management Dashboard
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    Track all your invoices, manage payments, and monitor billing history in one place.
                </p>

                <BillManagementMockup />

            </div>
        </section>
    );
};

export default Homesection6;