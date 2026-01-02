import React, { useEffect, useState } from 'react';
import Signin from '../../../Component/Account/signin';

function Account() {
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
              <defs>
                <linearGradient id="loginBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:%23764ba2;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:%2380628B;stop-opacity:1" />
                </linearGradient>
                <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/>
                </pattern>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(%23loginBg)"/>
              <rect width="100%" height="100%" fill="url(%23dots)"/>
              <rect width="100%" height="100%" fill="url(%23grid)"/>
              <circle cx="300" cy="200" r="150" fill="%23ffffff" opacity="0.05"/>
              <circle cx="900" cy="600" r="200" fill="%23ffffff" opacity="0.03"/>
              <circle cx="1100" cy="300" r="100" fill="%23ffffff" opacity="0.05"/>
            </svg>
          `)}')
          `,
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) scale(1.1)`
        }}
      />
      
      {/* Parallax Layer 1 */}
      <div 
        className="absolute inset-0 opacity-10 transition-transform duration-800 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"/>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}/>
      </div>
      
      {/* Parallax Layer 2 */}
      <div 
        className="absolute inset-0 opacity-15 transition-transform duration-600 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
        }}
      >
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-overlay filter blur-2xl animate-pulse" style={{animationDelay: '1s'}}/>
      </div>
      
      {/* Floating Elements */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`
        }}
      >
        <div className="absolute top-1/4 left-1/5 w-6 h-6 bg-white rounded opacity-20 animate-bounce"/>
        <div className="absolute top-1/3 right-1/5 w-8 h-8 bg-purple-200 rounded-full opacity-15 animate-bounce" style={{animationDelay: '1s'}}/>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-white rounded opacity-25 animate-bounce" style={{animationDelay: '2s'}}/>
        <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-indigo-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '3s'}}/>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Signin/>
      </div>
    </div>
  );
}

export default Account;