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
        // The background color is a very dark gray/near-black, border matches the purple-main accent
        <footer className="bg-green-100 text-indigo-900 pt-6 border-t-0 "> 
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Odoo Logo (Centered) */}
                <div className="flex justify-center mb-4">
                  
                      <Link to="/" className="flex items-center space-x-2">
                           <img src={Logo} alt="Logo" className='h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain -my-4'/>
                        </Link>
                </div>
                

                {/* Main Content Grid (Responsive: 2/3 columns on mobile/tablet, 4 on desktop) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6">
                    
                    {/* Column 1: Community & Open Source */}
                    <div className="col-span-2 sm:col-span-1">
                        <h4 className="font-bold mb-2 text-lg">Community</h4>
                        <ul className="space-y-1 text-sm text-black">
                            <li><a href="/tutorial" className="">Tutorials</a></li>
                            <li><a href="/documentation" className="">Documentation</a></li>
                          
                        </ul>

                        <h4 className="font-bold mt-4 mb-2 text-lg">Open Source</h4>
                        <ul className="space-y-1 text-sm text-black">
                            <li><a href="#" className="">Download</a></li>
                            <li><a href="#" className="">Github</a></li>
                            <li><a href="#" className="">Runbot</a></li>
                            <li><a href="#" className="">Translations</a></li>
                        </ul>
                    </div>
                    
                    {/* Column 2: Services */}
                    <div>
                        <h4 className="font-bold mb-2 text-lg">Services</h4>
                        <ul className="space-y-1 text-sm text-black">
                            <li><a href="#" className="">Odoo.sh Hosting</a></li>
                            <li><a href="#" className="">Support</a></li>
                            <li><a href="#" className="">Upgrade</a></li>
                            <li><a href="#" className="">Custom Developments</a></li>
                            <li><a href="#" className="">Education</a></li>
                            <li><a href="#" className="">Find an Accountant</a></li>
                            <li><a href="#" className="">Find a Partner</a></li>
                            <li><a href="#" className="">Become a Partner</a></li>
                        </ul>
                    </div>

                    {/* Column 3: About us */}
                    <div>
                        <h4 className="font-bold mb-2 text-lg">About us</h4>
                        <ul className="space-y-1 text-sm text-black">
                            <li><a href="#" className="">Our company</a></li>
                            <li><a href="#" className="">Brand Assets</a></li>
                            <li><a href="#" className="">Contact us</a></li>
                            <li><a href="#" className="">Jobs</a></li>
                            <li><a href="#" className="">Events</a></li>
                            <li><a href="#" className="">Podcast</a></li>
                            <li><a href="#" className="">Blog</a></li>
                            <li><a href="#" className="">Customers</a></li>
                            <li><a href="#" className="">Legal &bull; Privacy</a></li>
                            <li><a href="#" className="">Security</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Language, Description, Social Media */}
                    <div className="col-span-2 lg:col-span-1 border-t sm:border-t-0 border-gray-600 pt-4 sm:pt-0">
                        {/* Language Selector */}
                        <div className="mb-4">
                            <span className="text-black flex items-center space-x-2 cursor-pointer text-sm">
                                🇺🇸 English ▾
                            </span>
                        </div>

                        <div className="border-t border-gray-600 pt-2">
                            <p className="text-sm text-black mb-2">
                                Smart is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.
                            </p>
                            <p className="text-sm text-black mb-4">
                                Smart unique value proposition is to be at the same time very easy to use and fully integrated.
                            </p>
                            
                            {/* Social Media Links (Using simple text/emojis as placeholders for complex SVGs) */}
                           
                        </div>
                    </div>
                </div>

                {/* Bottom Bar / Copyright */}
                <div className="mt-6 pt-3 pb-2 border-t border-gray-700 text-center text-sm text-black">
                    Website is develop by keshav golande <span className="font-semi-bold text-white">SMART</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;