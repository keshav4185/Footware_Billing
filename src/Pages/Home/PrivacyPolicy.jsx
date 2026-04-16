import React from 'react';
import { Shield, Lock, Eye, Database, ChevronRight, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white font-inter relative overflow-hidden pb-32">
            
            {/* Elegant Background Accents */}
            <div className="absolute top-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-50 rounded-full blur-[100px] opacity-70"></div>
                <div className="absolute top-[20%] -left-40 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-70"></div>
            </div>

            {/* Header */}
            <div className="pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 text-green-700 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-sm"
                        style={{ animation: 'fadeIn 0.8s ease-out forwards' }}
                    >
                        <Shield size={16} /> Legal Documentation
                    </div>
                    <h1 
                        className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter"
                        style={{ opacity: 0, animation: 'slideInUp 0.8s ease-out forwards 0.1s' }}
                    >
                        Privacy Policy
                    </h1>
                    <p 
                        className="text-gray-500 text-lg font-medium max-w-2xl mx-auto"
                        style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards 0.3s' }}
                    >
                        We believe that trust is the foundation of any digital business. This document outlines exactly how we protect and manage your data.
                        <br/><span className="text-sm font-bold text-gray-400 mt-4 inline-block">Last Updated: October 24, 2023</span>
                    </p>
                </div>
            </div>

            {/* Content Cards */}
            <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-12">
                <div className="text-center text-xl font-medium text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
                    At Smart Group, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our billing software and related services.
                </div>

                {/* Section 1 */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(79,70,229,0.08)] hover:border-indigo-100 transition-all duration-500 group relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 rounded-l-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                            <Database size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">1. Information We Collect</h2>
                            <p className="text-gray-500 leading-relaxed mb-6 font-medium">We collect information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us, or otherwise contact us.</p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                    <ChevronRight className="text-indigo-600 shrink-0 mt-0.5" size={18}/>
                                    <span className="text-gray-600 font-medium"><strong className="text-gray-900">Personal Information:</strong> Name, email address, phone number, and billing information.</span>
                                </div>
                                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                    <ChevronRight className="text-indigo-600 shrink-0 mt-0.5" size={18}/>
                                    <span className="text-gray-600 font-medium"><strong className="text-gray-900">Business Data:</strong> Inventory counts, supplier details, customer records, and transaction logs.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(168,85,247,0.08)] hover:border-purple-100 transition-all duration-500 group relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-purple-500 rounded-l-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl shrink-0 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-sm">
                            <Eye size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-purple-600 transition-colors">2. How We Use Your Information</h2>
                            <p className="text-gray-500 leading-relaxed mb-6 font-medium">We use personal information collected via our Services for a variety of business purposes, ensuring your data is only utilized to enhance your experience.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-purple-50/50 rounded-xl text-gray-600 font-medium text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> Account & Login verification</div>
                                <div className="p-4 bg-purple-50/50 rounded-xl text-gray-600 font-medium text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> Service operation & maintenance</div>
                                <div className="p-4 bg-purple-50/50 rounded-xl text-gray-600 font-medium text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> Administrative communications</div>
                                <div className="p-4 bg-purple-50/50 rounded-xl text-gray-600 font-medium text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> Fraud monitoring & security</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.08)] hover:border-emerald-100 transition-all duration-500 group relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 rounded-l-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex flex-col md:flex-row gap-8 items-end md:items-center">
                        <div className="w-full md:w-3/4">
                            <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-emerald-600 transition-colors flex items-center gap-4">
                                <Lock className="text-emerald-500" size={28}/> 3. Military-Grade Security
                            </h2>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                We have implemented rigorous technical security measures designed to protect the integrity of your personal information. All transaction data is encrypted in transit and at rest using industry-standard <strong className="text-gray-900">AES-256 encryption</strong>. Furthermore, our databases operate within isolated virtual private clouds.
                            </p>
                        </div>
                        <div className="w-full md:w-1/4 flex justify-end">
                            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center border-[8px] border-emerald-100 group-hover:border-emerald-200 transition-colors">
                                <Shield size={32} className="text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Final Box */}
                <div className="mt-20 bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-800 text-center relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Still have questions?</h2>
                    <p className="text-gray-400 font-medium mb-8 max-w-lg mx-auto">
                        If you have questions about our data protocols or wish to execute a subject access request, contact our Data Protection Officer immediately.
                    </p>
                    <a 
                        href="mailto:privacy@smartgroup.com" 
                        className="inline-flex py-5 px-10 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-105 hover:bg-gray-100 transition-all"
                    >
                        Contact Privacy Team
                    </a>
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
