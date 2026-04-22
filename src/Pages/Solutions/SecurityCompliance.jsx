import React from 'react';
import { 
    ShieldCheck, 
    Lock, 
    UserCheck, 
    CloudUpload, 
    CheckCircle2, 
    ArrowRight,
    Shield,
    Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityCompliance = () => {
    const features = [
        {
            title: "Bank-Grade Encryption",
            description: "Your business and customer data is encrypted using advanced security protocols, ensuring maximum privacy and protection.",
            icon: <Lock className="text-[#3D0448]" />
        },
        {
            title: "Automated Cloud Backups",
            description: "Never worry about hardware failure. Your billing data is automatically backed up to our secure cloud servers in real-time.",
            icon: <CloudUpload className="text-[#B564C3]" />
        },
        {
            title: "Role-Based Access",
            description: "Control exactly what your staff can see or do. Set individual permissions for billing, stock, and reports management.",
            icon: <UserCheck className="text-[#3D0448]" />
        },
        {
            title: "Privacy by Design",
            description: "We adhere strictly to data protection laws, ensuring that your customer information is never shared or misused.",
            icon: <ShieldCheck className="text-green-600" />
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gray-50/30">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#3D0448]/5 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D0448]/10 text-[#3D0448] text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
                                <Shield size={12} />
                                <span>Zero-Trust Architecture</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                                Your Data. <span className="text-[#3D0448]">Safe & Secure</span>
                            </h1>
                            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
                                Enterprise-level security is no longer just for big corporations. Focus on your business while we handle your data protection with industry-leading standards.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/Signin" className="bg-[#3D0448] text-white px-10 py-5 rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-[#3D0448]/20 flex items-center justify-center gap-2">
                                    Secure Your Account <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                        
                        {/* Security Visual Mockup */}
                        <div className="relative">
                            <div className="bg-white border border-gray-100 p-10 rounded-[4rem] shadow-2xl relative z-10 overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Database size={200} className="text-[#3D0448]" />
                                </div>
                                <div className="space-y-8 relative z-10">
                                    <div className="flex justify-center mb-8">
                                        <div className="w-24 h-24 bg-[#3D0448]/10 rounded-full flex items-center justify-center">
                                            <ShieldCheck size={48} className="text-[#3D0448]" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-4 bg-gray-50 rounded-full w-full"></div>
                                        <div className="h-4 bg-gray-50 rounded-full w-5/6 mx-auto"></div>
                                        <div className="h-4 bg-gray-50 rounded-full w-2/3 mx-auto"></div>
                                    </div>
                                    <div className="bg-[#B564C3]/10 p-4 rounded-2xl text-center border border-[#B564C3]/20">
                                        <div className="text-[10px] font-black text-[#B564C3] uppercase tracking-widest mb-1">Status</div>
                                        <div className="font-black text-[#3D0448]">100% PROTECTED</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-[#B564C3] blur-[100px] opacity-10 pointer-events-none rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Uncompromising Privacy</h2>
                        <p className="text-gray-500 text-lg">Multiple layers of protection for your store's sensitive data.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                                    {React.cloneElement(feature.icon, { size: 24 })}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Info */}
            <section className="py-24 bg-[#3D0448]/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000" 
                                alt="Security team" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight text-[#3D0448]">Reliability You Can Count On</h2>
                            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                Our platform is built on redundant infrastructure, meaning your store's billing never stops. Even in the event of hardware damage, your data remains accessible from any secondary device instantly.
                            </p>
                            <div className="space-y-4">
                                {['End-to-end data encryption', '99.9% Up-time guarantee', 'Real-time sync across devices'].map((text, i) => (
                                    <div key={i} className="flex gap-4 items-center font-bold text-gray-800">
                                        <div className="text-[#3D0448]"><CheckCircle2 size={24}/></div>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-[#B564C3] text-center relative overflow-hidden mx-6 rounded-[3rem] mb-24 shadow-2xl shadow-[#B564C3]/20">
                <div className="relative z-10 px-6 text-white">
                    <h2 className="text-3xl md:text-5xl font-black mb-8">Secure Your Business <br/>Today</h2>
                    <Link to="/Signin" className="bg-white text-[#3D0448] px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl inline-block">
                        Get Secure Access
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default SecurityCompliance;
