// src/Component/Home/Homesection10.jsx
import React, { useEffect, useState } from 'react';

const Homesection9 = () => {
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
        <section className="py-24 relative overflow-hidden">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23fef3c7;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23fce7f3;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%23e0e7ff;stop-opacity:1" />
                                </linearGradient>
                                <radialGradient id="spark1">
                                    <stop offset="0%" style="stop-color:%23fbbf24;stop-opacity:0.3" />
                                    <stop offset="100%" style="stop-color:%23fbbf24;stop-opacity:0" />
                                </radialGradient>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23bg2)"/>
                            <circle cx="300" cy="200" r="150" fill="url(%23spark1)"/>
                            <circle cx="900" cy="500" r="200" fill="url(%23spark1)"/>
                            <circle cx="600" cy="600" r="100" fill="%23c084fc" opacity="0.1"/>
                            <path d="M 100 400 Q 300 350 500 400 T 900 400" stroke="%23a78bfa" stroke-width="2" fill="none" opacity="0.2"/>
                            <path d="M 200 500 Q 400 450 600 500 T 1000 500" stroke="%23fbbf24" stroke-width="2" fill="none" opacity="0.2"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px) scale(1.1)`
                }}
            ></div>
            
            {/* Parallax Layer 1 */}
            <div 
                className="absolute inset-0 opacity-20 transition-transform duration-800 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`
                }}
            >
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            
            {/* Parallax Layer 2 */}
            <div 
                className="absolute inset-0 opacity-15 transition-transform duration-600 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`
                }}
            >
                <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl"></div>
            </div>
            <div 
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                }}
            >
                
                {/* Visual Elements (Firework/Sparkle Doodles) with Parallax */}
                <div className="relative mb-12">
                    <span 
                        className="absolute left-1/4 top-[-20px] text-yellow-500 text-6xl transform rotate-12 hidden sm:block transition-transform duration-500"
                        style={{transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px) rotate(12deg)`}}
                    >✨</span>
                    <span 
                        className="absolute right-1/4 top-[-5px] text-yellow-500 text-6xl transform -rotate-12 hidden sm:block transition-transform duration-500"
                        style={{transform: `translate(${mousePosition.x * -0.08}px, ${mousePosition.y * 0.08}px) rotate(-12deg)`}}
                    >✨</span>
                    <span 
                        className="absolute left-1/3 top-[-50px] text-orange-400 text-opacity-70 text-4xl transform -rotate-45 hidden md:block transition-transform duration-700"
                        style={{transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px) rotate(-45deg)`}}
                    >★</span>
                    <span 
                        className="absolute right-1/3 top-[-35px] text-orange-400 text-opacity-70 text-4xl transform rotate-45 hidden md:block transition-transform duration-700"
                        style={{transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * 0.1}px) rotate(45deg)`}}
                    >★</span>
                    
                    {/* Headline: "Start your footwear billing journey" */}
                    <h2 className="text-4xl md:text-4xl font-headline text-green-700 leading-none font-extrabold">
                        Start your Billing Software
                    </h2>
                    <h2 className="text-4xl md:text-4xl font-headline text-green-700 leading-none font-extrabold">
                        journey today
                    </h2>
                </div>
                
                {/* CTA Button (Matches the style in the image) */}
               <a href="/Account"> <button 
                    className="px-10 py-4 font-semibold rounded-lg transition duration-200 
                               bg-purple-main hover:bg-indigo-200  text-black text-xl shadow-lg mt-8 "
                >
                    Start now - It's free
                </button></a>

                {/* Arrow and Subtext */}
                <div className="flex flex-col items-center mt-4">
                    <span className="text-teal-highlight text-3xl font-bold mb-1">↑</span>
                    <p className="text-sm text-gray-600">No credit card required</p>
                    <p className="text-sm text-gray-600">Instant access</p>
                </div>

            </div>
        </section>
    );
};

export default Homesection9;