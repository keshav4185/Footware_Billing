import React from 'react';
import { Link } from 'react-router-dom';
import {
    Play,
    Smartphone,
    IndianRupee,
    FileText,
    Send,
    Printer,
    Calculator,
    FileCheck,
    CheckCircle2,
    BookOpen,
    ArrowRight,
    Calendar,
    Search,
    Eye,
    Trash2,
    Globe
} from 'lucide-react';
import backgroundVideo from '../../assets/Home/video.webm';

const TutorialSection = ({ title, subtitle, children }) => (
    <div className="mb-20 animate-fadeInUp">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-800 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        {children}
    </div>
);

const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group">
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="text-white" size={28} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const PaymentMockup = () => (
    <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mx-auto">
        <div className="p-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Calculator size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Bill Summary Preview</h3>
        </div>
        <div className="p-8 space-y-6">
            <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Untaxed Amount:</span>
                    <span className="text-gray-900 font-bold">₹ 1500.00</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-50">
                    <span className="text-gray-500 font-medium tracking-wide">CGST (9%):</span>
                    <span className="text-gray-900 font-bold">₹ 133.65</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-50">
                    <span className="text-gray-500 font-medium tracking-wide">SGST (9%):</span>
                    <span className="text-gray-900 font-bold">₹ 133.65</span>
                </div>
            </div>
            <div className="bg-indigo-600 rounded-2xl p-6 flex justify-between items-center text-white shadow-lg shadow-indigo-200">
                <span className="font-bold uppercase tracking-wider text-sm">Total Amount:</span>
                <span className="font-extrabold text-2xl">₹ 1,752.30</span>
            </div>
            <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
                    <Printer size={18} /> Print Invoice
                </button>
                <button className="flex-1 bg-indigo-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors">
                    <Send size={18} /> WhatsApp Share
                </button>
            </div>
        </div>
    </div>
);

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


const Tutorialscom = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="relative bg-white pt-16 pb-32 overflow-hidden border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 animate-fadeIn">
                        <BookOpen size={16} />
                        <span>Smart Learning Center</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Master Your <span className="text-indigo-600">Billing Workflow</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Follow our step-by-step guides and demonstration video to get the most out of Smart Group's professional billing tools.
                    </p>

                    {/* Featured Video Player */}
                    <div className="relative max-w-5xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-black rounded-[1.8rem] overflow-hidden shadow-2xl">
                            <video
                                className="w-full aspect-video object-cover"
                                controls
                                autoPlay
                                muted
                                loop
                                poster="https://picsum.photos/id/1/1200/675"
                            >
                                <source src={backgroundVideo} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="text-white fill-white ml-1" size={32} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20">
                {/* Section 1: Core System Features */}
                <TutorialSection
                    title="Step 1: Understanding Core Features"
                    subtitle="Learn about the essential tools built specifically for your footwear business."
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Smartphone}
                            title="WhatsApp Integration"
                            description="Instantly share professional PDFs and bill details directly with your customers via WhatsApp."
                            color="bg-green-500"
                        />
                        <FeatureCard
                            icon={IndianRupee}
                            title="Payment Tracking"
                            description="Keep accurate records of advance payments, partial amounts, and outstanding balances per customer."
                            color="bg-indigo-500"
                        />
                        <FeatureCard
                            icon={FileCheck}
                            title="GST Compliance"
                            description="Automatic calculation of CGST and SGST with professional invoice templates tailored for India."
                            color="bg-purple-500"
                        />
                    </div>
                </TutorialSection>

                {/* Section 2: Interactive Workflow Tutorial */}
                <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Calculator size={200} className="text-gray-400" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm block mb-4">Step 2: Practical Workflow</span>
                            <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
                                Generate Your First <br /><span className="text-indigo-600">Professional Bill</span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Input Items", text: "Select your footwear items and enter quantities. The system calculates sub-totals instantly." },
                                    { title: "Manage Payments", text: "Record any advance payment. The system will track the remaining balance automatically." },
                                    { title: "Finalize & Share", text: "Preview the tax breakdown and generate the bill. Shared via WhatsApp or Print." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <PaymentMockup />
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce-slow">
                                <CheckCircle2 className="text-green-500" />
                                <span className="text-sm font-bold text-gray-800">Ready to Print</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32 relative overflow-hidden bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-xl">
                    <div className="absolute bottom-0 right-0 p-12 opacity-5 pointer-events-none transform rotate-12">
                        <Smartphone size={240} className="text-gray-400" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 flex justify-center">
                            <div className="relative">
                                <MobileBillingMockup />
                                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce-slow">
                                    <Globe className="text-indigo-500" />
                                    <span className="text-sm font-bold text-gray-800">Cloud Sync Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm block mb-4">Step 3: Access Anywhere</span>
                            <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
                                Access your bills <br /><span className="text-indigo-600">anywhere</span>
                            </h2>
                            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                                Use any device to create invoices, track payments, and manage your footwear business billing. Works on mobile, tablet, and desktop.
                            </p>
                            <Link to="/dashboard" className="flex justify-center lg:justify-start">
                                <div className="flex items-center bg-indigo-600 text-white px-8 py-4 rounded-2xl shadow-xl gap-4 hover:scale-105 transition-transform cursor-pointer">
                                    <Globe size={28} />
                                    <div className="text-left">
                                        <p className="text-xs text-indigo-100 uppercase font-bold tracking-wider">Available on</p>
                                        <p className="font-bold text-lg">Web Browser</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-32 text-center bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] py-16 px-6 shadow-2xl shadow-indigo-200">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Start Your Journey Today</h2>
                    <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">
                        Join thousands of businesses already using Smart Group to streamline their billing operations.
                    </p>
                    <Link to="/dashboard">
                        <button className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-xl flex items-center gap-2 mx-auto">
                            Launch Dashboard <ArrowRight size={20} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Tutorialscom;