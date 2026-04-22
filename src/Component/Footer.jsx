import React from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRight,
    Shield,
    CreditCard,
    BarChart3,
    Box
} from 'lucide-react';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaGithub
} from 'react-icons/fa';
import Logo from '../assets/logo.jpg';

const Footer = () => {
    const currentYear = new Date().getFullYear();


    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Features", path: "/Featurespage" },
        { name: "Tutorials", path: "/tutorial" },
    ];

    const products = [
        { name: "Billing System", path: "/solutions/billing", icon: <CreditCard size={14} /> },
        { name: "Sales Reports", path: "/solutions/reports", icon: <BarChart3 size={14} /> },
    ];

    const support = [
        { name: "Our company", path: "/about" },
        { name: "Brand Assets", path: "/brand-assets" },
        { name: "Contact us", path: "/contact" },
        { name: "Privacy", path: "/privacy" },
    ];

    return (
        <footer className="relative bg-white pt-12 pb-6 overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="p-2 bg-gray-50 rounded-xl shadow-sm">
                                <img src={Logo} alt="Smart Billing" className="h-10 w-10 object-contain" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#3D0448] to-[#B564C3] bg-clip-text text-transparent">
                                Smart Billing
                            </span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            Smart is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.
                        </p>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            Smart unique value proposition is to be at the same time very easy to use and fully integrated.
                        </p>
                    </div>

                    {/* Quick Navigation */}
                    <div className="lg:pl-10">
                        <h4 className="text-gray-900 font-bold mb-6 flex items-center">
                            Explore
                            <span className="ml-2 w-8 h-1 bg-[#3D0448] rounded-full inline-block"></span>
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-500 hover:text-[#3D0448] flex items-center group transition-colors duration-300"
                                    >
                                        <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-4 flex items-center">
                            Solutions
                            <span className="ml-2 w-8 h-1 bg-[#B564C3] rounded-full inline-block"></span>
                        </h4>
                        <ul className="space-y-3">
                            {products.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className="text-gray-500 hover:text-[#B564C3] flex items-center group transition-colors duration-300"
                                    >
                                        <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        <span className="mr-3 p-1.5 bg-gray-50 rounded-lg group-hover:bg-[#B564C3]/10 group-hover:text-[#B564C3] transition-colors duration-300">
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Us/Support */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-4 flex items-center">
                            About Us
                            <span className="ml-2 w-8 h-1 bg-[#B564C3] rounded-full inline-block"></span>
                        </h4>
                        <ul className="space-y-4">
                            {support.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-500 hover:text-[#B564C3] flex items-center group transition-colors duration-300"
                                    >
                                        <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm italic">
                    <p className="text-gray-400">
                        &copy; {currentYear} <span className="font-semibold text-[#3D0448]">Smart Billing</span>. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-1 text-gray-400">
                        <span>Developed with by</span>
                        <span className="font-bold bg-gradient-to-r from-[#B564C3] to-[#3D0448] bg-clip-text text-transparent hover:scale-105 transition-transform cursor-default">
                            Smart Billing
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;