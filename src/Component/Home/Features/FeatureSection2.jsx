import { FileEdit, CheckCircle2, CreditCard, IndianRupee, FileText, Briefcase, FileCheck, Mail, RefreshCw } from 'lucide-react';
import ScrollReveal from '../../ScrollReveal';
import TiltCard from '../../TiltCard';

const invoiceFeatures = [
    // --- Core Billing Features ---
    {
        title: "Create Professional Invoices",
        description: "Generate clear, complete and professional invoices with your company branding in seconds.",
        group: "Core Billing"
    },
    {
        title: "Customer Management",
        description: "Add and manage customer details with phone numbers, addresses, and GST information.",
        group: "Core Billing"
    },
    {
        title: "Product & Pricing",
        description: "Add products with quantities, prices, and discount percentages for accurate billing.",
        group: "Core Billing"
    },
    {
        title: "Tax Calculation",
        description: "Automatic CGST and SGST calculation with configurable tax rates for compliance.",
        group: "Core Billing"
    },
    {
        title: "Print & Share",
        description: "Print professional invoices or share them directly via WhatsApp with customers.",
        group: "Core Billing"
    },
    {
        title: "Payment Tracking",
        description: "Track advance payments, balance amounts, and payment status for each invoice.",
        group: "Core Billing"
    },
    // --- Advanced Features ---
    {
        title: "WhatsApp Integration",
        description: "Send invoices directly to customers via WhatsApp with formatted bill details.",
        group: "Advanced Features"
    },
    {
        title: "Digital Signatures",
        description: "Add your company's digital signature to invoices for professional authentication.",
        group: "Advanced Features"
    },
    {
        title: "Company Branding",
        description: "Customize invoices with your company logo, details, and brand information.",
        group: "Advanced Features"
    },
    {
        title: "Bill History",
        description: "View, search, and manage all your billing history with detailed invoice records.",
        group: "Advanced Features"
    },
    {
        title: "Employee Dashboard",
        description: "Role-based access for employees with personalized dashboards and billing controls.",
        group: "Advanced Features"
    },
    {
        title: "Responsive Design",
        description: "Works seamlessly on mobile phones, tablets, and desktop computers.",
        group: "Advanced Features"
    },
];

