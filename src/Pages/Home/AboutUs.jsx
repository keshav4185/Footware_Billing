import React from 'react';
import { Link } from 'react-router-dom';
import {
    Users,
    Rocket,
    ShieldCheck,
    Zap,
    Target,
    ArrowRight,
    Award,
    Heart,
    Handshake,
    CheckCircle2
} from 'lucide-react';

const AboutUs = () => {
    const values = [
        {
            icon: <Zap className="text-amber-500" size={32} />,
            title: "Performance First",
            description: "We build tools that work at the speed of your business, ensuring no customer is ever kept waiting."
        },
        {
            icon: <ShieldCheck className="text-emerald-500" size={32} />,
            title: "Unyielding Security",
            description: "Your business data is your most valuable asset. We protect it with enterprise-grade encryption."
        },
        {
            icon: <Handshake className="text-indigo-500" size={32} />,
            title: "Simplicity in Integration",
            description: "Complex business needs don't require complex software. Everything we build is plug-and-play."
        },
        {
            icon: <Heart className="text-rose-500" size={32} />,
            title: "Community Driven",
            description: "We grow with our users. Your feedback directly shapes every feature we release."
        }
    ];

    const milestones = [
        { year: "2020", event: "Smart Group founded with a vision to simplify retail billing." },
        { year: "2021", event: "Reached 1,000+ active businesses across the region." },
        { year: "2022", event: "Launched advanced analytics and AI-driven reporting." },
        { year: "2023", event: "Voted #1 most user-friendly billing software in the industry." },
        { year: "2024", event: "Expanded operations globally, successfully serving over 10,000 active businesses worldwide." },
        { year: "2025", event: "Introduced the next-generation enterprise API, enabling seamless third-party integrations." },
        { year: "2026", event: "Pioneered automated predictive inventory management, fully redefining modern retail operations." }
    ];

    return (
        <div className="min-h-screen bg-white font-inter overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50 rounded-full blur-[120px] opacity-60 animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[100px] opacity-40 animate-float"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-fadeIn">
                        <Award size={14} /> Our Story
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-8 leading-[1.1] animate-slideInUp">
                        Empowering Growth <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent italic">Through Innovation.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-12 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                        Smart Group is more than just software. We are a team of visionaries dedicated to building the tools that modern businesses need to thrive in a digital-first world.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                        <Link to="/Signin" className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl flex items-center gap-2 group">
                            Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 italic">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 px-6 bg-gray-50/50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-[3rem] blur-2xl opacity-50"></div>
                        <div className="relative bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
                            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">One Vision. <br />Infinite Possibilities.</h2>
                            <p className="text-gray-500 leading-relaxed font-medium mb-8">
                                Smart Group unique value proposition is to be at the same time very easy to use and fully integrated. We believe that technology should work for people, not the other way around. Our suite of business apps covers everything from accounting to complex sales analytics.
                            </p>
                            <div className="space-y-4">
                                {['Zero Configuration Start', 'Enterprise Grade Security', 'Real-time Dashboards'].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-900 font-bold">
                                        <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                            <Target size={12} /> Our Mission
                        </div>
                        <h3 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">Redefining Small Business Management.</h3>
                        <p className="text-gray-500 text-lg leading-relaxed mb-10">
                            Our mission is simple: to empower business owners with the same high-level tools used by global corporations, but designed for the agility and speed of a growing local shop. We handle the complexity so you can focus on your customers.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-4xl font-black text-indigo-600 mb-1">10k+</h4>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Users</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-black text-purple-600 mb-1">99.9%</h4>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Uptime Record</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Our Core Values</h2>
                        <p className="text-gray-500 font-medium">The pillars that sustain every decision we make at Smart Group.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 group">
                                <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                                    {v.icon}
                                </div>
                                <h4 className="text-xl font-black text-gray-900 mb-4">{v.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed font-semibold">
                                    {v.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="max-w-4xl mx-auto py-24 px-6 md:px-16 bg-indigo-600 relative overflow-hidden sm:mx-6 lg:mx-auto rounded-[4rem] mb-24 shadow-2xl shadow-indigo-200">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="max-w-2xl mx-auto relative z-10 text-white">
                    <div className="text-center mb-16">
                        <Rocket className="mx-auto mb-6 opacity-50" size={48} />
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight italic">Our Journey</h2>
                        <p className="opacity-70 font-medium">Tracing the roots of our innovation.</p>
                    </div>
                    <div className="space-y-12">
                        {milestones.map((m, i) => (
                            <div key={i} className="flex gap-8 items-start group">
                                <div className="text-4xl font-black opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 will-change-transform tabular-nums">
                                    {m.year}
                                </div>
                                <div className="pt-2 border-l border-white/20 pl-8 pb-10">
                                    <p className="text-lg font-black tracking-tight group-hover:text-indigo-200 transition-colors">
                                        {m.event}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default AboutUs;
