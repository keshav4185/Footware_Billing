// Essential Mobile Access for Footwear Billing
import React, { useEffect, useState } from 'react';

const MobileBillingMockup = () => {
    return (
        <div className="relative w-full max-w-sm mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white border-[10px] border-gray-900 scale-90 lg:scale-100">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-20"></div>
            
            <div className="p-4 pt-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full mr-3"></div>
                        <span className="text-lg font-semibold">Smart Sales</span>
                    </div>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Logout</button>
                </div>
                
                {/* My Billings Section */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">📄 My Billings</h3>
                    <p className="text-sm text-gray-500">View and manage your billing history</p>
                </div>
                
                {/* Bill Items */}
                <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-blue-600 font-semibold text-sm">INV-621701</p>
                                <p className="font-medium text-sm">Sadanand Rajaram Belote</p>
                                <p className="text-xs text-gray-500">1/19/2026</p>
                            </div>
                            <div className="text-right">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completed</span>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs ml-1">💰 Paid</span>
                                <p className="text-green-600 font-bold mt-1">₹472.00</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">👁 View</button>
                            <button className="bg-green-500 text-white px-3 py-1 rounded text-xs">🖨 Print</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs">🗑 Delete</button>
                        </div>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-blue-600 font-semibold text-sm">INV-275063</p>
                                <p className="font-medium text-sm">Keshav Pralhad Golande</p>
                                <p className="text-xs text-gray-500">1/19/2026</p>
                            </div>
                            <div className="text-right">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completed</span>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs ml-1">💰 Paid</span>
                                <p className="text-green-600 font-bold mt-1">₹2655.00</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">👁 View</button>
                            <button className="bg-green-500 text-white px-3 py-1 rounded text-xs">🖨 Print</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs">🗑 Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Homesection4 = () => {
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
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10">
                
                <div className="lg:w-1/2 w-full flex justify-center lg:justify-start relative z-10 mb-12 lg:mb-0">
                    <MobileBillingMockup />
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-teal-highlight">
                        <span role="img" aria-label="Mobile Icon">📱</span> 
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
                        <a href="#" className="flex items-center bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition shadow-lg">
                            <span className="text-2xl mr-3">🌐</span> 
                            <div><p className="text-sm">Access via</p><p className="font-semibold text-lg">Web Browser</p></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homesection4;