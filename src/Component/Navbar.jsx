
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
// Reusing your Button component structure
const Button = ({ children, primary = false, outline = false, className = '', ...props }) => {
    const baseClasses = 'px-4 py-2 font-semibold rounded-lg transition duration-200 cursor-pointer text-sm';
    
    let styleClasses = 'text-gray-600 hover:text-gray-800';
    if (primary) {
        styleClasses = 'bg-purple-main text-white hover:bg-[#4a3249] shadow'; 
    } else if (outline) {
        styleClasses = 'bg-white  text-gray-800 border border-gray-300 hover:bg-[#7A4B6D]  hover:text-white';
    }

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};

// 🔗 Navbar items with routes
const navItems = [
    { name: '', path: '/' },
    { name: 'Overview', path: '/' },
    { name: 'Features', path: '/Featurespage' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userName, setUserName] = useState('Keshav');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    
    // Check if user is signed in (you can use localStorage or other state management)
    React.useEffect(() => {
        // Clear sign in state for testing
        localStorage.removeItem('isSignedIn');
        localStorage.removeItem('userEmail');
        
        const signedIn = localStorage.getItem('isSignedIn');
        if (signedIn === 'true') {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    }, []);
    
    const closeMenu = () => setIsMenuOpen(false);

    const handleSignOut = () => {
        localStorage.removeItem('isSignedIn');
        localStorage.removeItem('userEmail');
        setIsSignedIn(false);
        setShowDropdown(false);
        navigate('/signin');
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-sm bg-white/95 border-b border-gray-100">
            <div className="max-w-7xl mx-auto py-2 px-6 lg:px-8 relative overflow-hidden">
                {/* Subtle Background Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-l from-purple-100 to-transparent rounded-full opacity-30 animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r from-blue-100 to-transparent rounded-full opacity-20 animate-float"></div>
                </div>
                
                <div className="flex justify-between items-center relative z-10">
                    
                    {/* Logo and Desktop Navigation */}
                    <div className="flex items-center space-x-12 group"> 
                        <Link to="/" className="flex items-center space-x-2 transform hover:scale-105 transition-all duration-300">
                           <img src={Logo} alt="Logo" className='h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain -my-4 hover:rotate-12 transition-transform duration-500 group-hover:animate-pulse'/>
                        </Link>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex space-x-10 text-sm">
                            {navItems.slice(1).map((item, index) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-gray-600 hover:text-gray-800 transition font-medium transform hover:scale-110 hover:text-purple-600 relative group animate-slideInDown"
                                    style={{animationDelay: `${index * 0.1}s`}}
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Desktop Buttons + Mobile Hamburger */}
                    <div className="flex items-center space-x-3">
                        <div className="hidden md:flex items-center space-x-3">
                            {isSignedIn ? (
                                <>
                                    <div className="relative">
                                        <div 
                                            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transform hover:scale-105 transition-all duration-300 group"
                                            onClick={() => setShowDropdown(!showDropdown)}
                                        >
                                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse group-hover:animate-bounce">
                                                {userName.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-700 group-hover:text-purple-600 transition-colors">{userName}</span>
                                            <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {showDropdown && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-slideInDown backdrop-blur-sm bg-white/95">
                                                <Link to="/myaccountpage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-300 transform hover:scale-105">
                                                    My Account
                                                </Link>
                                                <button 
                                                    onClick={handleSignOut}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <a href="/Account">   <Button outline className="try hover:bg-indigo-400 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">Start Billing</Button> </a>
                                </>
                            ) : (
                                <>
                                    <a href="/Account">  <Button outline className="w-full hover:bg-indigo-400 transform hover:scale-105 transition-all duration-300 hover:shadow-lg" >Start-Now</Button></a> 
                                </>
                            )}
                        </div>

                        {/* Hamburger */}
                        <button 
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 hover:text-purple-600 group"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <nav className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white border-t shadow-lg backdrop-blur-sm bg-white/95 animate-slideInDown`}>
                <div className="px-3 pt-3 pb-4 space-y-1">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={closeMenu}
                            className="block px-3 py-2 rounded-md text-base font-medium
                                       text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 transform hover:scale-105 animate-slideInLeft"
                            style={{animationDelay: `${index * 0.1}s`}}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <div className="pt-4 space-y-2 ">
                        {isSignedIn ? (
                            <>
                                <Link to="/myaccountpage" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 transform hover:scale-105 group">
                                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold group-hover:animate-bounce">
                                        {userName.charAt(0)}
                                    </div>
                                    <span className="font-medium text-gray-700 group-hover:text-purple-600">{userName}</span>
                                </Link>
                                <a href="/Account">  <Button outline className="w-full try transform hover:scale-105 transition-all duration-300 hover:shadow-lg">Start Billing</Button></a>
                            </>
                        ) : (
                            <>
                                <a href="/Account">  <Button outline className="w-full transform hover:scale-105 transition-all duration-300 hover:shadow-lg" >Sign in</Button></a> 
                                <a href="/Account">  <Button outline className="w-full try transform hover:scale-105 transition-all duration-300 hover:shadow-lg">Start Billing</Button></a>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
