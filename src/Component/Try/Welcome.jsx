import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandRaisedIcon } from '@heroicons/react/24/solid';

const Welcome = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsExiting(true); 
      
      const navTimer = setTimeout(() => {
        // Updated this line to match your route path
        navigate('/sdashboardpage'); 
      }, 600);

      return () => clearTimeout(navTimer);
    }, 3500);

    return () => clearTimeout(loadTimer);
  }, [navigate]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md transition-all duration-700 ease-in-out ${isExiting ? 'opacity-0 scale-110' : 'opacity-100'}`}>
      
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Layer 1 - Floating shapes with logo colors */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#8BC34A] rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#2E4F7A] rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#4A4A4A] rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Layer 2 - Moving geometric shapes */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#8BC34A] transform rotate-45 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3s'}}></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-[#2E4F7A] rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4s'}}></div>
          <div className="absolute top-3/4 right-1/3 w-16 h-16 bg-[#4A90E2] transform rotate-12 animate-bounce" style={{animationDelay: '2.5s', animationDuration: '2.5s'}}></div>
        </div>
        
        {/* Layer 3 - Floating particles */}
        <div className="absolute inset-0 opacity-25">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-pulse`}
              style={{
                backgroundColor: i % 3 === 0 ? '#8BC34A' : i % 3 === 1 ? '#2E4F7A' : '#4A90E2',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute w-[600px] h-[600px] bg-[#8BC34A]/10 rounded-full blur-[120px] animate-pulse" />

      <div className={`relative w-full max-w-lg p-10 bg-white/95 backdrop-blur-sm border-2 border-[#2E4F7A] rounded-[2.5rem] shadow-2xl mx-4 transition-transform duration-700 ${isExiting ? 'scale-90' : 'scale-100 animate-in zoom-in-95'}`}>
        
        {/* Radar Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {!isExiting && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#8BC34A]/20 rounded-full animate-ping" />
          )}
          <div className="relative z-20 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#8BC34A] to-[#2E4F7A] rounded-full border-[6px] border-white shadow-lg">
            <div className="text-white font-bold text-xl">S</div>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-[3.8rem] font-bold bg-gradient-to-r from-[#4A4A4A] via-[#8BC34A] to-[#2E4F7A] bg-clip-text text-transparent leading-[1.05] mb-6 tracking-tighter text-center ">
            Welcome to <br />Smart
          </h1>
          <div className="space-y-4">
            <p className="text-gray-500 text-lg font-medium tracking-wide">
              {isExiting ? 'Loading Dashboard...' : 'Searching for your instance'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
          <div 
            className={`absolute h-full bg-gradient-to-r from-[#8BC34A] to-[#2E4F7A] transition-all duration-[3500ms] ease-out ${isExiting ? 'w-full' : 'w-0'}`}
            style={{ width: isExiting ? '100%' : '75%' }} 
          />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-32 bg-gradient-to-r from-transparent via-[#8BC34A]/5 to-transparent animate-[scan_3s_linear_infinite]" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { transform: translateX(-150%); } 100% { transform: translateX(450%); } }
      `}} />
    </div>
  );
};

export default Welcome;