import React, { useState, useEffect } from 'react';
import { Send, Loader2, ArrowRight, MessageCircle } from 'lucide-react';
import axios from 'axios';

const ContactUs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        inquiryType: 'Sales',
        message: ''
    });

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Save to localStorage so InboxManagement can read it
            const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            const newMessage = {
                _id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString(),
                read: false
            };
            localStorage.setItem('contactMessages', JSON.stringify([...existingMessages, newMessage]));
            
            setIsSent(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                inquiryType: 'Sales',
                message: ''
            });

            setTimeout(() => setIsSent(false), 5000);
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] font-inter overflow-hidden relative">
            
            {/* Dynamic Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div 
                    className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[120px] transition-transform duration-1000 ease-out"
                    style={{ transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)` }}
                />
                <div 
                    className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[150px] transition-transform duration-1000 ease-out flex items-center justify-center"
                    style={{ transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)` }}
                >
                    <div className="w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[100px] animate-pulse-slow" />
                </div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGgxdjFIMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz4KPC9zdmc+')] opacity-50 mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                    
                    {/* Left Column: Hero Text */}
                    <div className="lg:col-span-5 text-white">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest mb-8 text-indigo-400 backdrop-blur-md">
                            <MessageCircle size={14} /> Contact Support
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.1]">
                            Let's start a <br/>
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">conversation.</span>
                        </h1>
                        
                        <p className="text-gray-400 text-lg md:text-xl font-medium mb-12 max-w-lg leading-relaxed">
                            Have a complex challenge or need support? Send us a message and our admin team will review it immediately.
                        </p>
                    </div>

                    {/* Right Column: Glassmorphic Form */}
                    <div className="lg:col-span-7 lg:pl-12 relative">
                        {/* Decorative floating element */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-[40px] opacity-50 animate-pulse"></div>
                        
                        <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                            
                            {/* Hover glow effect tracing border */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                                <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                                <div className="absolute inset-y-0 -right-px w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
                            </div>

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                
                                {isSent ? (
                                    <div className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-xl rounded-[2rem] flex flex-col items-center justify-center text-center z-20 animate-fadeIn">
                                        <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                                            <Send size={40} />
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Transmission <br/>Successful</h3>
                                        <p className="text-gray-400 font-medium">Your message has been sent to the Admin dashboard.</p>
                                    </div>
                                ) : null}

                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-bold text-center">
                                        {error}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                                        <input 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            type="text" 
                                            required
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white/10 transition-all font-medium text-white placeholder:text-gray-600 focus:border-indigo-500 shadow-inner"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                        <input 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            type="text" 
                                            required
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white/10 transition-all font-medium text-white placeholder:text-gray-600 focus:border-indigo-500 shadow-inner"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email" 
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white/10 transition-all font-medium text-white placeholder:text-gray-600 focus:border-indigo-500 shadow-inner"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Inquiry Type</label>
                                    <div className="grid grid-cols-2 gap-3 mt-1">
                                        <label className="cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="inquiryType" 
                                                value="Sales"
                                                checked={formData.inquiryType === 'Sales'}
                                                onChange={handleChange}
                                                className="peer sr-only" 
                                            />
                                            <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-center text-sm font-bold text-gray-400 peer-checked:bg-indigo-500/20 peer-checked:border-indigo-500/50 peer-checked:text-indigo-300 transition-all">Sales</div>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="inquiryType" 
                                                value="Support"
                                                checked={formData.inquiryType === 'Support'}
                                                onChange={handleChange}
                                                className="peer sr-only" 
                                            />
                                            <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-center text-sm font-bold text-gray-400 peer-checked:bg-purple-500/20 peer-checked:border-purple-500/50 peer-checked:text-purple-300 transition-all">Support</div>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white/10 transition-all font-medium text-white placeholder:text-gray-600 focus:border-indigo-500 shadow-inner resize-none"
                                        placeholder="How can we help?"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] hover:bg-gray-100 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                                >
                                    {isLoading ? (
                                        <Loader2 size={24} className="animate-spin text-indigo-600" />
                                    ) : (
                                        <>Deploy Message <ArrowRight size={20} /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;
