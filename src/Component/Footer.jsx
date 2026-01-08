// src/Component/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
// Simplified Icon Placeholder Component
const SocialIcon = ({ children }) => (
    <a href="#" className="text-gray-400">
        {children}
    </a>
);

const Footer = () => {
    return (
        // Enhanced footer with gradient background and animated elements
        <footer className="bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 text-indigo-900 pt-6 border-t-0 relative overflow-hidden"> 
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-20 animate-float blur-xl"></div>
                <div className="absolute bottom-10 right-20 w-24 h-24 bg-gradient-to-r from-green-200 to-indigo-200 rounded-full opacity-25 animate-bounce-slow blur-lg"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-15 animate-pulse-slow blur-md"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                
                {/* Odoo Logo (Centered) */}
                <div className="flex justify-center mb-4">
                      <Link to="/" className="flex items-center space-x-2 transform hover:scale-110 transition-all duration-300 group">
                           <img src={Logo} alt="Logo" className='h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain -my-4 group-hover:rotate-12 transition-transform duration-500 hover:animate-pulse'/>
                        </Link>
                </div>
                

                {/* Main Content Grid (Responsive: 2/3 columns on mobile/tablet, 4 on desktop) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6">
                    
                    {/* Column 1: Community & Open Source */}
                    <div className="col-span-2 sm:col-span-1 animate-slideInLeft">
                        <h4 className="font-bold mb-2 text-lg hover:text-purple-600 transition-colors duration-300">Community</h4>
                        <ul className="space-y-1 text-sm text-black">
                            <li><a href="/tutorial" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Tutorials</a></li>
                            <li><a href="/documentation" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Documentation</a></li>
                        </ul>

                        <h4 className="font-bold mt-4 mb-2 text-lg hover:text-purple-600 transition-colors duration-300">Open Source</h4>
                        <ul className="space-y-1 text-sm text-black">
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Download</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Github</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Runbot</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Translations</a></li>
                        </ul>
                    </div>
                    
                    {/* Column 2: Services */}
                    <div className="animate-slideInUp" style={{animationDelay: '0.1s'}}>
                        <h4 className="font-bold mb-2 text-lg hover:text-purple-600 transition-colors duration-300">Services</h4>
                        <ul className="space-y-1 text-sm text-black">
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Odoo.sh Hosting</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Support</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Upgrade</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Custom Developments</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Education</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Find an Accountant</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Find a Partner</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Become a Partner</a></li>
                        </ul>
                    </div>

                    {/* Column 3: About us */}
                    <div className="animate-slideInUp" style={{animationDelay: '0.2s'}}>
                        <h4 className="font-bold mb-2 text-lg hover:text-purple-600 transition-colors duration-300">About us</h4>
                        <ul className="space-y-1 text-sm text-black">
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Our company</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Brand Assets</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Contact us</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Jobs</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Events</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Podcast</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Blog</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Customers</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Legal • Privacy</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 inline-block">Security</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Language, Description, Social Media */}
                    <div className="col-span-2 lg:col-span-1 border-t sm:border-t-0 border-gray-600 pt-4 sm:pt-0 animate-slideInRight">
                        {/* Language Selector */}
                        <div className="mb-4">
                            <span className="text-black flex items-center space-x-2 cursor-pointer text-sm hover:text-purple-600 transition-colors duration-300 transform hover:scale-105">
                                🇺🇸 English ▾
                            </span>
                        </div>

                        <div className="border-t border-gray-600 pt-2">
                            <p className="text-sm text-black mb-2 hover:text-gray-700 transition-colors duration-300">
                                Smart is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.
                            </p>
                            <p className="text-sm text-black mb-4 hover:text-gray-700 transition-colors duration-300">
                                Smart unique value proposition is to be at the same time very easy to use and fully integrated.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar / Copyright */}
                <div className="mt-6 pt-3 pb-2 border-t border-gray-700 text-center text-sm text-black animate-fadeInUp">
                    Website is develop by keshav golande <span className="font-semi-bold text-purple-600 hover:text-purple-800 transition-colors duration-300 animate-pulse">SMART</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;