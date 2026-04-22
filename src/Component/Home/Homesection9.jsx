import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const Homesection9 = () => {
    return (
        <section className="py-24 relative overflow-hidden perspective-1000">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out transform-gpu"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23f3e8ff;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23fae8ff;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%23e0e7ff;stop-opacity:1" />
                                </linearGradient>
                                <radialGradient id="spark1">
                                    <stop offset="0%" style="stop-color:%23B564C3;stop-opacity:0.3" />
                                    <stop offset="100%" style="stop-color:%23B564C3;stop-opacity:0" />
                                </radialGradient>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23bg2)"/>
                            <circle cx="300" cy="200" r="150" fill="url(%23spark1)"/>
                            <circle cx="900" cy="500" r="200" fill="url(%23spark1)"/>
                            <circle cx="600" cy="600" r="100" fill="%23B564C3" opacity="0.1"/>
                            <path d="M 100 400 Q 300 350 500 400 T 900 400" stroke="%233D0448" stroke-width="2" fill="none" opacity="0.2"/>
                            <path d="M 200 500 Q 400 450 600 500 T 1000 500" stroke="%23B564C3" stroke-width="2" fill="none" opacity="0.2"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(calc(var(--m-x) * -0.03px), calc(var(--m-y) * -0.03px)) scale(1.1)`
                }}
            ></div>
            
            {/* Parallax Layer 1 */}
            <div 
                className="absolute inset-0 opacity-20 transition-transform duration-800 ease-out transform-gpu"
                style={{
                    transform: `translate(calc(var(--m-x) * 0.04px), calc(var(--m-y) * 0.04px))`
                }}
            >
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            
            {/* Parallax Layer 2 */}
            <div 
                className="absolute inset-0 opacity-15 transition-transform duration-600 ease-out transform-gpu"
                style={{
                    transform: `translate(calc(var(--m-x) * 0.06px), calc(var(--m-y) * 0.06px))`
                }}
            >
                <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl"></div>
            </div>
            <div 
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center transition-transform duration-300 ease-out transform-gpu"
                style={{
                    transform: `translate(calc(var(--m-x) * 0.02px), calc(var(--m-y) * 0.02px))`
                }}
            >
                
                {/* Visual Elements (Firework/Sparkle Doodles) with Parallax */}
                <div className="relative mb-12">
                    <ScrollReveal animation="scale-in" delay={300} className="absolute left-[20%] top-[-30px] text-[#B564C3] transform rotate-12 hidden sm:block transition-transform duration-500 transform-gpu"
                        style={{transform: `translate(calc(var(--m-x) * 0.08px), calc(var(--m-y) * 0.08px)) rotate(12deg)`}}
                    >
                        <Sparkles size={48} />
                    </ScrollReveal>
                    <ScrollReveal animation="scale-in" delay={500} className="absolute right-[20%] top-[-20px] text-[#3D0448] transform -rotate-12 hidden sm:block transition-transform duration-500 transform-gpu"
                        style={{transform: `translate(calc(var(--m-x) * -0.08px), calc(var(--m-y) * 0.08px)) rotate(-12deg)`}}
                    >
                        <Sparkles size={48} />
                    </ScrollReveal>
                    
                    <ScrollReveal animation="fadeInDown">
                        <h2 className="text-4xl md:text-5xl font-headline text-[#3D0448] leading-none font-extrabold mb-2">
                            Start your Billing Software
                        </h2>
                        <h2 className="text-4xl md:text-5xl font-headline text-[#3D0448] leading-none font-extrabold">
                            journey today
                        </h2>
                    </ScrollReveal>
                </div>
                
                {/* CTA Button */}
                <ScrollReveal animation="scale-in" delay={400}>
                    <a href="/Account"> 
                        <button 
                            className="px-10 py-4 font-semibold rounded-lg transition duration-200 
                                       bg-gradient-to-r from-[#B564C3] to-[#3D0448] text-white text-xl shadow-lg mt-8 border border-white/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            Start now - It's free
                        </button>
                    </a>
                </ScrollReveal>

                {/* Arrow and Subtext */}
                <ScrollReveal animation="fadeInUp" delay={600} className="flex flex-col items-center mt-8">
                    <span className="text-[#B564C3] text-3xl font-bold mb-1 animate-bounce-slow">↑</span>
                    <p className="text-sm text-gray-600 font-medium">No credit card required</p>
                    <p className="text-sm text-gray-600 font-medium">Instant access</p>
                </ScrollReveal>

            </div>
        </section>
    );
};

export default Homesection9;