const FeaturesSection2 = () => {
    // Group features by their assigned category
    const groupedFeatures = invoiceFeatures.reduce((acc, feature) => {
        if (!acc[feature.group]) {
            acc[feature.group] = [];
        }
        acc[feature.group].push(feature);
        return acc;
    }, {});

    return (
        <section className="py-24 bg-white relative overflow-hidden perspective-1000">
            {/* Professional Billing Software Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Layer 1 - Invoice Management Interfaces */}
                <div 
                    className="absolute inset-0 opacity-8 transition-transform duration-1000 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.015px), calc(var(--m-y) * 0.015px))`
                    }}
                >
                    {/* Invoice Creation Interface */}
                    <div className="absolute top-20 left-16 w-72 h-48 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#B564C3]/20 p-4 transform rotate-6">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-3">Invoice Creation</div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span>Customer Details</span>
                                <span className="text-emerald-600 font-bold">Auto-filled</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Tax Calculation</span>
                                <span className="text-[#3D0448] font-bold">Automated</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Payment Terms</span>
                                <span className="text-[#3D0448] font-bold">Configured</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t text-[#B564C3]">
                            <div className="text-xs font-bold flex items-center gap-1">
                                <FileEdit size={14} /> Ready to Send
                            </div>
                        </div>
                    </div>
                    
                    {/* Compliance Dashboard */}
                    <div className="absolute bottom-24 right-16 w-64 h-44 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#3D0448]/20 p-4 transform -rotate-8">
                        <div className="text-sm font-bold text-[#4A4A4A] mb-3">Compliance Status</div>
                        <div className="space-y-2">
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>PEPPOL Compliant</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>VAT Rules Applied</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>Incoterms Included</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                            <div className="text-xs text-[#3D0448] font-bold flex items-center gap-1">
                                <CheckCircle2 size={14} /> All Requirements Met
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 2 - Payment & Refund Management */}
                <div 
                    className="absolute inset-0 opacity-10 transition-transform duration-700 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.025px), calc(var(--m-y) * 0.025px))`
                    }}
                >
                    {/* Payment Tracking */}
                    <div className="absolute top-1/3 left-1/4 w-56 h-36 bg-white/75 backdrop-blur-sm rounded-xl shadow-lg border border-[#B564C3]/25 p-3 transform rotate-12">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-2">Payment Tracking</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span>Received Today</span>
                                <span className="text-emerald-600 font-bold">₹45,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Pending</span>
                                <span className="text-[#3D0448] font-bold">₹18,500</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Overdue</span>
                                <span className="text-rose-600 font-bold">₹7,250</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t text-[#B564C3]">
                            <div className="text-xs font-bold flex items-center gap-1">
                                <CreditCard size={14} /> Batch Deposits
                            </div>
                        </div>
                    </div>
                    
                    {/* Refund Management */}
                    <div className="absolute bottom-1/3 right-1/4 w-48 h-32 bg-white/75 backdrop-blur-sm rounded-xl shadow-lg border border-[#3D0448]/25 p-3 transform -rotate-6">
                        <div className="text-sm font-bold text-[#4A4B4D] mb-2">Credit Notes</div>
                        <div className="space-y-2">
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#B564C3] rounded mr-2"></div>
                                <span>CN-001: ₹5,000</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#3D0448] rounded mr-2"></div>
                                <span>CN-002: ₹3,250</span>
                            </div>
                            <div className="flex items-center text-xs">
                                <div className="w-2 h-2 bg-[#B564C3]/50 rounded mr-2"></div>
                                <span>CN-003: ₹1,800</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t text-[#3D0448]">
                            <div className="text-xs font-bold flex items-center gap-1">
                                <IndianRupee size={14} /> Refunds Processed
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Layer 3 - Feature Icons */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.035px), calc(var(--m-y) * 0.035px))`
                    }}
                >
                    <div className="absolute top-1/4 right-1/3 text-[#B564C3] opacity-8 animate-bounce">
                        <FileText size={32} />
                    </div>
                    <div className="absolute top-2/3 left-1/6 text-[#3D0448] opacity-6 animate-bounce" style={{animationDelay: '1s'}}>
                        <Briefcase size={24} />
                    </div>
                    <div className="absolute bottom-1/4 right-1/5 text-[#B564C3]/50 opacity-8 animate-bounce" style={{animationDelay: '2s'}}>
                        <FileCheck size={24} />
                    </div>
                    <div className="absolute top-1/2 left-1/8 text-[#B564C3] opacity-6 animate-bounce" style={{animationDelay: '0.5s'}}>
                        <Mail size={24} />
                    </div>
                    <div className="absolute top-1/6 right-1/6 text-[#3D0448] opacity-5 animate-bounce" style={{animationDelay: '1.5s'}}>
                        <RefreshCw size={20} />
                    </div>
                    
                    {/* Geometric Elements */}
                    <div className="absolute top-1/6 left-1/3 w-6 h-6 border-2 border-[#B564C3] opacity-5 rounded animate-spin" style={{animationDuration: '25s'}}></div>
                    <div className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-[#3D0448] opacity-6 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 left-1/2 w-8 h-1 bg-[#B564C3]/30 opacity-5 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Layer 4 - Data Flow Lines */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-800 ease-out transform-gpu"
                    style={{
                        transform: `translate(calc(var(--m-x) * 0.02px), calc(var(--m-y) * 0.02px))`
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.04}}>
                        <defs>
                            <linearGradient id="invoiceFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#B564C3" />
                                <stop offset="50%" stopColor="#3D0448" />
                                <stop offset="100%" stopColor="#4A4B4D" />
                            </linearGradient>
                        </defs>
                        <path d="M200,150 Q500,100 800,250 T1100,130" stroke="url(#invoiceFlow)" strokeWidth="2" fill="none" className="animate-pulse" />
                        <path d="M150,320 Q450,220 750,370 T1050,250" stroke="url(#invoiceFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
                        <path d="M100,480 Q400,380 700,530 T1000,410" stroke="url(#invoiceFlow)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
                    </svg>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* --- Group 1: Core Billing ---*/}
                <ScrollReveal animation="fadeInDown">
                    <h2 className=" font-extrabold text-3xl md:text-4xl font-script leading-tight mb-16 text-center md:text-left font-handwriting bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent">
                        {Object.keys(groupedFeatures)[0]}
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 ">
                    {groupedFeatures["Core Billing"].map((feature, index) => (
                        <ScrollReveal 
                            key={index} 
                            animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"} 
                            delay={index * 100} 
                            className="h-full"
                        >
                            <TiltCard maxTilt={10} className="h-full">
                                <div className="flex flex-col p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 h-full card-hover">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 ">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </TiltCard>
                        </ScrollReveal>
                    ))}
                </div>

                {/* --- Group 2: Advanced Features --- */}
                <ScrollReveal animation="fadeInDown">
                    <h2 className=" font-extrabold text-3xl md:text-4xl font-script leading-tight mb-16 text-center md:text-left border-t pt-16 font-handwriting bg-gradient-to-r from-[#4A4B4D] via-[#B564C3] to-[#3D0448] bg-clip-text text-transparent">
                        {Object.keys(groupedFeatures)[1]}
                    </h2>
                </ScrollReveal>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {groupedFeatures["Advanced Features"].map((feature, index) => (
                        <ScrollReveal 
                            key={index} 
                            animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"} 
                            delay={index * 100} 
                            className="h-full"
                        >
                            <TiltCard maxTilt={10} className="h-full">
                                <div className="flex flex-col p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 h-full card-hover">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 ">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </TiltCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection2;